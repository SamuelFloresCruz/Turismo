import type {
  Lugar,
  Restaurante,
  Alojamiento,
  Evento,
  Resena,
  Gastronomia,
} from '@/lib/domain/types'

function assertRequired<T>(data: Partial<T>, keys: (keyof T)[], label: string): void {
  for (const key of keys) {
    if (data[key] === undefined || data[key] === null) {
      throw new Error(`${label} missing required field: ${String(key)}`)
    }
  }
}

export class LugarBuilder {
  private data: Partial<Lugar> = {}

  static from(data: Lugar): LugarBuilder {
    return new LugarBuilder().with(data)
  }

  with(data: Partial<Lugar>): this {
    this.data = { ...this.data, ...data }
    return this
  }

  build(): Lugar {
    assertRequired<Lugar>(
      this.data,
      [
        'id',
        'nombre',
        'descripcion',
        'descripcionLarga',
        'imagen',
        'imagenes',
        'categoria',
        'ubicacion',
        'coordenadas',
        'horarios',
        'precioEntrada',
        'consejos',
        'tours',
        'comidasTipicas',
        'rating',
        'totalResenas',
      ],
      'Lugar'
    )
    return this.data as Lugar
  }
}

export class RestauranteBuilder {
  private data: Partial<Restaurante> = {}

  static from(data: Restaurante): RestauranteBuilder {
    return new RestauranteBuilder().with(data)
  }

  with(data: Partial<Restaurante>): this {
    this.data = { ...this.data, ...data }
    return this
  }

  build(): Restaurante {
    assertRequired<Restaurante>(
      this.data,
      [
        'id',
        'nombre',
        'tipo',
        'especialidad',
        'imagen',
        'direccion',
        'coordenadas',
        'precioPromedio',
        'horarios',
        'rating',
        'telefono',
      ],
      'Restaurante'
    )
    return this.data as Restaurante
  }
}

export class AlojamientoBuilder {
  private data: Partial<Alojamiento> = {}

  static from(data: Alojamiento): AlojamientoBuilder {
    return new AlojamientoBuilder().with(data)
  }

  with(data: Partial<Alojamiento>): this {
    this.data = { ...this.data, ...data }
    return this
  }

  build(): Alojamiento {
    assertRequired<Alojamiento>(
      this.data,
      [
        'id',
        'nombre',
        'tipo',
        'imagen',
        'direccion',
        'coordenadas',
        'precioNoche',
        'servicios',
        'rating',
        'telefono',
      ],
      'Alojamiento'
    )
    return this.data as Alojamiento
  }
}

export class EventoBuilder {
  private data: Partial<Evento> = {}

  static from(data: Evento): EventoBuilder {
    return new EventoBuilder().with(data)
  }

  with(data: Partial<Evento>): this {
    this.data = { ...this.data, ...data }
    return this
  }

  build(): Evento {
    assertRequired<Evento>(
      this.data,
      [
        'id',
        'nombre',
        'descripcion',
        'descripcionLarga',
        'imagen',
        'imagenes',
        'fecha',
        'fechaInicio',
        'fechaFin',
        'ubicacion',
        'coordenadas',
        'consejos',
        'destacado',
      ],
      'Evento'
    )
    return this.data as Evento
  }
}

export class ResenaBuilder {
  private data: Partial<Resena> = {}

  static from(data: Resena): ResenaBuilder {
    return new ResenaBuilder().with(data)
  }

  with(data: Partial<Resena>): this {
    this.data = { ...this.data, ...data }
    return this
  }

  build(): Resena {
    assertRequired<Resena>(
      this.data,
      [
        'id',
        'usuarioId',
        'usuarioNombre',
        'usuarioFoto',
        'rating',
        'comentario',
        'fecha',
        'likes',
      ],
      'Resena'
    )
    return this.data as Resena
  }
}

export class GastronomiaBuilder {
  private data: Partial<Gastronomia> = {}

  static from(data: Gastronomia): GastronomiaBuilder {
    return new GastronomiaBuilder().with(data)
  }

  with(data: Partial<Gastronomia>): this {
    this.data = { ...this.data, ...data }
    return this
  }

  build(): Gastronomia {
    assertRequired<Gastronomia>(
      this.data,
      ['id', 'nombre', 'descripcion', 'imagen', 'ingredientes', 'origen', 'precioPromedio'],
      'Gastronomia'
    )
    return this.data as Gastronomia
  }
}
