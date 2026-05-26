'use client'

import { useEffect, useMemo, useState, use } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ImageOrPlaceholder } from '@/components/ui/image-or-placeholder'
import { notFound } from 'next/navigation'
import { 
  Calendar, MapPin, ChevronLeft, ChevronRight, Lightbulb, 
  Heart, Share2, Clock, Navigation
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DataService } from '@/lib/domain/data-service'
import type { Evento } from '@/lib/domain/types'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EventoDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const [evento, setEvento] = useState<Evento | null>(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const service = new DataService()

    const load = async () => {
      try {
        const data = await service.eventos().getById(id)
        if (!active) {
          return
        }
        setEvento(data)
      } catch (error) {
        console.error('Error loading evento detail', error)
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
    if (!evento || evento.imagenes.length === 0) {
      return ['']
    }
    return evento.imagenes
  }, [evento])

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % galleryImages.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)

  if (!loading && !evento) {
    notFound()
  }

  if (loading || !evento) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Cargando evento...
      </div>
    )
  }

  // Calcular días restantes
  const hoy = new Date()
  const fechaInicio = new Date(evento.fechaInicio)
  const diasRestantes = Math.ceil((fechaInicio.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))

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
            alt={evento.nombre}
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
            <Link href="/eventos">
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
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">
                  <Calendar className="w-3 h-3 mr-1" />
                  {evento.fecha}
                </Badge>
                {evento.destacado && (
                  <Badge className="bg-secondary text-secondary-foreground">Destacado</Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{evento.nombre}</h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{evento.ubicacion}</span>
              </div>
            </div>
            
            {/* Countdown */}
            {diasRestantes > 0 && (
              <div className="bg-primary/10 rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground">Faltan</p>
                <p className="text-3xl font-bold text-primary">{diasRestantes}</p>
                <p className="text-sm text-muted-foreground">días</p>
              </div>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed text-lg">
            {evento.descripcionLarga}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Fechas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Fechas del evento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Inicio</p>
                    <p className="font-medium">{new Date(evento.fechaInicio).toLocaleDateString('es-BO', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Fin</p>
                    <p className="font-medium">{new Date(evento.fechaFin).toLocaleDateString('es-BO', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href={`/mapa?evento=${evento.id}`}>
                    <Navigation className="w-4 h-4 mr-2" />
                    Ver ubicación en mapa
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Consejos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-secondary" />
                  Consejos prácticos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {evento.consejos.map((consejo, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground">{consejo}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
