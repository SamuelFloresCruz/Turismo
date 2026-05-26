'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ImageOrPlaceholder } from '@/components/ui/image-or-placeholder'
import { MapPin, Star, Filter, Search, Grid, List, Mountain, Landmark, Compass, Pickaxe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { DataService } from '@/lib/domain/data-service'
import type { Lugar } from '@/lib/domain/types'

const categorias = [
  { id: 'todos', label: 'Todos', icon: Grid },
  { id: 'naturaleza', label: 'Naturaleza', icon: Mountain },
  { id: 'cultura', label: 'Cultura', icon: Landmark },
  { id: 'aventura', label: 'Aventura', icon: Compass },
  { id: 'arqueologia', label: 'Arqueología', icon: Pickaxe },
]

export default function LugaresPage() {
  const [lugares, setLugares] = useState<Lugar[]>([])
  const [categoria, setCategoria] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [vista, setVista] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    let active = true
    const service = new DataService()

    const load = async () => {
      try {
        const data = await service.lugares().getAll()
        if (!active) {
          return
        }
        setLugares(data)
      } catch (error) {
        console.error('Error loading lugares', error)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [])

  const lugaresFiltrados = lugares.filter(lugar => {
    const matchCategoria = categoria === 'todos' || lugar.categoria === categoria
    const matchBusqueda = lugar.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          lugar.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    return matchCategoria && matchBusqueda
  })

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
            Lugares Turísticos
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explora Cochabamba
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Descubre los destinos más impresionantes del departamento. Desde montañas nevadas 
            hasta valles tropicales, Cochabamba tiene algo para todos.
          </p>
        </motion.div>

        {/* Filtros y búsqueda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Barra de búsqueda */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar lugares..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={vista === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setVista('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={vista === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setVista('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Categorías */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categorias.map((cat) => (
              <Button
                key={cat.id}
                variant={categoria === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategoria(cat.id)}
                className="flex-shrink-0 gap-2"
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Resultados */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {lugaresFiltrados.length} lugares encontrados
          </p>
        </div>

        {/* Grid de lugares */}
        <div className={`grid gap-6 ${
          vista === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {lugaresFiltrados.map((lugar, i) => (
            <motion.div
              key={lugar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/lugares/${lugar.id}`}>
                <Card className={`overflow-hidden group cursor-pointer h-full ${
                  vista === 'list' ? 'flex flex-row' : ''
                }`}>
                  <div className={`relative ${
                    vista === 'list' ? 'w-48 h-32 flex-shrink-0' : 'h-48'
                  }`}>
                    <ImageOrPlaceholder
                      src={lugar.imagen}
                      alt={lugar.nombre}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 left-3 bg-background/80 text-foreground capitalize">
                      {lugar.categoria}
                    </Badge>
                  </div>
                  <CardContent className={`p-4 ${vista === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {lugar.nombre}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {lugar.descripcion}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-secondary text-secondary" />
                        <span className="text-sm font-medium">{lugar.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({lugar.totalResenas})
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {lugar.precioEntrada}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {lugaresFiltrados.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron lugares
            </h3>
            <p className="text-muted-foreground">
              Intenta ajustar los filtros o buscar con otros términos
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
