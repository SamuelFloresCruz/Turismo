'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageOrPlaceholder } from '@/components/ui/image-or-placeholder'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import {
  MapPin, Hotel, Utensils, Landmark, Star, X, Clock, Phone, 
  Navigation, Cloud, Bus, MessageSquare, Filter, Thermometer, Wind
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DataService } from '@/lib/domain/data-service'
import type { Lugar, Restaurante, Alojamiento, Evento, Resena } from '@/lib/domain/types'

type FilterType = 'todos' | 'lugares' | 'restaurantes' | 'alojamientos' | 'eventos'

interface MapItem {
  id: string
  nombre: string
  tipo: FilterType
  coordenadas: { lat: number; lng: number }
  imagen: string
  rating?: number
  descripcion?: string
  horarios?: string
  telefono?: string
}

const LeafletMap = dynamic(() => import('@/components/mapa/leaflet-map'), {
  ssr: false,
})

interface ClimaActual {
  temperatura: number
  condicion: string
  humedad: number
  viento: number
}

// Simular rutas de transporte
const rutasTransporte = [
  { numero: '101', destino: 'Cristo de la Concordia', frecuencia: 'Cada 10 min' },
  { numero: '102', destino: 'Quillacollo - Urkupiña', frecuencia: 'Cada 15 min' },
  { numero: 'Micro 2', destino: 'La Cancha', frecuencia: 'Cada 5 min' },
]

export default function MapaPage() {
  const searchParams = useSearchParams()
  const [filtro, setFiltro] = useState<FilterType>('todos')
  const [selectedItem, setSelectedItem] = useState<MapItem | null>(null)
  const [showClima, setShowClima] = useState(true)
  const [climaActual, setClimaActual] = useState<ClimaActual | null>(null)
  const [climaError, setClimaError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [dataError, setDataError] = useState<string | null>(null)
  const [lugares, setLugares] = useState<Lugar[]>([])
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])
  const [alojamientos, setAlojamientos] = useState<Alojamiento[]>([])
  const [eventos, setEventos] = useState<Evento[]>([])
  const [resenas, setResenas] = useState<Resena[]>([])


  useEffect(() => {
    let active = true
    const service = new DataService()

    const load = async () => {
      try {
        setDataError(null)
        const [lugaresData, restaurantesData, alojamientosData, eventosData] = await Promise.all([
          service.lugares().getAll(),
          service.restaurantes().getAll(),
          service.alojamientos().getAll(),
          service.eventos().getAll(),
        ])
        if (!active) {
          return
        }
        setLugares(lugaresData)
        setRestaurantes(restaurantesData)
        setAlojamientos(alojamientosData)
        setEventos(eventosData)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'No se pudo cargar el mapa'
        console.error('Error loading map data', error)
        setDataError(message)
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    let active = true
    if (!selectedItem || selectedItem.tipo !== 'lugares') {
      setResenas([])
      return
    }
    const service = new DataService()

    const loadResenas = async () => {
      try {
        const data = await service.resenas().getByLugarId(selectedItem.id)
        if (!active) {
          return
        }
        setResenas(data)
      } catch (error) {
        console.error('Error loading resenas', error)
      }
    }

    loadResenas()

    return () => {
      active = false
    }
  }, [selectedItem])

  useEffect(() => {
    let active = true
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
    if (!apiKey) {
      setClimaError('API key no configurada')
      return () => {
        active = false
      }
    }

    const coords = selectedItem?.coordenadas ?? { lat: -17.3895, lng: -66.1568 }

    const loadClima = async () => {
      try {
        setClimaError(null)
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${apiKey}&units=metric&lang=es`
        )
        const data = await response.json()
        if (!response.ok) {
          const message = typeof data?.message === 'string' ? data.message : 'Clima no disponible'
          throw new Error(`${response.status} ${message}`)
        }
        if (!active) {
          return
        }
        setClimaActual({
          temperatura: Math.round(data.main?.temp ?? 0),
          condicion: data.weather?.[0]?.description ?? 'Desconocido',
          humedad: data.main?.humidity ?? 0,
          viento: Math.round((data.wind?.speed ?? 0) * 3.6),
        })
      } catch (error) {
        if (!active) {
          return
        }
        console.error('Error loading clima', error)
        const message = error instanceof Error ? error.message : 'No se pudo cargar el clima'
        setClimaError(message)
      }
    }

    loadClima()

    return () => {
      active = false
    }
  }, [selectedItem])

  // Combinar todos los items del mapa
  const todosLosItems: MapItem[] = useMemo(() => {
    const items: MapItem[] = []
    
    lugares.forEach(l => items.push({
      id: l.id,
      nombre: l.nombre,
      tipo: 'lugares',
      coordenadas: l.coordenadas,
      imagen: l.imagen,
      rating: l.rating,
      descripcion: l.descripcion,
      horarios: l.horarios
    }))
    
    restaurantes.forEach(r => items.push({
      id: r.id,
      nombre: r.nombre,
      tipo: 'restaurantes',
      coordenadas: r.coordenadas,
      imagen: r.imagen,
      rating: r.rating,
      descripcion: r.especialidad,
      horarios: r.horarios,
      telefono: r.telefono
    }))
    
    alojamientos.forEach(a => items.push({
      id: a.id,
      nombre: a.nombre,
      tipo: 'alojamientos',
      coordenadas: a.coordenadas,
      imagen: a.imagen,
      rating: a.rating,
      descripcion: a.tipo,
      telefono: a.telefono
    }))
    
    eventos.forEach(e => items.push({
      id: e.id,
      nombre: e.nombre,
      tipo: 'eventos',
      coordenadas: e.coordenadas,
      imagen: e.imagen,
      descripcion: e.descripcion
    }))
    
    return items
  }, [alojamientos, eventos, lugares, restaurantes])

  const itemsFiltrados = filtro === 'todos' 
    ? todosLosItems 
    : todosLosItems.filter(item => item.tipo === filtro)

  useEffect(() => {
    const targetId = searchParams.get('select')
    if (!targetId || todosLosItems.length === 0) {
      return
    }
    const match = todosLosItems.find(item => item.id === targetId)
    if (match) {
      setSelectedItem(match)
    }
  }, [searchParams, todosLosItems])

  const filtros: { id: FilterType; label: string; icon: typeof MapPin; color: string }[] = [
    { id: 'todos', label: 'Todos', icon: Filter, color: 'bg-foreground' },
    { id: 'lugares', label: 'Lugares', icon: Landmark, color: 'bg-primary' },
    { id: 'restaurantes', label: 'Restaurantes', icon: Utensils, color: 'bg-accent' },
    { id: 'alojamientos', label: 'Hoteles', icon: Hotel, color: 'bg-secondary' },
    { id: 'eventos', label: 'Eventos', icon: MapPin, color: 'bg-chart-4' },
  ]

  const getIconColor = (tipo: FilterType) => {
    switch (tipo) {
      case 'lugares': return 'bg-primary text-primary-foreground'
      case 'restaurantes': return 'bg-accent text-accent-foreground'
      case 'alojamientos': return 'bg-secondary text-secondary-foreground'
      case 'eventos': return 'bg-chart-4 text-background'
      default: return 'bg-foreground text-background'
    }
  }

  const resenasMostradas = selectedItem?.tipo === 'lugares' ? resenas : []

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Cargando mapa...
      </div>
    )
  }

  if (dataError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Error cargando datos: {dataError}
      </div>
    )
  }

  if (todosLosItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        No hay datos para mostrar en el mapa.
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Badge variant="outline" className="mb-4">
            <MapPin className="w-3 h-3 mr-1" />
            Mapa Interactivo
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explora Cochabamba
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Encuentra lugares turísticos, restaurantes, hoteles y eventos en el mapa. 
            Filtra por categoría y descubre información detallada.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-wrap gap-2"
        >
          {filtros.map((f) => (
            <Button
              key={f.id}
              variant={filtro === f.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFiltro(f.id)}
              className="gap-2"
            >
              <f.icon className="w-4 h-4" />
              {f.label}
            </Button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Mapa real */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden">
              <div className="relative h-[500px] bg-muted">
                <LeafletMap
                  items={itemsFiltrados}
                  onSelect={(item) => setSelectedItem(item)}
                />

                {/* Clima en tiempo real */}
                {showClima && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Cloud className="w-10 h-10 text-primary" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">
                            {climaActual ? `${climaActual.temperatura}°C` : '--'}
                          </span>
                          <Badge variant="outline">
                            {climaActual?.condicion ?? 'Cargando'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Thermometer className="w-3 h-3" />
                            {climaActual ? `${climaActual.humedad}%` : '--'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Wind className="w-3 h-3" />
                            {climaActual ? `${climaActual.viento} km/h` : '--'}
                          </span>
                        </div>
                        {climaError && (
                          <p className="text-xs text-destructive mt-2">{climaError}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Leyenda */}
                <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
                  <p className="text-xs text-muted-foreground mb-2">Leyenda</p>
                  <div className="flex flex-wrap gap-2">
                    {filtros.slice(1).map((f) => (
                      <div key={f.id} className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full ${f.color}`} />
                        <span className="text-xs">{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Panel lateral */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {/* Detalle seleccionado */}
            <AnimatePresence mode="wait">
              {selectedItem ? (
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card>
                    <CardContent className="p-0">
                      <div className="relative h-40">
                        <ImageOrPlaceholder
                          src={selectedItem.imagen}
                          alt={selectedItem.nombre}
                          fill
                          className="object-cover"
                        />
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute top-2 right-2 rounded-full w-8 h-8"
                          onClick={() => setSelectedItem(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Badge className={`absolute bottom-2 left-2 ${getIconColor(selectedItem.tipo)}`}>
                          {selectedItem.tipo}
                        </Badge>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg">{selectedItem.nombre}</h3>
                          {selectedItem.rating && (
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-4 h-4 fill-secondary text-secondary" />
                              <span className="font-medium">{selectedItem.rating}</span>
                            </div>
                          )}
                        </div>
                        
                        {selectedItem.descripcion && (
                          <p className="text-sm text-muted-foreground">{selectedItem.descripcion}</p>
                        )}
                        
                        {selectedItem.horarios && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{selectedItem.horarios}</span>
                          </div>
                        )}
                        
                        {selectedItem.telefono && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-primary" />
                            <span>{selectedItem.telefono}</span>
                          </div>
                        )}

                        {/* Reseñas rápidas */}
                        {resenasMostradas.length > 0 && (
                          <div className="pt-3 border-t border-border">
                            <p className="text-sm font-medium mb-2 flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              Comentarios recientes
                            </p>
                            {resenasMostradas.slice(0, 2).map((r) => (
                              <div key={r.id} className="text-xs text-muted-foreground bg-muted p-2 rounded mb-2">
                                <span className="font-medium">{r.usuarioNombre}:</span> {r.comentario.slice(0, 80)}...
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex gap-2 pt-2">
                          {selectedItem.tipo === 'lugares' && (
                            <Button size="sm" asChild className="flex-1">
                              <Link href={`/lugares/${selectedItem.id}`}>
                                Ver detalles
                              </Link>
                            </Button>
                          )}
                          {selectedItem.tipo === 'eventos' && (
                            <Button size="sm" asChild className="flex-1">
                              <Link href={`/eventos/${selectedItem.id}`}>
                                Ver evento
                              </Link>
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="gap-1">
                            <Navigation className="w-4 h-4" />
                            Ruta
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card>
                    <CardContent className="p-6 text-center">
                      <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <h3 className="font-semibold mb-1">Selecciona un punto</h3>
                      <p className="text-sm text-muted-foreground">
                        Haz clic en un marcador del mapa para ver su información
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Transporte público */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Bus className="w-4 h-4 text-primary" />
                  Transporte público
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {rutasTransporte.map((ruta, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-muted rounded-lg text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{ruta.numero}</Badge>
                      <span>{ruta.destino}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{ruta.frecuencia}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Estadísticas */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{lugares.length}</p>
                    <p className="text-xs text-muted-foreground">Lugares</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">{restaurantes.length}</p>
                    <p className="text-xs text-muted-foreground">Restaurantes</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">{alojamientos.length}</p>
                    <p className="text-xs text-muted-foreground">Hoteles</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-chart-4">{eventos.length}</p>
                    <p className="text-xs text-muted-foreground">Eventos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
