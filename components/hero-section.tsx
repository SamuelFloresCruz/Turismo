'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Utensils, Star, Map, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

const Hero3D = dynamic(() => import('./hero-3d'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/20 to-secondary/20" />
  )
})

const quickLinks = [
  { icon: MapPin, label: 'Lugares', color: 'bg-primary' },
  { icon: Calendar, label: 'Eventos', color: 'bg-accent' },
  { icon: Map, label: 'Mapa', color: 'bg-chart-4' },
  { icon: Utensils, label: 'Gastronomía', color: 'bg-secondary text-secondary-foreground' },
  { icon: Star, label: 'Reseñas', color: 'bg-chart-3' },
  { icon: Bot, label: 'AI', color: 'bg-chart-5' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <Hero3D />
      
      {/* Overlay para mejor legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              🇧🇴 La Ciudad Jardín de Bolivia
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 text-balance"
          >
            Descubre{' '}
            <span className="text-primary">Cochabamba</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty"
          >
            Explora la riqueza cultural, los paisajes impresionantes y la deliciosa gastronomía de una de las ciudades más hermosas de Bolivia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button size="lg" className="gap-2 text-lg px-8">
              <MapPin className="w-5 h-5" />
              Explorar Lugares
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
              <Bot className="w-5 h-5" />
              Planificar con AI
            </Button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-3 md:grid-cols-6 gap-4"
          >
            {quickLinks.map((link, i) => (
              <motion.button
                key={link.label}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary transition-colors"
              >
                <div className={`w-12 h-12 rounded-full ${link.color} flex items-center justify-center text-primary-foreground`}>
                  <link.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-foreground">{link.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
