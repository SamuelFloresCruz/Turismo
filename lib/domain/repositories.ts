import type { Lugar, Evento, Restaurante, Alojamiento, Resena, Gastronomia } from '@/lib/domain/types'

export interface LugarRepository {
  getAll(): Promise<Lugar[]>
  getById(id: string): Promise<Lugar | null>
  getTop(limit: number): Promise<Lugar[]>
}

export interface EventoRepository {
  getAll(): Promise<Evento[]>
  getById(id: string): Promise<Evento | null>
  getDestacado(): Promise<Evento | null>
}

export interface RestauranteRepository {
  getAll(): Promise<Restaurante[]>
}

export interface AlojamientoRepository {
  getAll(): Promise<Alojamiento[]>
}

export interface ResenaRepository {
  getAll(): Promise<Resena[]>
  getByLugarId(lugarId: string): Promise<Resena[]>
  getByRestauranteId(restauranteId: string): Promise<Resena[]>
  getByEventoId(eventoId: string): Promise<Resena[]>
}

export interface GastronomiaRepository {
  getAll(): Promise<Gastronomia[]>
}
