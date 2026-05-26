'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Utensils, Star, DollarSign, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ImageOrPlaceholder } from '@/components/ui/image-or-placeholder'

const platos = [
  {
    id: 1,
    nombre: 'Silpancho',
    descripcion: 'Carne empanizada sobre arroz, papas y ensalada, coronada con huevo frito.',
    imagen: '',
    precio: '$$',
    rating: 4.9,
    tipo: 'Plato principal',
  },
  {
    id: 2,
    nombre: 'Pique Macho',
    descripcion: 'Montaña de carne, papas fritas, huevo, tomate y locoto picante.',
    imagen: '',
    precio: '$$',
    rating: 4.8,
    tipo: 'Para compartir',
  },
  {
    id: 3,
    nombre: 'Chicharrón',
    descripcion: 'Cerdo frito crujiente servido con mote, llajua y chuño.',
    imagen: '',
    precio: '$',
    rating: 4.7,
    tipo: 'Tradicional',
  },
  {
    id: 4,
    nombre: 'Salteñas',
    descripcion: 'Empanadas jugosas rellenas de carne o pollo con papa y especias.',
    imagen: '',
    precio: '$',
    rating: 4.9,
    tipo: 'Desayuno',
  },
  {
    id: 5,
    nombre: 'Sopa de Maní',
    descripcion: 'Cremosa sopa de maní con carne, papas y fideo de huevo.',
    imagen: '',
    precio: '$',
    rating: 4.6,
    tipo: 'Sopa',
  },
  {
    id: 6,
    nombre: 'Anticuchos',
    descripcion: 'Brochetas de corazón de res marinadas y a la parrilla.',
    imagen: '',
    precio: '$',
    rating: 4.5,
    tipo: 'Calle',
  },
]

const restaurantes = [
  { nombre: 'La Cantonata', precio: '$$$', tipo: 'Fine Dining' },
  { nombre: 'El Papagayo', precio: '$$', tipo: 'Tradicional' },
  { nombre: 'Doña Pola', precio: '$', tipo: 'Económico' },
]

export default function GastronomiaSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const x = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <section id="gastronomia" className="py-20 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-secondary/50 text-secondary-foreground rounded-full text-sm font-medium mb-4">
            Sabores Únicos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Gastronomía Cochabambina
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cochabamba es conocida como la capital gastronómica de Bolivia. Descubre los sabores que hacen famosa a esta ciudad.
          </p>
        </motion.div>

        {/* Carrusel de platos */}
        <div className="relative mb-16">
          <motion.div 
            style={{ x }}
            className="flex gap-6 pb-4"
          >
            {[...platos, ...platos].map((plato, index) => (
              <motion.div
                key={`${plato.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="flex-shrink-0 w-80"
              >
                <Card className="overflow-hidden h-full border-border/50 hover:shadow-xl transition-shadow">
                  <div className="relative h-52">
                    <ImageOrPlaceholder
                      src={plato.imagen}
                      alt={plato.nombre}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-secondary text-secondary" />
                      <span className="text-xs font-medium">{plato.rating}</span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {plato.tipo}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{plato.nombre}</h3>
                      <span className="text-primary font-bold">{plato.precio}</span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">{plato.descripcion}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Restaurantes recomendados */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl p-8 border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Utensils className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Restaurantes Recomendados</h3>
              <p className="text-sm text-muted-foreground">Según tu presupuesto</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {restaurantes.map((rest, i) => (
              <motion.div
                key={rest.nombre}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{rest.nombre}</span>
                  <div className="flex items-center text-secondary">
                    {[...Array(rest.precio.length)].map((_, i) => (
                      <DollarSign key={i} className="w-4 h-4" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{rest.tipo}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" className="gap-2">
              Ver todos los restaurantes
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
