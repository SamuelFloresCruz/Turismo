'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Users, ArrowRight, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ImageOrPlaceholder } from '@/components/ui/image-or-placeholder'

const eventos = [
  {
    id: 1,
    nombre: 'Carnaval de Cochabamba',
    descripcion: 'La fiesta más grande del año con corso, comparsas y música tradicional.',
    imagen: '',
    fecha: 'Febrero 2026',
    ubicacion: 'Centro de la ciudad',
    tipo: 'Festival',
    asistentes: '50,000+',
  },
  {
    id: 2,
    nombre: 'Urkupiña',
    descripcion: 'Festividad religiosa y cultural con danzas folclóricas y peregrinación.',
    imagen: '',
    fecha: '14-16 Agosto 2026',
    ubicacion: 'Quillacollo',
    tipo: 'Religioso',
    asistentes: '100,000+',
  },
  {
    id: 3,
    nombre: 'Feria de las Flores',
    descripcion: 'Exposición de flores, plantas y jardines con concursos y venta.',
    imagen: '',
    fecha: 'Septiembre 2026',
    ubicacion: 'Parque de la Torre',
    tipo: 'Exposición',
    asistentes: '20,000+',
  },
  {
    id: 4,
    nombre: 'Festival Gastronómico',
    descripcion: 'Celebración de la cocina boliviana con los mejores chefs locales.',
    imagen: '',
    fecha: 'Noviembre 2026',
    ubicacion: 'Plaza Colón',
    tipo: 'Gastronomía',
    asistentes: '15,000+',
  },
  {
    id: 5,
    nombre: 'Día de Cochabamba',
    descripcion: 'Celebración del aniversario departamental con desfiles y eventos.',
    imagen: '',
    fecha: '14 Septiembre 2026',
    ubicacion: 'Toda la ciudad',
    tipo: 'Cívico',
    asistentes: '200,000+',
  },
  {
    id: 6,
    nombre: 'Festival de Jazz',
    descripcion: 'Música en vivo con artistas nacionales e internacionales.',
    imagen: '',
    fecha: 'Octubre 2026',
    ubicacion: 'Teatro Achá',
    tipo: 'Música',
    asistentes: '5,000+',
  },
]

const tipoColors: Record<string, string> = {
  Festival: 'bg-accent text-accent-foreground',
  Religioso: 'bg-primary text-primary-foreground',
  Exposición: 'bg-chart-4 text-primary-foreground',
  Gastronomía: 'bg-secondary text-secondary-foreground',
  Cívico: 'bg-chart-1 text-primary-foreground',
  Música: 'bg-chart-5 text-primary-foreground',
}

export default function EventosSection() {
  return (
    <section id="eventos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
            No te lo pierdas
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Eventos Culturales
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vive la cultura cochabambina en sus festividades más importantes y eventos únicos durante todo el año.
          </p>
        </motion.div>

        {/* Evento destacado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="overflow-hidden border-2 border-accent/30">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <ImageOrPlaceholder
                  src={eventos[1].imagen}
                  alt={eventos[1].nombre}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent md:bg-gradient-to-t" />
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <Ticket className="w-4 h-4" />
                    Evento Destacado
                  </span>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <span className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-medium mb-4 ${tipoColors[eventos[1].tipo]}`}>
                  {eventos[1].tipo}
                </span>
                <h3 className="text-3xl font-bold text-foreground mb-4">{eventos[1].nombre}</h3>
                <p className="text-muted-foreground mb-6">{eventos[1].descripcion}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    {eventos[1].fecha}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    {eventos[1].ubicacion}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    {eventos[1].asistentes} asistentes
                  </div>
                </div>
                <Button className="w-fit gap-2">
                  Más información
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        {/* Grid de eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.filter((_, i) => i !== 1).map((evento, index) => (
            <motion.div
              key={evento.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50">
                <div className="relative h-48 overflow-hidden">
                  <ImageOrPlaceholder
                    src={evento.imagen}
                    alt={evento.nombre}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${tipoColors[evento.tipo]}`}>
                    {evento.tipo}
                  </span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 text-primary-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{evento.fecha}</span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {evento.nombre}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {evento.descripcion}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {evento.ubicacion}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {evento.asistentes}
                    </div>
                  </div>
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
            Ver calendario completo
            <Calendar className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
