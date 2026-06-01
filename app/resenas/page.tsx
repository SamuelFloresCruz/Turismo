'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ImageOrPlaceholder } from '@/components/ui/image-or-placeholder'
import Link from 'next/link'
import { useApp } from '@/components/app-shell'
import { Star, MessageSquare, TrendingUp, Filter, Search, ThumbsUp, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DataService } from '@/lib/domain/data-service'
import type { Lugar, Restaurante, Resena } from '@/lib/domain/types'

export default function ResenasPage() {
  const { openAuth } = useApp()
  const [busqueda, setBusqueda] = useState('')
  const [filtroRating, setFiltroRating] = useState<number | null>(null)

  const [resenas, setResenas] = useState<Resena[]>([])
  const [lugares, setLugares] = useState<Lugar[]>([])
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])
  const [top10, setTop10] = useState<(Lugar | Restaurante)[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const service = new DataService()

    const load = async () => {
      try {
        const [resenasData, lugaresData, restaurantesData] = await Promise.all([
          service.resenas().getAll(),
          service.lugares().getAll(),
          service.restaurantes().getAll(),
        ])
        if (!active) {
          return
        }
        setResenas(resenasData)
        setLugares(lugaresData)
        setRestaurantes(restaurantesData)
        const top10Mix = [...lugaresData, ...restaurantesData]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 10)
        setTop10(top10Mix)
      } catch (error) {
        console.error('Error loading resenas', error)
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

  const resenasFiltradas = useMemo(() => resenas.filter(resena => {
    const matchBusqueda = resena.comentario.toLowerCase().includes(busqueda.toLowerCase()) ||
                          resena.usuarioNombre.toLowerCase().includes(busqueda.toLowerCase())
    const matchRating = filtroRating === null || resena.rating === filtroRating
    return matchBusqueda && matchRating
  }), [busqueda, filtroRating, resenas])

  // Obtener el nombre del lugar o restaurante
  const getNombreEntidad = (resena: Resena) => {
    if (resena.lugarId) {
      const lugar = lugares.find(l => l.id === resena.lugarId)
      return { nombre: lugar?.nombre || '', tipo: 'lugar', href: `/lugares/${resena.lugarId}` }
    }
    if (resena.restauranteId) {
      const rest = restaurantes.find(r => r.id === resena.restauranteId)
      return { nombre: rest?.nombre || '', tipo: 'restaurante', href: `/mapa?lugar=${resena.restauranteId}` }
    }
    if (resena.eventoId) {
      return { nombre: 'Evento', tipo: 'evento', href: `/eventos/${resena.eventoId}` }
    }
    return { nombre: '', tipo: '', href: '#' }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Cargando reseñas...
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
            <Star className="w-3 h-3 mr-1" />
            Reseñas
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Opiniones de viajeros
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Lee las experiencias de otros visitantes y comparte la tuya para ayudar a futuros viajeros.
          </p>
        </motion.div>

        <Tabs defaultValue="resenas" className="space-y-8">
          <TabsList>
            <TabsTrigger value="resenas" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Reseñas
            </TabsTrigger>
            <TabsTrigger value="ranking" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Top 10
            </TabsTrigger>
            <TabsTrigger value="escribir" className="gap-2">
              <Star className="w-4 h-4" />
              Escribir
            </TabsTrigger>
          </TabsList>

          {/* Tab: Reseñas */}
          <TabsContent value="resenas" className="space-y-6">
            {/* Filtros */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar en reseñas..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filtroRating === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFiltroRating(null)}
                >
                  Todas
                </Button>
                {[5, 4, 3].map((rating) => (
                  <Button
                    key={rating}
                    variant={filtroRating === rating ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFiltroRating(rating)}
                    className="gap-1"
                  >
                    {rating} <Star className="w-3 h-3 fill-current" />
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Lista de reseñas */}
            <div className="space-y-4">
              {resenasFiltradas.map((resena, i) => {
                const entidad = getNombreEntidad(resena)
                return (
                  <motion.div
                    key={resena.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <ImageOrPlaceholder 
                              src={resena.usuarioFoto} 
                              alt={resena.usuarioNombre} 
                              width={48} 
                              height={48} 
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-foreground">{resena.usuarioNombre}</h3>
                                <Link href={entidad.href} className="text-sm text-primary hover:underline flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {entidad.nombre}
                                </Link>
                              </div>
                              <span className="text-sm text-muted-foreground">{resena.fecha}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-3">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < resena.rating ? 'fill-secondary text-secondary' : 'text-muted'}`} 
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground mb-4">{resena.comentario}</p>
                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="sm" className="gap-2">
                                <ThumbsUp className="w-4 h-4" />
                                Útil ({resena.likes})
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {resenasFiltradas.length === 0 && (
              <div className="text-center py-16">
                <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No se encontraron reseñas
                </h3>
                <p className="text-muted-foreground">
                  Intenta ajustar los filtros
                </p>
              </div>
            )}
          </TabsContent>

          {/* Tab: Top 10 */}
          <TabsContent value="ranking">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Top 10 mejor valorados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {top10.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-4 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                          i === 0 ? 'bg-secondary text-secondary-foreground' :
                          i === 1 ? 'bg-muted-foreground/30 text-foreground' :
                          i === 2 ? 'bg-accent/30 text-accent' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {i + 1}
                        </div>
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageOrPlaceholder 
                            src={item.imagen} 
                            alt={item.nombre} 
                            width={64} 
                            height={64} 
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{item.nombre}</h3>
                          <Badge variant="outline" className="capitalize mt-1">
                            {'categoria' in item ? item.categoria : item.tipo}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 fill-secondary text-secondary" />
                            <span className="text-xl font-bold">{item.rating}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Tab: Escribir reseña */}
          <TabsContent value="escribir">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Escribe tu reseña
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      Debes{' '}
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={openAuth}
                      >
                        iniciar sesión
                      </Button>{' '}
                      para escribir una reseña.
                      Tu opinión ayuda a otros viajeros a planificar su visita.
                    </p>
                  </div>

                  <div className="space-y-4 opacity-50 pointer-events-none">
                    <div>
                      <label className="block text-sm font-medium mb-2">Selecciona un lugar o restaurante</label>
                      <select className="w-full p-2 border border-border rounded-lg bg-background">
                        <option>Seleccionar...</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Tu calificación</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                          >
                            <Star className="w-8 h-8 text-muted-foreground" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Tu comentario</label>
                      <Textarea 
                        placeholder="Cuéntanos tu experiencia..."
                        rows={4}
                      />
                    </div>

                    <Button className="w-full" onClick={openAuth}>
                      Publicar reseña
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
