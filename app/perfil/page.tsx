'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ImageOrPlaceholder } from '@/components/ui/image-or-placeholder'
import Link from 'next/link'
import { 
  User, Heart, MessageSquare, Settings, LogOut, Camera, 
  MapPin, Star, Calendar, Edit2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { DataService } from '@/lib/domain/data-service'
import type { Lugar, Resena } from '@/lib/domain/types'

// Datos simulados del usuario
const usuarioSimulado = {
  nombre: 'María García',
  email: 'maria@ejemplo.com',
  foto: '',
  miembro_desde: 'Enero 2024',
  favoritos: ['cristo-concordia', 'torotoro', 'tunari'],
  resenasCount: 5
}

export default function PerfilPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [lugares, setLugares] = useState<Lugar[]>([])
  const [resenas, setResenas] = useState<Resena[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const service = new DataService()

    const load = async () => {
      try {
        const [lugaresData, resenasData] = await Promise.all([
          service.lugares().getAll(),
          service.resenas().getAll(),
        ])
        if (!active) {
          return
        }
        setLugares(lugaresData)
        setResenas(resenasData)
      } catch (error) {
        console.error('Error loading perfil data', error)
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
  }, [])

  const favoritosData = lugares.filter(l => usuarioSimulado.favoritos.includes(l.id))
  const misResenas = resenas.filter(r => r.usuarioId === 'u1')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Cargando perfil...
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Accede a tu perfil
              </h1>
              <p className="text-muted-foreground mb-6">
                Inicia sesión para ver tus lugares favoritos, historial de reseñas 
                y gestionar tu cuenta.
              </p>
              <div className="space-y-3">
                <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
                  Iniciar sesión
                </Button>
                <Button variant="outline" className="w-full">
                  Crear cuenta
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Solo necesitas una cuenta para escribir reseñas y guardar favoritos.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header del perfil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Foto de perfil */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary">
                    <ImageOrPlaceholder
                      src={usuarioSimulado.foto}
                      alt={usuarioSimulado.nombre}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    {isEditing ? (
                      <Input 
                        defaultValue={usuarioSimulado.nombre}
                        className="max-w-xs"
                      />
                    ) : (
                      <h1 className="text-2xl font-bold text-foreground">{usuarioSimulado.nombre}</h1>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-3">{usuarioSimulado.email}</p>
                  <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                    <Badge variant="secondary">
                      <Calendar className="w-3 h-3 mr-1" />
                      Miembro desde {usuarioSimulado.miembro_desde}
                    </Badge>
                    <Badge variant="outline">
                      <Heart className="w-3 h-3 mr-1" />
                      {usuarioSimulado.favoritos.length} favoritos
                    </Badge>
                    <Badge variant="outline">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {usuarioSimulado.resenasCount} reseñas
                    </Badge>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contenido */}
        <Tabs defaultValue="favoritos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="favoritos" className="gap-2">
              <Heart className="w-4 h-4" />
              Favoritos
            </TabsTrigger>
            <TabsTrigger value="resenas" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Mis Reseñas
            </TabsTrigger>
          </TabsList>

          {/* Tab: Favoritos */}
          <TabsContent value="favoritos">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {favoritosData.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoritosData.map((lugar, i) => (
                    <motion.div
                      key={lugar.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link href={`/lugares/${lugar.id}`}>
                        <Card className="overflow-hidden group cursor-pointer">
                          <div className="relative h-32">
                            <ImageOrPlaceholder
                              src={lugar.imagen}
                              alt={lugar.nombre}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <button 
                              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center"
                              onClick={(e) => { e.preventDefault(); }}
                            >
                              <Heart className="w-4 h-4 fill-accent text-accent" />
                            </button>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {lugar.nombre}
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-secondary text-secondary" />
                                <span className="text-sm">{lugar.rating}</span>
                              </div>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {lugar.ubicacion.split(',')[0]}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No tienes favoritos aún</h3>
                    <p className="text-muted-foreground mb-4">
                      Explora lugares y guárdalos para acceder fácilmente después.
                    </p>
                    <Button asChild>
                      <Link href="/lugares">Explorar lugares</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </TabsContent>

          {/* Tab: Mis Reseñas */}
          <TabsContent value="resenas">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {misResenas.length > 0 ? (
                misResenas.map((resena, i) => {
                  const lugar = lugares.find(l => l.id === resena.lugarId)
                  return (
                    <motion.div
                      key={resena.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            {lugar && (
                              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <ImageOrPlaceholder
                                  src={lugar.imagen}
                                  alt={lugar.nombre}
                                  width={80}
                                  height={80}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <Link 
                                    href={`/lugares/${resena.lugarId}`}
                                    className="font-semibold hover:text-primary transition-colors"
                                  >
                                    {lugar?.nombre}
                                  </Link>
                                  <p className="text-sm text-muted-foreground">{resena.fecha}</p>
                                </div>
                                <Button variant="ghost" size="icon">
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < resena.rating ? 'fill-secondary text-secondary' : 'text-muted'}`} 
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground">{resena.comentario}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No has escrito reseñas</h3>
                    <p className="text-muted-foreground mb-4">
                      Comparte tu experiencia para ayudar a otros viajeros.
                    </p>
                    <Button asChild>
                      <Link href="/resenas">Escribir reseña</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
