'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ImageOrPlaceholder } from '@/components/ui/image-or-placeholder'

const lugares = [
  {
    id: 1,
    nombre: 'Cristo de la Concordia',
    descripcion: 'La estatua de Cristo más alta del mundo, con vistas panorámicas espectaculares de la ciudad.',
    imagen: '',
    categoria: 'Monumento',
    horario: '9:00 - 18:00',
    rating: 4.9,
  },
  {
    id: 2,
    nombre: 'Plaza 14 de Septiembre',
    descripcion: 'El corazón histórico de Cochabamba, rodeada de arquitectura colonial y vida local vibrante.',
    imagen: '',
    categoria: 'Plaza',
    horario: '24 horas',
    rating: 4.7,
  },
  {
    id: 3,
    nombre: 'Laguna Alalay',
    descripcion: 'Hermoso lago urbano ideal para caminatas, ciclismo y observación de aves.',
    imagen: '',
    categoria: 'Naturaleza',
    horario: '6:00 - 20:00',
    rating: 4.5,
  },
  {
    id: 4,
    nombre: 'Palacio Portales',
    descripcion: 'Magnífica mansión del barón del estaño Simón Patiño, con jardines estilo francés.',
    imagen: '',
    categoria: 'Museo',
    horario: '9:00 - 12:00, 15:00 - 18:00',
    rating: 4.8,
  },
  {
    id: 5,
    nombre: 'Cerro Tunari',
    descripcion: 'El pico más alto del departamento, perfecto para trekking y montañismo.',
    imagen: '',
    categoria: 'Montaña',
    horario: 'Amanecer - Atardecer',
    rating: 4.9,
  },
  {
    id: 6,
    nombre: 'La Cancha',
    descripcion: 'El mercado al aire libre más grande de Sudamérica, una experiencia cultural única.',
    imagen: '',
    categoria: 'Mercado',
    horario: 'Miércoles y Sábados',
    rating: 4.6,
  },
  {
    id: 7,
    nombre: 'Parque Nacional Torotoro',
    descripcion: 'Cañones, cuevas, huellas de dinosaurios y formaciones geológicas impresionantes.',
    imagen: '',
    categoria: 'Parque',
    horario: '7:00 - 17:00',
    rating: 4.9,
  },
  {
    id: 8,
    nombre: 'Valle de la Luna',
    descripcion: 'Formaciones rocosas únicas que parecen un paisaje lunar, cerca de la ciudad.',
    imagen: '',
    categoria: 'Naturaleza',
    horario: '8:00 - 17:00',
    rating: 4.4,
  },
  {
    id: 9,
    nombre: 'Colcapirhua',
    descripcion: 'Zona tradicional conocida por su artesanía y hermosas vistas del valle.',
    imagen: '',
    categoria: 'Pueblo',
    horario: '24 horas',
    rating: 4.3,
  },
  {
    id: 10,
    nombre: 'Museo Arqueológico',
    descripcion: 'Colección fascinante de artefactos precolombinos y momias andinas.',
    imagen: '',
    categoria: 'Museo',
    horario: '8:30 - 18:00',
    rating: 4.6,
  },
  {
    id: 11,
    nombre: 'Pairumani',
    descripcion: 'Hermoso pueblo con arquitectura colonial y naturaleza exuberante.',
    imagen: '',
    categoria: 'Pueblo',
    horario: '24 horas',
    rating: 4.5,
  },
  {
    id: 12,
    nombre: 'Incallajta',
    descripcion: 'Las ruinas incas más grandes de Bolivia, con historia fascinante.',
    imagen: '',
    categoria: 'Ruinas',
    horario: '8:00 - 17:00',
    rating: 4.8,
  },
]

const categoriaColors: Record<string, string> = {
  Monumento: 'bg-primary text-primary-foreground',
  Plaza: 'bg-secondary text-secondary-foreground',
  Naturaleza: 'bg-chart-1 text-primary-foreground',
  Museo: 'bg-accent text-accent-foreground',
  Montaña: 'bg-chart-4 text-primary-foreground',
  Mercado: 'bg-chart-3 text-primary-foreground',
  Parque: 'bg-chart-1 text-primary-foreground',
  Pueblo: 'bg-chart-5 text-primary-foreground',
  Ruinas: 'bg-accent text-accent-foreground',
}

export default function LugaresSection() {
  return (
    <section id="lugares" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Explora
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Lugares Turísticos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre los destinos más impresionantes de Cochabamba, desde monumentos históricos hasta maravillas naturales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lugares.map((lugar, index) => (
            <motion.div
              key={lugar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group overflow-hidden h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50">
                <div className="relative h-48 overflow-hidden">
                  <ImageOrPlaceholder
                    src={lugar.imagen}
                    alt={lugar.nombre}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${categoriaColors[lugar.categoria]}`}>
                    {lugar.categoria}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1 text-primary-foreground">
                      <Star className="w-4 h-4 fill-secondary text-secondary" />
                      <span className="text-sm font-medium">{lugar.rating}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {lugar.nombre}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {lugar.descripcion}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Clock className="w-3 h-3" />
                    <span>{lugar.horario}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full group/btn">
                    Ver más
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" className="gap-2">
            Ver todos los lugares
            <MapPin className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
