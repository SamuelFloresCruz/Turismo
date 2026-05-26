import type {
  LugarRepository,
  EventoRepository,
  RestauranteRepository,
  AlojamientoRepository,
  ResenaRepository,
  GastronomiaRepository,
} from '@/lib/domain/repositories'
import { InMemoryRepositoryFactory } from '@/lib/domain/repository-memory'
import { SupabaseRepositoryFactory } from '@/lib/domain/repository-supabase'

export type RepositoryFactoryType = 'memory' | 'supabase'

export abstract class RepositoryFactory {
  static create(type: RepositoryFactoryType): RepositoryFactory {
    if (type === 'memory') {
      return new InMemoryRepositoryFactory()
    }
    return new SupabaseRepositoryFactory()
  }

  abstract createLugarRepository(): LugarRepository
  abstract createEventoRepository(): EventoRepository
  abstract createRestauranteRepository(): RestauranteRepository
  abstract createAlojamientoRepository(): AlojamientoRepository
  abstract createResenaRepository(): ResenaRepository
  abstract createGastronomiaRepository(): GastronomiaRepository
}
