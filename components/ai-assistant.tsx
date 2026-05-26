'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, X, Sparkles, MapPin, Utensils, Calendar, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const sugerencias = [
  { icon: MapPin, texto: '¿Cuáles son los mejores lugares para visitar?' },
  { icon: Utensils, texto: '¿Dónde puedo probar el mejor silpancho?' },
  { icon: Calendar, texto: '¿Qué eventos hay este mes?' },
  { icon: Lightbulb, texto: 'Crea un itinerario de 3 días' },
]

const mensajesEjemplo = [
  {
    tipo: 'bot',
    texto: '¡Hola! 👋 Soy tu asistente virtual para explorar Cochabamba. ¿En qué puedo ayudarte hoy?',
  },
]

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [mensajes, setMensajes] = useState(mensajesEjemplo)
  const [input, setInput] = useState('')

  const enviarMensaje = (texto: string) => {
    if (!texto.trim()) return
    
    setMensajes(prev => [...prev, { tipo: 'user', texto }])
    setInput('')
    
    // Simular respuesta del bot
    setTimeout(() => {
      setMensajes(prev => [...prev, {
        tipo: 'bot',
        texto: `¡Excelente pregunta! Basándome en tu consulta sobre "${texto}", te recomendaría explorar el Cristo de la Concordia y el Parque Nacional Torotoro. Ambos lugares son imperdibles y ofrecen experiencias únicas. ¿Te gustaría que te muestre más detalles sobre alguno de estos lugares?`
      }])
    }, 1000)
  }

  return (
    <>
      {/* Botón flotante */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:shadow-2xl transition-shadow"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Bot className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        
        {/* Indicador de notificación */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-3 h-3 text-accent-foreground" />
          </motion.div>
        )}
      </motion.div>

      {/* Panel del chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-md"
          >
            <Card className="shadow-2xl border-2 border-primary/20 overflow-hidden">
              {/* Header */}
              <div className="bg-primary text-primary-foreground p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Asistente Cochabamba</h3>
                    <p className="text-xs text-primary-foreground/80">Siempre disponible para ayudarte</p>
                  </div>
                </div>
              </div>

              {/* Mensajes */}
              <CardContent className="p-4 h-80 overflow-y-auto space-y-4 bg-muted/30">
                {mensajes.map((mensaje, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${mensaje.tipo === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      mensaje.tipo === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-br-md' 
                        : 'bg-card text-foreground rounded-bl-md border border-border'
                    }`}>
                      <p className="text-sm">{mensaje.texto}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>

              {/* Sugerencias */}
              {mensajes.length <= 2 && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-muted-foreground mb-2">Sugerencias:</p>
                  <div className="flex flex-wrap gap-2">
                    {sugerencias.map((sug, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => enviarMensaje(sug.texto)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-muted rounded-full text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <sug.icon className="w-3 h-3" />
                        <span className="truncate max-w-[150px]">{sug.texto}</span>
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
                    className="flex-1 px-4 py-2 rounded-full bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button type="submit" size="icon" className="rounded-full">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
