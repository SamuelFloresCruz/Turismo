'use client'

import { useEffect, useMemo, useState, use } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ImageOrPlaceholder } from '@/components/ui/image-or-placeholder'
import { notFound } from 'next/navigation'
import { 
  MapPin, Star, Clock, DollarSign, Lightbulb, ChevronLeft, ChevronRight,
  Navigation, Hotel, Utensils, MessageSquare, Heart, Share2, Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DataService } from '@/lib/domain/data-service'
import type { Lugar, Restaurante, Alojamiento, Resena, Gastronomia } from '@/lib/domain/types'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function LugarDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const [lugar, setLugar] = useState<Lugar | null>(null)
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])
  const [alojamientos, setAlojamientos] = useState<Alojamiento[]>([])
  const [resenas, setResenas] = useState<Resena[]>([])
  const [gastronomia, setGastronomia] = useState<Gastronomia[]>([])
  const [currentImage, setCurrentImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const service = new DataService()

    const load = async () => {
      try {
        const [lugarData, restaurantesData, alojamientosData, resenasData, gastronomiaData] =
          await Promise.all([
            service.lugares().getById(id),
            service.restaurantes().getAll(),
            service.alojamientos().getAll(),
            service.resenas().getByLugarId(id),
            service.gastronomia().getAll(),
          ])

        if (!active) {
          return
        }

        setLugar(lugarData)
        setRestaurantes(restaurantesData)
        setAlojamientos(alojamientosData)
        setResenas(resenasData)
        setGastronomia(gastronomiaData)
      } catch (error) {
        console.error('Error loading lugar detail', error)
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
  }, [id])

  useEffect(() => {
    setCurrentImage(0)
  }, [id])

  const galleryImages = useMemo(() => {
    if (!lugar || lugar.imagenes.length === 0) {
      return ['']
    }
    return lugar.imagenes
  }, [lugar])

  const comidasRelacionadas = useMemo(() => {
    if (!lugar) {
      return []
    }
    return gastronomia.filter(g =>
      lugar.comidasTipicas.some(c => g.nombre.toLowerCase().includes(c.toLowerCase()))
    )
  }, [gastronomia, lugar])

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % galleryImages.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)

  if (!loading && !lugar) {
    notFound()
  }

  if (loading || !lugar) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Cargando lugar...
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Galería de fotos */}
      <section className="relative h-[50vh] min-h-[400px]">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          <ImageOrPlaceholder
            src={galleryImages[currentImage]}
            alt={lugar.nombre}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        {/* Controles de navegación */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
          <Button
            variant="secondary"
            size="icon"
            onClick={prevImage}
            className="rounded-full bg-background/80 backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={nextImage}
            className="rounded-full bg-background/80 backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentImage ? 'bg-primary' : 'bg-background/50'
              }`}
            />
          ))}
        </div>

        {/* Botón volver */}
        <div className="absolute top-4 left-4">
          <Button variant="secondary" size="sm" asChild className="rounded-full">
            <Link href="/lugares">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Volver
            </Link>
          </Button>
        </div>

        {/* Acciones */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-accent text-accent' : ''}`} />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Contenido */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background rounded-2xl border border-border p-6 mb-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <Badge variant="outline" className="mb-2 capitalize">{lugar.categoria}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{lugar.nombre}</h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{lugar.ubicacion}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-secondary text-secondary" />
                  <span className="text-2xl font-bold">{lugar.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground">{lugar.totalResenas} reseñas</p>
              </div>
            </div>
          </div>

          {/* Info rápida */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span>{lugar.horarios}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-primary" />
              <span>{lugar.precioEntrada}</span>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {lugar.descripcionLarga}
          </p>
        </motion.div>

        {/* Tabs de contenido */}
        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="info">Información</TabsTrigger>
            <TabsTrigger value="restaurantes">Restaurantes</TabsTrigger>
            <TabsTrigger value="alojamiento">Alojamiento</TabsTrigger>
            <TabsTrigger value="resenas">Reseñas</TabsTrigger>
          </TabsList>

          {/* Tab: Información */}
          <TabsContent value="info" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Tours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Tours disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {lugar.tours.map((tour, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{tour.nombre}</p>
                        <p className="text-sm text-muted-foreground">{tour.duracion}</p>
                      </div>
                      <Badge>{tour.precio}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Consejos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-secondary" />
                    Consejos prácticos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {lugar.consejos.map((consejo, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{consejo}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Comidas típicas */}
            {comidasRelacionadas.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-accent" />
                    Comidas típicas de la zona
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {comidasRelacionadas.map((comida) => (
                      <div key={comida.id} className="text-center">
                        <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden mb-2">
                          <ImageOrPlaceholder src={comida.imagen} alt={comida.nombre} fill className="object-cover" />
                        </div>
                        <p className="font-medium text-sm">{comida.nombre}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tab: Restaurantes */}
          <TabsContent value="restaurantes" className="space-y-6">
            {['barato', 'normal', 'caro'].map((tipo) => (
              <div key={tipo}>
                <h3 className="text-lg font-semibold mb-4 capitalize flex items-center gap-2">
                  <DollarSign className={`w-5 h-5 ${
                    tipo === 'barato' ? 'text-primary' : 
                    tipo === 'normal' ? 'text-secondary' : 'text-accent'
                  }`} />
                  {tipo === 'barato' ? 'Económicos' : tipo === 'normal' ? 'Precio medio' : 'Premium'}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {restaurantes.filter(r => r.tipo === tipo).slice(0, 3).map((rest) => (
                    <Card key={rest.id} className="overflow-hidden group cursor-pointer">
                      <div className="relative h-32">
                        <ImageOrPlaceholder src={rest.imagen} alt={rest.nombre} fill className="object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{rest.nombre}</h4>
                        <p className="text-sm text-muted-foreground">{rest.especialidad}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-secondary text-secondary" />
                            <span className="text-sm">{rest.rating}</span>
                          </div>
                          <Badge variant="outline">{rest.precioPromedio}</Badge>
                        </div>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-2" asChild>
                          <Link href={`/mapa?lugar=${rest.id}`}>
                            <Navigation className="w-3 h-3 mr-1" />
                            Ver en mapa
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Tab: Alojamiento */}
          <TabsContent value="alojamiento" className="space-y-6">
            {['economico', 'estandar', 'premium'].map((tipo) => (
              <div key={tipo}>
                <h3 className="text-lg font-semibold mb-4 capitalize flex items-center gap-2">
                  <Hotel className={`w-5 h-5 ${
                    tipo === 'economico' ? 'text-primary' : 
                    tipo === 'estandar' ? 'text-secondary' : 'text-accent'
                  }`} />
                  {tipo === 'economico' ? 'Económico' : tipo === 'estandar' ? 'Estándar' : 'Premium'}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {alojamientos.filter(a => a.tipo === tipo).slice(0, 3).map((aloj) => (
                    <Card key={aloj.id} className="overflow-hidden">
                      <div className="relative h-32">
                        <ImageOrPlaceholder src={aloj.imagen} alt={aloj.nombre} fill className="object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{aloj.nombre}</h4>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {aloj.servicios.slice(0, 3).map((s, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-secondary text-secondary" />
                            <span className="text-sm">{aloj.rating}</span>
                          </div>
                          <span className="font-semibold text-primary">{aloj.precioNoche}/noche</span>
                        </div>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-2" asChild>
                          <Link href={`/mapa?lugar=${aloj.id}`}>
                            <Navigation className="w-3 h-3 mr-1" />
                            Ver en mapa
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Tab: Reseñas */}
          <TabsContent value="resenas">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Reseñas de visitantes
                </CardTitle>
                <Button>Escribir reseña</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {resenas.length > 0 ? resenas.map((resena) => (
                  <div key={resena.id} className="flex gap-4 p-4 bg-muted rounded-lg">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <ImageOrPlaceholder src={resena.usuarioFoto} alt={resena.usuarioNombre} width={40} height={40} className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{resena.usuarioNombre}</h4>
                        <span className="text-sm text-muted-foreground">{resena.fecha}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < resena.rating ? 'fill-secondary text-secondary' : 'text-muted'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{resena.comentario}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Aún no hay reseñas para este lugar. ¡Sé el primero en comentar!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
