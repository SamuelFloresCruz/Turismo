'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, X, Sparkles, MapPin, Utensils, Calendar, Lightbulb, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useApp } from '@/components/app-shell'

const sugerencias = [
  { icon: MapPin, texto: '¿Cuáles son los mejores lugares para visitar?' },
  { icon: Utensils, texto: '¿Dónde puedo probar el mejor silpancho?' },
  { icon: Calendar, texto: '¿Qué eventos hay este mes?' },
  { icon: Lightbulb, texto: 'Crea un itinerario de 3 días' },
]

interface Mensaje {
  tipo: 'bot' | 'user'
  texto: string
  accion?: { tipo: 'link' | 'navigate' | 'map_select' | 'open_auth'; destino?: string; label: string }
}

const mensajesEjemplo: Mensaje[] = [
  {
    tipo: 'bot',
    texto: 'Hola! Soy tu asistente virtual para explorar Cochabamba. ¿En qué puedo ayudarte hoy?',
  },
]

interface AISidePanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function AISidePanel({ isOpen, onClose }: AISidePanelProps) {
  const router = useRouter()
  const { openAuth } = useApp()
  const [mensajes, setMensajes] = useState<Mensaje[]>(mensajesEjemplo)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const limpiarRespuesta = (texto: string) => {
    const trimmed = texto.trim()
    if (!trimmed.startsWith('```')) return texto
    return trimmed.replace(/^```[a-zA-Z]*\s*/u, '').replace(/```$/u, '').trim()
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [mensajes])

  const ejecutarAccion = (accion?: Mensaje['accion']) => {
    if (!accion) return
    if (accion.tipo === 'open_auth') {
      openAuth()
      return
    }
    if (accion.tipo === 'map_select' && accion.destino) {
      router.push(`/mapa?select=${accion.destino}`)
      return
    }
    if ((accion.tipo === 'navigate' || accion.tipo === 'link') && accion.destino) {
      router.push(accion.destino)
    }
  }

  const enviarMensaje = async (texto: string) => {
    if (!texto.trim()) return
    
    setMensajes(prev => [...prev, { tipo: 'user', texto }])
    setInput('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...mensajes, { tipo: 'user', texto }].map(m => ({ role: m.tipo === 'user' ? 'user' : 'assistant', content: m.texto }))
        }),
      })
      const data = await response.json()
      const respuesta: Mensaje = {
        tipo: 'bot',
        texto: limpiarRespuesta(data.reply ?? 'No pude generar respuesta en este momento.'),
        accion: data.action
      }
      setMensajes(prev => [...prev, respuesta])
      if (data.action) {
        ejecutarAccion(data.action)
      }
    } catch (error) {
      const fallback: Mensaje = {
        tipo: 'bot',
        texto: 'Tuve un problema al consultar el asistente. Puedes intentar de nuevo o explorar el mapa.',
        accion: { tipo: 'navigate', destino: '/mapa', label: 'Ir al mapa' }
      }
      setMensajes(prev => [...prev, fallback])
      ejecutarAccion(fallback.accion)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay para móvil */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40 lg:hidden"
          />
          
          {/* Panel lateral */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] lg:w-[30%] bg-background border-l border-border z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Asistente Cochabamba</h3>
                <p className="text-xs text-primary-foreground/80">Siempre disponible</p>
              </div>
              <Sparkles className="w-5 h-5 text-secondary" />
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mensajes.map((mensaje, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${mensaje.tipo === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${
                    mensaje.tipo === 'user' 
                      ? '' 
                      : 'flex gap-2'
                  }`}>
                    {mensaje.tipo === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div>
                      <div className={`p-3 rounded-2xl ${
                        mensaje.tipo === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-br-md' 
                          : 'bg-muted text-foreground rounded-bl-md'
                      }`}>
                        <p className="text-sm">{mensaje.texto}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Sugerencias */}
            {mensajes.length <= 2 && (
              <div className="px-4 pb-2 border-t border-border pt-3">
                <p className="text-xs text-muted-foreground mb-2">Sugerencias rápidas:</p>
                <div className="flex flex-wrap gap-2">
                  {sugerencias.map((sug, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => enviarMensaje(sug.texto)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <sug.icon className="w-3 h-3" />
                      <span className="truncate max-w-[120px]">{sug.texto}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <form 
                onSubmit={(e) => { e.preventDefault(); enviarMensaje(input); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 px-4 py-2.5 rounded-full bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button type="submit" size="icon" className="rounded-full h-10 w-10">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Botón flotante para abrir el panel
export function AIFloatingButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:shadow-2xl transition-shadow"
      >
        <Bot className="w-6 h-6" />
      </motion.button>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center"
      >
        <Sparkles className="w-3 h-3 text-accent-foreground" />
      </motion.div>
    </motion.div>
  )
}
