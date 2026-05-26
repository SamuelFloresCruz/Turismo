import { RepositoryFactory, type RepositoryFactoryType } from '@/lib/domain/repository-factory'
import type {
  LugarRepository,
  EventoRepository,
  RestauranteRepository,
  AlojamientoRepository,
  ResenaRepository,
  GastronomiaRepository,
} from '@/lib/domain/repositories'

function getDefaultFactoryType(): RepositoryFactoryType {
  const hasSupabase = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  return hasSupabase ? 'supabase' : 'memory'
}

export class DataService {
  private factory: RepositoryFactory

  constructor(type: RepositoryFactoryType = getDefaultFactoryType()) {
    this.factory = RepositoryFactory.create(type)
  }

  lugares(): LugarRepository {
    return this.factory.createLugarRepository()
  }

  eventos(): EventoRepository {
    return this.factory.createEventoRepository()
  }

  restaurantes(): RestauranteRepository {
    return this.factory.createRestauranteRepository()
  }

  alojamientos(): AlojamientoRepository {
    return this.factory.createAlojamientoRepository()
  }

  resenas(): ResenaRepository {
    return this.factory.createResenaRepository()
  }

  gastronomia(): GastronomiaRepository {
    return this.factory.createGastronomiaRepository()
  }
}
