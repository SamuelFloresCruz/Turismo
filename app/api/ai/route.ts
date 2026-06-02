import { NextResponse } from 'next/server'
import { v0 } from 'v0-sdk'
import { z } from 'zod'

type Role = 'user' | 'assistant' | 'system'

type ChatMessage = {
  role: Role
  content: string
}

const ActionSchema = z.object({
  tipo: z.enum(['link', 'navigate', 'map_select', 'open_auth']),
  destino: z.string().optional(),
  label: z.string(),
})

const AiResponseSchema = z.object({
  reply: z.string(),
  action: ActionSchema.optional(),
})

const SYSTEM_PROMPT = `Eres un asistente para una guia turistica. Responde en español.
Cuando el usuario pida navegar, genera una accion. Reglas de accion:
- navigate: usa rutas como /lugares, /eventos, /mapa, /resenas, /lugares/<id>
- map_select: destino es un id de lugar/evento/restaurante/alojamiento
- open_auth: sin destino
Si no hay accion, solo reply.
Responde SOLO con JSON valido con las claves reply y action.
La action debe usar las claves: tipo, destino, label. No uses otros nombres ni fences.`

const toTranscript = (messages: ChatMessage[]) =>
  messages
    .slice(-6)
    .map((message) => `${message.role === 'user' ? 'Usuario' : 'Asistente'}: ${message.content}`)
    .join('\n')

const getLastUserMessage = (messages: ChatMessage[]) => {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index]
    if (message?.role === 'user' && message.content.trim()) {
      return message.content.trim()
    }
  }
  return ''
}

const getLastAssistantText = (messages?: Array<{ role: string; content: string }>) => {
  if (!Array.isArray(messages)) return ''
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index]
    if (message?.role === 'assistant' && typeof message.content === 'string') {
      return message.content.trim()
    }
  }
  return ''
}

const stripCodeFences = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed.startsWith('```')) return trimmed
  return trimmed.replace(/^```[a-zA-Z]*\s*/u, '').replace(/```$/u, '').trim()
}

const tryParseJsonFromText = (value: string) => {
  const cleaned = stripCodeFences(value)
  try {
    return JSON.parse(cleaned)
  } catch {
    const firstBrace = cleaned.indexOf('{')
    const lastBrace = cleaned.lastIndexOf('}')
    if (firstBrace >= 0 && lastBrace > firstBrace) {
      try {
        return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1))
      } catch {
        return null
      }
    }
    return null
  }
}

const extractReplyText = (value: string) => {
  const cleaned = stripCodeFences(value)
  const replyPattern = new RegExp('"reply"\\s*:\\s*"([\\s\\S]*?)"\\s*(,|})', 'u')
  const match = cleaned.match(replyPattern)
  if (!match) return cleaned
  return match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"')
}

const normalizeActionKeys = (payload: unknown) => {
  if (!payload || typeof payload !== 'object') return payload
  const record = payload as Record<string, unknown>
  const action = record.action
  if (!action || typeof action !== 'object') return payload

  const actionRecord = action as Record<string, unknown>
  const tipo = actionRecord.tipo ?? actionRecord.type
  const destino = actionRecord.destino ?? actionRecord.destination
  const label = actionRecord.label

  return {
    ...record,
    action: {
      ...(actionRecord as Record<string, unknown>),
      tipo,
      destino,
      label,
    },
  }
}

export async function POST(req: Request) {
  const { messages } = await req.json()
  const apiKey = process.env.V0_API_KEY

  if (!apiKey) {
    return NextResponse.json({ reply: 'No hay API key configurada.' }, { status: 400 })
  }

  const normalizedMessages = Array.isArray(messages)
    ? messages.map((message: ChatMessage) => ({
        role: message.role,
        content: message.content,
      }))
    : []

  const lastUserMessage = getLastUserMessage(normalizedMessages)
  if (!lastUserMessage) {
    return NextResponse.json({ reply: 'Necesito un mensaje del usuario.' }, { status: 400 })
  }

  const transcript = toTranscript(normalizedMessages)
  const prompt = transcript
    ? `Conversacion reciente:\n${transcript}\n\nResponde al ultimo mensaje del usuario.`
    : lastUserMessage

  try {
    const response = await v0.chats.create({
      message: prompt,
      system: SYSTEM_PROMPT,
      responseMode: 'sync',
      modelConfiguration: {
        modelId: 'v0-mini',
        imageGenerations: false,
      },
    })

    if (response instanceof ReadableStream) {
      return NextResponse.json({ reply: 'Respuesta en streaming no soportada.' }, { status: 500 })
    }

    const rawText = response.text?.trim() || getLastAssistantText(response.messages)
    if (!rawText) {
      return NextResponse.json({ reply: 'Respuesta vacia del asistente.' }, { status: 200 })
    }

    const parsed = tryParseJsonFromText(rawText)
    if (!parsed) {
      return NextResponse.json({ reply: extractReplyText(rawText) }, { status: 200 })
    }

    const normalized = normalizeActionKeys(parsed)
    const validated = AiResponseSchema.safeParse(normalized)
    if (!validated.success) {
      return NextResponse.json({ reply: extractReplyText(rawText) }, { status: 200 })
    }

    return NextResponse.json(validated.data, { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido'
    console.error('AI error:', message)
    return NextResponse.json(
      { reply: 'No se pudo contactar al asistente.', error: message },
      { status: 500 }
    )
  }
}
