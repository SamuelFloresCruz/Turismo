'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Hotel, Utensils, Landmark, Bus, Cloud, Star, X, Clock, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const filtros = [
  { id: 'todos', label: 'Todos', icon: MapPin },
  { id: 'lugares', label: 'Lugares', icon: Landmark },
  { id: 'restaurantes', label: 'Restaurantes', icon: Utensils },
  { id: 'hoteles', label: 'Alojamientos', icon: Hotel },
  { id: 'transporte', label: 'Transporte', icon: Bus },
]

const marcadores = [
  { id: 1, nombre: 'Cristo de la Concordia', tipo: 'lugares', lat: -17.38, lng: -66.16, rating: 4.9, horario: '9:00 - 18:00' },
  { id: 2, nombre: 'Plaza 14 de Septiembre', tipo: 'lugares', lat: -17.39, lng: -66.15, rating: 4.7, horario: '24h' },
  { id: 3, nombre: 'La Cantonata', tipo: 'restaurantes', lat: -17.37, lng: -66.17, rating: 4.8, horario: '12:00 - 23:00' },
  { id: 4, nombre: 'Hotel Diplomat', tipo: 'hoteles', lat: -17.40, lng: -66.14, rating: 4.5, horario: '24h' },
  { id: 5, nombre: 'Palacio Portales', tipo: 'lugares', lat: -17.36, lng: -66.18, rating: 4.8, horario: '9:00 - 18:00' },
  { id: 6, nombre: 'Doña Pola', tipo: 'restaurantes', lat: -17.41, lng: -66.16, rating: 4.6, horario: '7:00 - 15:00' },
  { id: 7, nombre: 'Hostal Jardín', tipo: 'hoteles', lat: -17.38, lng: -66.13, rating: 4.3, horario: '24h' },
  { id: 8, nombre: 'Terminal de Buses', tipo: 'transporte', lat: -17.42, lng: -66.17, rating: 3.9, horario: '5:00 - 23:00' },
]

const tipoColors: Record<string, string> = {
  lugares: 'bg-primary',
  restaurantes: 'bg-secondary',
  hoteles: 'bg-accent',
  transporte: 'bg-chart-4',
}

const tipoIcons: Record<string, typeof MapPin> = {
  lugares: Landmark,
  restaurantes: Utensils,
  hoteles: Hotel,
  transporte: Bus,
}

export default function MapaSection() {
  const [filtroActivo, setFiltroActivo] = useState('todos')
  const [lugarSeleccionado, setLugarSeleccionado] = useState<typeof marcadores[0] | null>(null)

  const marcadoresFiltrados = filtroActivo === 'todos' 
    ? marcadores 
    : marcadores.filter(m => m.tipo === filtroActivo)

  return (
    <section id="mapa" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-chart-4/20 text-chart-4 rounded-full text-sm font-medium mb-4">
            Explora el mapa
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Mapa Interactivo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encuentra lugares, restaurantes, alojamientos y rutas de transporte en un solo lugar.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {filtros.map((filtro) => (
            <Button
              key={filtro.id}
              variant={filtroActivo === filtro.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFiltroActivo(filtro.id)}
              className="gap-2"
            >
              <filtro.icon className="w-4 h-4" />
              {filtro.label}
            </Button>
          ))}
        </motion.div>

        {/* Mapa simulado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Card className="overflow-hidden border-2 border-border">
            <div className="relative h-[500px] md:h-[600px] bg-gradient-to-br from-chart-1/20 via-primary/10 to-chart-4/20">
              {/* Fondo del mapa con patrón */}
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Calles simuladas */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,50 L100,50" stroke="currentColor" strokeWidth="0.3" className="text-muted-foreground/30" />
                <path d="M50,0 L50,100" stroke="currentColor" strokeWidth="0.3" className="text-muted-foreground/30" />
                <path d="M20,0 L20,100" stroke="currentColor" strokeWidth="0.2" className="text-muted-foreground/20" />
                <path d="M80,0 L80,100" stroke="currentColor" strokeWidth="0.2" className="text-muted-foreground/20" />
                <path d="M0,30 L100,30" stroke="currentColor" strokeWidth="0.2" className="text-muted-foreground/20" />
                <path d="M0,70 L100,70" stroke="currentColor" strokeWidth="0.2" className="text-muted-foreground/20" />
              </svg>

              {/* Marcadores */}
              {marcadoresFiltrados.map((marcador, index) => {
                const Icon = tipoIcons[marcador.tipo]
                const posX = ((marcador.lng + 66.20) / 0.10) * 100
                const posY = ((marcador.lat + 17.45) / 0.10) * 100
                
                return (
                  <motion.button
                    key={marcador.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setLugarSeleccionado(marcador)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${tipoColors[marcador.tipo]} text-primary-foreground p-2 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-shadow z-10`}
                    style={{ left: `${posX}%`, top: `${posY}%` }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.button>
                )
              })}

              {/* Info del clima */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Cloud className="w-5 h-5 text-chart-4" />
                  <div>
                    <p className="font-medium text-foreground">22°C</p>
                    <p className="text-xs text-muted-foreground">Parcialmente nublado</p>
                  </div>
                </div>
              </motion.div>

              {/* Leyenda */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg"
              >
                <p className="text-xs font-medium text-foreground mb-2">Leyenda</p>
                <div className="space-y-1">
                  {Object.entries(tipoColors).map(([tipo, color]) => {
                    const Icon = tipoIcons[tipo]
                    return (
                      <div key={tipo} className="flex items-center gap-2 text-xs">
                        <div className={`w-4 h-4 rounded-full ${color} flex items-center justify-center`}>
                          <Icon className="w-2 h-2 text-primary-foreground" />
                        </div>
                        <span className="text-muted-foreground capitalize">{tipo}</span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Panel de información del lugar seleccionado */}
              <AnimatePresence>
                {lugarSeleccionado && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-4 right-4 w-72 bg-card rounded-lg shadow-xl border border-border overflow-hidden"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${tipoColors[lugarSeleccionado.tipo]} text-primary-foreground mb-1`}>
                            {lugarSeleccionado.tipo}
                          </span>
                          <h4 className="font-semibold text-foreground">{lugarSeleccionado.nombre}</h4>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setLugarSeleccionado(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Star className="w-4 h-4 fill-secondary text-secondary" />
                          <span>{lugarSeleccionado.rating} / 5.0</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{lugarSeleccionado.horario}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1 gap-1">
                          <Navigation className="w-3 h-3" />
                          Ir
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Ver más
                        </Button>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>

        {/* Lista de lugares */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {marcadoresFiltrados.slice(0, 4).map((marcador) => {
            const Icon = tipoIcons[marcador.tipo]
            return (
              <Card 
                key={marcador.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setLugarSeleccionado(marcador)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${tipoColors[marcador.tipo]} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{marcador.nombre}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 fill-secondary text-secondary" />
                      {marcador.rating}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
