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
import {
  lugares,
  eventos,
  restaurantes,
  alojamientos,
  resenasEjemplo,
  gastronomia,
} from '@/lib/data'

class InMemoryLugarRepository implements LugarRepository {
  async getAll(): Promise<Lugar[]> {
    return lugares.map(l => LugarBuilder.from(l).build())
  }

  async getById(id: string): Promise<Lugar | null> {
    const lugar = lugares.find(l => l.id === id)
    return lugar ? LugarBuilder.from(lugar).build() : null
  }

  async getTop(limit: number): Promise<Lugar[]> {
    return [...lugares]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
      .map(l => LugarBuilder.from(l).build())
  }
}

class InMemoryEventoRepository implements EventoRepository {
  async getAll(): Promise<Evento[]> {
    return eventos.map(e => EventoBuilder.from(e).build())
  }

  async getById(id: string): Promise<Evento | null> {
    const evento = eventos.find(e => e.id === id)
    return evento ? EventoBuilder.from(evento).build() : null
  }

  async getDestacado(): Promise<Evento | null> {
    const evento = eventos.find(e => e.destacado)
    return evento ? EventoBuilder.from(evento).build() : null
  }
}

class InMemoryRestauranteRepository implements RestauranteRepository {
  async getAll(): Promise<Restaurante[]> {
    return restaurantes.map(r => RestauranteBuilder.from(r).build())
  }
}

class InMemoryAlojamientoRepository implements AlojamientoRepository {
  async getAll(): Promise<Alojamiento[]> {
    return alojamientos.map(a => AlojamientoBuilder.from(a).build())
  }
}

class InMemoryResenaRepository implements ResenaRepository {
  async getAll(): Promise<Resena[]> {
    return resenasEjemplo.map(r => ResenaBuilder.from(r).build())
  }

  async getByLugarId(lugarId: string): Promise<Resena[]> {
    return resenasEjemplo
      .filter(r => r.lugarId === lugarId)
      .map(r => ResenaBuilder.from(r).build())
  }

  async getByRestauranteId(restauranteId: string): Promise<Resena[]> {
    return resenasEjemplo
      .filter(r => r.restauranteId === restauranteId)
      .map(r => ResenaBuilder.from(r).build())
  }

  async getByEventoId(eventoId: string): Promise<Resena[]> {
    return resenasEjemplo
      .filter(r => r.eventoId === eventoId)
      .map(r => ResenaBuilder.from(r).build())
  }
}

class InMemoryGastronomiaRepository implements GastronomiaRepository {
  async getAll(): Promise<Gastronomia[]> {
    return gastronomia.map(g => GastronomiaBuilder.from(g).build())
  }
}

export class InMemoryRepositoryFactory {
  createLugarRepository(): LugarRepository {
    return new InMemoryLugarRepository()
  }

  createEventoRepository(): EventoRepository {
    return new InMemoryEventoRepository()
  }

  createRestauranteRepository(): RestauranteRepository {
    return new InMemoryRestauranteRepository()
  }

  createAlojamientoRepository(): AlojamientoRepository {
    return new InMemoryAlojamientoRepository()
  }

  createResenaRepository(): ResenaRepository {
    return new InMemoryResenaRepository()
  }

  createGastronomiaRepository(): GastronomiaRepository {
    return new InMemoryGastronomiaRepository()
  }
}
