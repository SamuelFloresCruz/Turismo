'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ImageOrPlaceholder } from '@/components/ui/image-or-placeholder'
import { Calendar, MapPin, Star, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { DataService } from '@/lib/domain/data-service'
import type { Evento } from '@/lib/domain/types'

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState<'todos' | 'destacados'>('todos')

  useEffect(() => {
    let active = true
    const service = new DataService()

    const load = async () => {
      try {
        const data = await service.eventos().getAll()
        if (!active) {
          return
        }
        setEventos(data)
      } catch (error) {
        console.error('Error loading eventos', error)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [])

  const eventosFiltrados = eventos.filter(evento => {
    const matchBusqueda = evento.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          evento.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    const matchFiltro = filtro === 'todos' || (filtro === 'destacados' && evento.destacado)
    return matchBusqueda && matchFiltro
  })

  const eventoDestacado = eventos.find(e => e.destacado)

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
            <Calendar className="w-3 h-3 mr-1" />
            Eventos Culturales
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vive la cultura cochabambina
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Descubre las festividades y eventos que hacen única a Cochabamba. 
            Desde el colorido Carnaval hasta la devota Urkupiña.
          </p>
        </motion.div>

        {/* Evento destacado */}
        {eventoDestacado && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-secondary fill-secondary" />
              Evento destacado
            </h2>
            <Link href={`/eventos/${eventoDestacado.id}`}>
              <Card className="overflow-hidden group cursor-pointer">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <ImageOrPlaceholder
                      src={eventoDestacado.imagen}
                      alt={eventoDestacado.nombre}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      Próximamente
                    </Badge>
                  </div>
                  <CardContent className="p-6 flex flex-col justify-center">
                    <Badge variant="outline" className="w-fit mb-3">{eventoDestacado.fecha}</Badge>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {eventoDestacado.nombre}
                    </h3>
                    <p className="text-muted-foreground mb-4">{eventoDestacado.descripcion}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{eventoDestacado.ubicacion}</span>
                    </div>
                    <Button className="mt-6 w-fit">Ver detalles</Button>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </motion.div>
        )}

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar eventos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filtro === 'todos' ? 'default' : 'outline'}
              onClick={() => setFiltro('todos')}
            >
              Todos
            </Button>
            <Button
              variant={filtro === 'destacados' ? 'default' : 'outline'}
              onClick={() => setFiltro('destacados')}
            >
              <Star className="w-4 h-4 mr-1" />
              Destacados
            </Button>
          </div>
        </motion.div>

        {/* Grid de eventos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventosFiltrados.map((evento, i) => (
            <motion.div
              key={evento.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/eventos/${evento.id}`}>
                <Card className="overflow-hidden group cursor-pointer h-full">
                  <div className="relative h-48">
                    <ImageOrPlaceholder
                      src={evento.imagen}
                      alt={evento.nombre}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {evento.destacado && (
                      <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Destacado
                      </Badge>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-background/90 text-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {evento.fecha}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {evento.nombre}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {evento.descripcion}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{evento.ubicacion}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {eventosFiltrados.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron eventos
            </h3>
            <p className="text-muted-foreground">
              Intenta buscar con otros términos
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
