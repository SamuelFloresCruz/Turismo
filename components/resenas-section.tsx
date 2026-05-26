'use client'

import { motion } from 'framer-motion'
import { Star, ThumbsUp, User, MapPin, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const resenas = [
  {
    id: 1,
    usuario: 'María García',
    avatar: '',
    lugar: 'Cristo de la Concordia',
    rating: 5,
    comentario: 'Una experiencia increíble. Las vistas desde arriba son espectaculares y la subida por el teleférico es muy emocionante. ¡Totalmente recomendado!',
    fecha: 'Hace 2 días',
    likes: 45,
  },
  {
    id: 2,
    usuario: 'Carlos Mendoza',
    avatar: '',
    lugar: 'Parque Nacional Torotoro',
    rating: 5,
    comentario: 'Las huellas de dinosaurios y las cuevas son impresionantes. Contraten un guía local, vale la pena cada centavo. Llevar agua y protector solar.',
    fecha: 'Hace 1 semana',
    likes: 78,
  },
  {
    id: 3,
    usuario: 'Ana Quispe',
    avatar: '',
    lugar: 'La Cancha',
    rating: 4,
    comentario: 'El mercado más grande que he visto. Puedes encontrar absolutamente todo. Ir temprano para evitar las multitudes y cuidar tus pertenencias.',
    fecha: 'Hace 3 días',
    likes: 32,
  },
  {
    id: 4,
    usuario: 'Roberto Flores',
    avatar: '',
    lugar: 'Palacio Portales',
    rating: 5,
    comentario: 'Arquitectura impresionante y jardines hermosos. La historia del lugar es fascinante. Un pedazo de Europa en Bolivia.',
    fecha: 'Hace 5 días',
    likes: 56,
  },
  {
    id: 5,
    usuario: 'Laura Choque',
    avatar: '',
    lugar: 'Cerro Tunari',
    rating: 5,
    comentario: 'Para los amantes del trekking, es obligatorio. La vista desde la cima es de otro mundo. Prepararse para el frío y llevar snacks.',
    fecha: 'Hace 1 semana',
    likes: 89,
  },
  {
    id: 6,
    usuario: 'Diego Vargas',
    avatar: '',
    lugar: 'Laguna Alalay',
    rating: 4,
    comentario: 'Perfecto para paseos en bicicleta o caminatas tranquilas. Muchas aves para observar. Los domingos hay mucha gente.',
    fecha: 'Hace 4 días',
    likes: 28,
  },
]

const topRated = [
  { nombre: 'Cristo de la Concordia', rating: 4.9, reviews: 2340 },
  { nombre: 'Parque Nacional Torotoro', rating: 4.9, reviews: 1856 },
  { nombre: 'Cerro Tunari', rating: 4.8, reviews: 1234 },
  { nombre: 'Palacio Portales', rating: 4.8, reviews: 987 },
  { nombre: 'Incallajta', rating: 4.8, reviews: 876 },
  { nombre: 'Plaza 14 de Septiembre', rating: 4.7, reviews: 3421 },
  { nombre: 'La Cancha', rating: 4.6, reviews: 2109 },
  { nombre: 'Laguna Alalay', rating: 4.5, reviews: 1567 },
  { nombre: 'Valle de la Luna', rating: 4.4, reviews: 654 },
  { nombre: 'Colcapirhua', rating: 4.3, reviews: 432 },
]

export default function ResenasSection() {
  return (
    <section id="resenas" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-chart-1/20 text-chart-1 rounded-full text-sm font-medium mb-4">
            Experiencias reales
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Reseñas de Viajeros
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lee las experiencias de otros viajeros y comparte la tuya para ayudar a la comunidad.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Reseñas */}
          <div className="lg:col-span-2 space-y-4">
            {resenas.map((resena, index) => (
              <motion.div
                key={resena.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={resena.avatar} alt={resena.usuario} />
                        <AvatarFallback>{resena.usuario.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{resena.usuario}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {resena.lugar}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < resena.rating ? 'fill-secondary text-secondary' : 'text-muted'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="relative">
                          <Quote className="absolute -left-2 -top-2 w-6 h-6 text-muted/30" />
                          <p className="text-muted-foreground pl-4">{resena.comentario}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                          <span className="text-xs text-muted-foreground">{resena.fecha}</span>
                          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                            <ThumbsUp className="w-4 h-4" />
                            {resena.likes}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center pt-4"
            >
              <Button variant="outline" className="gap-2">
                Ver más reseñas
                <Star className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          {/* Top 10 Ranking */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24 border-2 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Top 10 Lugares</h3>
                    <p className="text-xs text-muted-foreground">Mejor valorados</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {topRated.map((lugar, index) => (
                    <motion.div
                      key={lugar.nombre}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index < 3 ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{lugar.nombre}</p>
                        <p className="text-xs text-muted-foreground">{lugar.reviews} reseñas</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-secondary text-secondary" />
                        <span className="text-sm font-medium text-foreground">{lugar.rating}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <Button className="w-full gap-2">
                    <User className="w-4 h-4" />
                    Escribir reseña
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
