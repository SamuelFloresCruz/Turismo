export interface Lugar {
  id: string
  nombre: string
  descripcion: string
  descripcionLarga: string
  imagen: string
  imagenes: string[]
  categoria: "naturaleza" | "cultura" | "aventura" | "arqueologia"
  ubicacion: string
  coordenadas: { lat: number; lng: number }
  horarios: string
  precioEntrada: string
  consejos: string[]
  tours: { nombre: string; duracion: string; precio: string }[]
  comidasTipicas: string[]
  rating: number
  totalResenas: number
}

export interface Restaurante {
  id: string
  nombre: string
  tipo: "barato" | "normal" | "caro"
  especialidad: string
  imagen: string
  direccion: string
  coordenadas: { lat: number; lng: number }
  precioPromedio: string
  horarios: string
  rating: number
  telefono: string
}

export interface Alojamiento {
  id: string
  nombre: string
  tipo: "economico" | "estandar" | "premium"
  imagen: string
  direccion: string
  coordenadas: { lat: number; lng: number }
  precioNoche: string
  servicios: string[]
  rating: number
  telefono: string
}

export interface Evento {
  id: string
  nombre: string
  descripcion: string
  descripcionLarga: string
  imagen: string
  imagenes: string[]
  fecha: string
  fechaInicio: string
  fechaFin: string
  ubicacion: string
  coordenadas: { lat: number; lng: number }
  consejos: string[]
  destacado: boolean
}

export interface Resena {
  id: string
  usuarioId: string
  usuarioNombre: string
  usuarioFoto: string
  lugarId?: string
  restauranteId?: string
  eventoId?: string
  rating: number
  comentario: string
  fecha: string
  likes: number
}

export interface Gastronomia {
  id: string
  nombre: string
  descripcion: string
  imagen: string
  ingredientes: string[]
  origen: string
  precioPromedio: string
}
