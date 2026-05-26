import type {
  LugarRepository,
  EventoRepository,
  RestauranteRepository,
  AlojamientoRepository,
  ResenaRepository,
  GastronomiaRepository,
} from '@/lib/domain/repositories'
import type { Lugar, Evento, Restaurante, Alojamiento, Resena, Gastronomia } from '@/lib/domain/types'
import {
  LugarBuilder,
  EventoBuilder,
  RestauranteBuilder,
  AlojamientoBuilder,
  ResenaBuilder,
  GastronomiaBuilder,
} from '@/lib/domain/builders'
import { supabase } from '@/lib/supabase/client'

function toNumber(value: unknown, fallback: number): number {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function toString(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter(v => typeof v === 'string') : []
}

function toTours(value: unknown): { nombre: string; duracion: string; precio: string }[] {
  if (!Array.isArray(value)) {
    return []
  }
  return value
    .map(tour => ({
      nombre: toString(tour?.nombre, ''),
      duracion: toString(tour?.duracion, ''),
      precio: toString(tour?.precio, ''),
    }))
    .filter(tour => tour.nombre)
}

class SupabaseLugarRepository implements LugarRepository {
  async getAll(): Promise<Lugar[]> {
    const { data, error } = await supabase.from('lugares').select('*')
    if (error) {
      throw error
    }
    return (data ?? []).map(row =>
      LugarBuilder.from({
        id: toString(row.id, ''),
        nombre: toString(row.nombre, ''),
        descripcion: toString(row.descripcion, ''),
        descripcionLarga: toString(row.descripcion_larga, ''),
        imagen: toString(row.imagen_url, ''),
        imagenes: toStringArray(row.imagenes),
        categoria: row.categoria,
        ubicacion: toString(row.ubicacion, ''),
        coordenadas: { lat: toNumber(row.lat, 0), lng: toNumber(row.lng, 0) },
        horarios: toString(row.horarios, ''),
        precioEntrada: toString(row.precio_entrada, ''),
        consejos: toStringArray(row.consejos),
        tours: toTours(row.tours),
        comidasTipicas: toStringArray(row.comidas_tipicas),
        rating: toNumber(row.rating, 0),
        totalResenas: toNumber(row.total_resenas, 0),
      }).build()
    )
  }

  async getById(id: string): Promise<Lugar | null> {
    const { data, error } = await supabase.from('lugares').select('*').eq('id', id).single()
    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw error
    }
    return LugarBuilder.from({
      id: toString(data.id, ''),
      nombre: toString(data.nombre, ''),
      descripcion: toString(data.descripcion, ''),
      descripcionLarga: toString(data.descripcion_larga, ''),
      imagen: toString(data.imagen_url, ''),
      imagenes: toStringArray(data.imagenes),
      categoria: data.categoria,
      ubicacion: toString(data.ubicacion, ''),
      coordenadas: { lat: toNumber(data.lat, 0), lng: toNumber(data.lng, 0) },
      horarios: toString(data.horarios, ''),
      precioEntrada: toString(data.precio_entrada, ''),
      consejos: toStringArray(data.consejos),
      tours: toTours(data.tours),
      comidasTipicas: toStringArray(data.comidas_tipicas),
      rating: toNumber(data.rating, 0),
      totalResenas: toNumber(data.total_resenas, 0),
    }).build()
  }

  async getTop(limit: number): Promise<Lugar[]> {
    const { data, error } = await supabase
      .from('lugares')
      .select('*')
      .order('rating', { ascending: false })
      .limit(limit)
    if (error) {
      throw error
    }
    return (data ?? []).map(row =>
      LugarBuilder.from({
        id: toString(row.id, ''),
        nombre: toString(row.nombre, ''),
        descripcion: toString(row.descripcion, ''),
        descripcionLarga: toString(row.descripcion_larga, ''),
        imagen: toString(row.imagen_url, ''),
        imagenes: toStringArray(row.imagenes),
        categoria: row.categoria,
        ubicacion: toString(row.ubicacion, ''),
        coordenadas: { lat: toNumber(row.lat, 0), lng: toNumber(row.lng, 0) },
        horarios: toString(row.horarios, ''),
        precioEntrada: toString(row.precio_entrada, ''),
        consejos: toStringArray(row.consejos),
        tours: toTours(row.tours),
        comidasTipicas: toStringArray(row.comidas_tipicas),
        rating: toNumber(row.rating, 0),
        totalResenas: toNumber(row.total_resenas, 0),
      }).build()
    )
  }
}

class SupabaseEventoRepository implements EventoRepository {
  async getAll(): Promise<Evento[]> {
    const { data, error } = await supabase.from('eventos').select('*')
    if (error) {
      throw error
    }
    return (data ?? []).map(row =>
      EventoBuilder.from({
        id: toString(row.id, ''),
        nombre: toString(row.nombre, ''),
        descripcion: toString(row.descripcion, ''),
        descripcionLarga: toString(row.descripcion_larga, ''),
        imagen: toString(row.imagen_url, ''),
        imagenes: toStringArray(row.imagenes),
        fecha: toString(row.fecha, ''),
        fechaInicio: toString(row.fecha_inicio, ''),
        fechaFin: toString(row.fecha_fin, ''),
        ubicacion: toString(row.ubicacion, ''),
        coordenadas: { lat: toNumber(row.lat, 0), lng: toNumber(row.lng, 0) },
        consejos: toStringArray(row.consejos),
        destacado: Boolean(row.destacado),
      }).build()
    )
  }

  async getById(id: string): Promise<Evento | null> {
    const { data, error } = await supabase.from('eventos').select('*').eq('id', id).single()
    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw error
    }
    return EventoBuilder.from({
      id: toString(data.id, ''),
      nombre: toString(data.nombre, ''),
      descripcion: toString(data.descripcion, ''),
      descripcionLarga: toString(data.descripcion_larga, ''),
      imagen: toString(data.imagen_url, ''),
      imagenes: toStringArray(data.imagenes),
      fecha: toString(data.fecha, ''),
      fechaInicio: toString(data.fecha_inicio, ''),
      fechaFin: toString(data.fecha_fin, ''),
      ubicacion: toString(data.ubicacion, ''),
      coordenadas: { lat: toNumber(data.lat, 0), lng: toNumber(data.lng, 0) },
      consejos: toStringArray(data.consejos),
      destacado: Boolean(data.destacado),
    }).build()
  }

  async getDestacado(): Promise<Evento | null> {
    const { data, error } = await supabase
      .from('eventos')
      .select('*')
      .eq('destacado', true)
      .limit(1)
      .single()
    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw error
    }
    return EventoBuilder.from({
      id: toString(data.id, ''),
      nombre: toString(data.nombre, ''),
      descripcion: toString(data.descripcion, ''),
      descripcionLarga: toString(data.descripcion_larga, ''),
      imagen: toString(data.imagen_url, ''),
      imagenes: toStringArray(data.imagenes),
      fecha: toString(data.fecha, ''),
      fechaInicio: toString(data.fecha_inicio, ''),
      fechaFin: toString(data.fecha_fin, ''),
      ubicacion: toString(data.ubicacion, ''),
      coordenadas: { lat: toNumber(data.lat, 0), lng: toNumber(data.lng, 0) },
      consejos: toStringArray(data.consejos),
      destacado: Boolean(data.destacado),
    }).build()
  }
}

class SupabaseRestauranteRepository implements RestauranteRepository {
  async getAll(): Promise<Restaurante[]> {
    const { data, error } = await supabase.from('restaurantes').select('*')
    if (error) {
      throw error
    }
    return (data ?? []).map(row =>
      RestauranteBuilder.from({
        id: toString(row.id, ''),
        nombre: toString(row.nombre, ''),
        tipo: row.tipo,
        especialidad: toString(row.especialidad, ''),
        imagen: toString(row.imagen_url, ''),
        direccion: toString(row.direccion, ''),
        coordenadas: { lat: toNumber(row.lat, 0), lng: toNumber(row.lng, 0) },
        precioPromedio: toString(row.precio_promedio, ''),
        horarios: toString(row.horarios, ''),
        rating: toNumber(row.rating, 0),
        telefono: toString(row.telefono, ''),
      }).build()
    )
  }
}

class SupabaseAlojamientoRepository implements AlojamientoRepository {
  async getAll(): Promise<Alojamiento[]> {
    const { data, error } = await supabase.from('alojamientos').select('*')
    if (error) {
      throw error
    }
    return (data ?? []).map(row =>
      AlojamientoBuilder.from({
        id: toString(row.id, ''),
        nombre: toString(row.nombre, ''),
        tipo: row.tipo,
        imagen: toString(row.imagen_url, ''),
        direccion: toString(row.direccion, ''),
        coordenadas: { lat: toNumber(row.lat, 0), lng: toNumber(row.lng, 0) },
        precioNoche: toString(row.precio_noche, ''),
        servicios: toStringArray(row.servicios),
        rating: toNumber(row.rating, 0),
        telefono: toString(row.telefono, ''),
      }).build()
    )
  }
}

class SupabaseResenaRepository implements ResenaRepository {
  async getAll(): Promise<Resena[]> {
    const { data, error } = await supabase.from('resenas').select('*')
    if (error) {
      throw error
    }
    return (data ?? []).map(row =>
      ResenaBuilder.from({
        id: toString(row.id, ''),
        usuarioId: toString(row.usuario_id, ''),
        usuarioNombre: toString(row.usuario_nombre, ''),
        usuarioFoto: toString(row.usuario_foto_url, ''),
        lugarId: row.lugar_id ?? undefined,
        restauranteId: row.restaurante_id ?? undefined,
        eventoId: row.evento_id ?? undefined,
        rating: toNumber(row.rating, 0),
        comentario: toString(row.comentario, ''),
        fecha: toString(row.fecha, ''),
        likes: toNumber(row.likes, 0),
      }).build()
    )
  }

  async getByLugarId(lugarId: string): Promise<Resena[]> {
    const { data, error } = await supabase.from('resenas').select('*').eq('lugar_id', lugarId)
    if (error) {
      throw error
    }
    return (data ?? []).map(row =>
      ResenaBuilder.from({
        id: toString(row.id, ''),
        usuarioId: toString(row.usuario_id, ''),
        usuarioNombre: toString(row.usuario_nombre, ''),
        usuarioFoto: toString(row.usuario_foto_url, ''),
        lugarId: row.lugar_id ?? undefined,
        restauranteId: row.restaurante_id ?? undefined,
        eventoId: row.evento_id ?? undefined,
        rating: toNumber(row.rating, 0),
        comentario: toString(row.comentario, ''),
        fecha: toString(row.fecha, ''),
        likes: toNumber(row.likes, 0),
      }).build()
    )
  }

  async getByRestauranteId(restauranteId: string): Promise<Resena[]> {
    const { data, error } = await supabase
      .from('resenas')
      .select('*')
      .eq('restaurante_id', restauranteId)
    if (error) {
      throw error
    }
    return (data ?? []).map(row =>
      ResenaBuilder.from({
        id: toString(row.id, ''),
        usuarioId: toString(row.usuario_id, ''),
        usuarioNombre: toString(row.usuario_nombre, ''),
        usuarioFoto: toString(row.usuario_foto_url, ''),
        lugarId: row.lugar_id ?? undefined,
        restauranteId: row.restaurante_id ?? undefined,
        eventoId: row.evento_id ?? undefined,
        rating: toNumber(row.rating, 0),
        comentario: toString(row.comentario, ''),
        fecha: toString(row.fecha, ''),
        likes: toNumber(row.likes, 0),
      }).build()
    )
  }

  async getByEventoId(eventoId: string): Promise<Resena[]> {
    const { data, error } = await supabase.from('resenas').select('*').eq('evento_id', eventoId)
    if (error) {
      throw error
    }
    return (data ?? []).map(row =>
      ResenaBuilder.from({
        id: toString(row.id, ''),
        usuarioId: toString(row.usuario_id, ''),
        usuarioNombre: toString(row.usuario_nombre, ''),
        usuarioFoto: toString(row.usuario_foto_url, ''),
        lugarId: row.lugar_id ?? undefined,
        restauranteId: row.restaurante_id ?? undefined,
        eventoId: row.evento_id ?? undefined,
        rating: toNumber(row.rating, 0),
        comentario: toString(row.comentario, ''),
        fecha: toString(row.fecha, ''),
        likes: toNumber(row.likes, 0),
      }).build()
    )
  }
}

class SupabaseGastronomiaRepository implements GastronomiaRepository {
  async getAll(): Promise<Gastronomia[]> {
    const { data, error } = await supabase.from('gastronomia').select('*')
    if (error) {
      throw error
    }
    return (data ?? []).map(row =>
      GastronomiaBuilder.from({
        id: toString(row.id, ''),
        nombre: toString(row.nombre, ''),
        descripcion: toString(row.descripcion, ''),
        imagen: toString(row.imagen_url, ''),
        ingredientes: toStringArray(row.ingredientes),
        origen: toString(row.origen, ''),
        precioPromedio: toString(row.precio_promedio, ''),
      }).build()
    )
  }
}

export class SupabaseRepositoryFactory {
  createLugarRepository(): LugarRepository {
    return new SupabaseLugarRepository()
  }

  createEventoRepository(): EventoRepository {
    return new SupabaseEventoRepository()
  }

  createRestauranteRepository(): RestauranteRepository {
    return new SupabaseRestauranteRepository()
  }

  createAlojamientoRepository(): AlojamientoRepository {
    return new SupabaseAlojamientoRepository()
  }

  createResenaRepository(): ResenaRepository {
    return new SupabaseResenaRepository()
  }

  createGastronomiaRepository(): GastronomiaRepository {
    return new SupabaseGastronomiaRepository()
  }
}
