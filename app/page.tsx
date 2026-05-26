'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ImageOrPlaceholder } from '@/components/ui/image-or-placeholder'
import { MapPin, Calendar, Star, Map, Utensils, ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Hero3D from '@/components/hero-3d'
import { DataService } from '@/lib/domain/data-service'
import type { Lugar, Gastronomia } from '@/lib/domain/types'

const accesosRapidos = [
  { href: '/lugares', icon: MapPin, label: 'Lugares', color: 'bg-primary' },
  { href: '/eventos', icon: Calendar, label: 'Eventos', color: 'bg-accent' },
  { href: '/mapa', icon: Map, label: 'Mapa', color: 'bg-chart-4' },
  { href: '/resenas', icon: Star, label: 'Reseñas', color: 'bg-secondary' },
]

export default function HomePage() {
  const [topLugares, setTopLugares] = useState<Lugar[]>([])
  const [gastronomiaDestacada, setGastronomiaDestacada] = useState<Gastronomia[]>([])

  useEffect(() => {
    let active = true
    const service = new DataService()

    const load = async () => {
      try {
        const [lugaresTop, platos] = await Promise.all([
          service.lugares().getTop(5),
          service.gastronomia().getAll(),
        ])
        if (!active) {
          return
        }
        setTopLugares(lugaresTop)
        setGastronomiaDestacada(platos.slice(0, 6))
      } catch (error) {
        console.error('Error loading home data', error)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section con 3D */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <Hero3D />
        
        {/* Overlay con contenido */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Badge variant="secondary" className="mb-4">
              La Ciudad Jardín de Bolivia
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
              Descubre la magia de{' '}
              <span className="text-primary">Cochabamba</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explora paisajes impresionantes, saborea la mejor gastronomía boliviana 
              y vive experiencias culturales únicas en el corazón de Bolivia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/lugares" className="gap-2">
                  Explorar lugares
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="w-4 h-4" />
                Ver video
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Accesos rápidos */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex gap-3 p-2 bg-background/80 backdrop-blur-md rounded-2xl border border-border">
            {accesosRapidos.map((acceso) => (
              <Link key={acceso.href} href={acceso.href}>
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${acceso.color} p-3 rounded-xl text-primary-foreground flex flex-col items-center gap-1 min-w-[70px]`}
                >
                  <acceso.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{acceso.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Top 5 Lugares Destacados */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">Top 5</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lugares destacados
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Los destinos más populares y mejor valorados por nuestros visitantes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Lugar principal grande */}
            {topLugares.length > 0 && (
              <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2"
            >
              <Link href={`/lugares/${topLugares[0].id}`}>
                <Card className="h-full overflow-hidden group cursor-pointer">
                  <div className="relative h-full min-h-[400px]">
                    <ImageOrPlaceholder
                      src={topLugares[0].imagen}
                      alt={topLugares[0].nombre}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                      <Badge className="mb-3 bg-primary">#1 Más visitado</Badge>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">{topLugares[0].nombre}</h3>
                      <p className="text-background/80 mb-3">{topLugares[0].descripcion}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-secondary text-secondary" />
                          <span className="font-medium">{topLugares[0].rating}</span>
                        </div>
                        <span className="text-background/60">|</span>
                        <span className="text-sm text-background/80">{topLugares[0].totalResenas} reseñas</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
              </motion.div>
            )}

            {/* Otros lugares */}
            {topLugares.slice(1, 5).map((lugar, i) => (
              <motion.div
                key={lugar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/lugares/${lugar.id}`}>
                  <Card className="overflow-hidden group cursor-pointer h-full">
                    <div className="relative h-48">
                      <ImageOrPlaceholder
                        src={lugar.imagen}
                        alt={lugar.nombre}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge className="absolute top-3 left-3 bg-background/80 text-foreground">
                        #{i + 2}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {lugar.nombre}
                      </h3>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-4 h-4 fill-secondary text-secondary" />
                        <span className="text-sm font-medium">{lugar.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({lugar.totalResenas})
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/lugares" className="gap-2">
                Ver todos los lugares
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Carrusel de Gastronomía */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <Badge variant="outline" className="mb-4">
                <Utensils className="w-3 h-3 mr-1" />
                Gastronomía
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Sabores de Cochabamba
              </h2>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex gap-2">
              <Link href="/lugares">
                Ver más
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Carrusel horizontal */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {gastronomiaDestacada.map((plato, i) => (
                <motion.div
                  key={plato.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="snap-start"
                >
                  <Card className="w-[280px] flex-shrink-0 overflow-hidden group cursor-pointer">
                    <div className="relative h-40">
                      <ImageOrPlaceholder
                        src={plato.imagen}
                        alt={plato.nombre}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      <Badge className="absolute bottom-3 left-3 bg-accent text-accent-foreground">
                        {plato.precioPromedio}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-1">{plato.nombre}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {plato.descripcion}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-6 sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/lugares" className="gap-2">
                Ver más gastronomía
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-primary">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Comienza tu aventura hoy
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Regístrate para guardar tus lugares favoritos, escribir reseñas 
              y recibir recomendaciones personalizadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Crear cuenta gratis
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Explorar sin cuenta
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
