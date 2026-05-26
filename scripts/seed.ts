import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
import {
  lugares,
  eventos,
  restaurantes,
  alojamientos,
  resenasEjemplo,
  gastronomia,
} from '@/lib/data'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const shouldClear = process.env.SEED_CLEAR === '1'

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL')
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
})

function toNullIfEmpty(value: string): string | null {
  return value.trim() ? value : null
}

async function upsertTable<T>(table: string, rows: T[]) {
  if (rows.length === 0) {
    return
  }
  const { error } = await supabase.from(table).upsert(rows, { onConflict: 'id' })
  if (error) {
    throw error
  }
}

async function clearTable(table: string) {
  const { error } = await supabase.from(table).delete().neq('id', '')
  if (error) {
    throw error
  }
}

async function run() {
  if (shouldClear) {
    await clearTable('resenas')
    await clearTable('gastronomia')
    await clearTable('alojamientos')
    await clearTable('restaurantes')
    await clearTable('eventos')
    await clearTable('lugares')
  }

  await upsertTable('lugares',
    lugares.map(lugar => ({
      id: lugar.id,
      nombre: lugar.nombre,
      descripcion: lugar.descripcion,
      descripcion_larga: lugar.descripcionLarga,
      categoria: lugar.categoria,
      ubicacion: lugar.ubicacion,
      lat: lugar.coordenadas.lat,
      lng: lugar.coordenadas.lng,
      horarios: lugar.horarios,
      precio_entrada: lugar.precioEntrada,
      consejos: lugar.consejos,
      tours: lugar.tours,
      comidas_tipicas: lugar.comidasTipicas,
      rating: lugar.rating,
      total_resenas: lugar.totalResenas,
      imagen_url: toNullIfEmpty(lugar.imagen),
      imagenes: lugar.imagenes.filter(Boolean),
    }))
  )

  await upsertTable('eventos',
    eventos.map(evento => ({
      id: evento.id,
      nombre: evento.nombre,
      descripcion: evento.descripcion,
      descripcion_larga: evento.descripcionLarga,
      fecha: evento.fecha,
      fecha_inicio: toNullIfEmpty(evento.fechaInicio),
      fecha_fin: toNullIfEmpty(evento.fechaFin),
      ubicacion: evento.ubicacion,
      lat: evento.coordenadas.lat,
      lng: evento.coordenadas.lng,
      consejos: evento.consejos,
      destacado: evento.destacado,
      imagen_url: toNullIfEmpty(evento.imagen),
      imagenes: evento.imagenes.filter(Boolean),
    }))
  )

  await upsertTable('restaurantes',
    restaurantes.map(rest => ({
      id: rest.id,
      nombre: rest.nombre,
      tipo: rest.tipo,
      especialidad: rest.especialidad,
      direccion: rest.direccion,
      lat: rest.coordenadas.lat,
      lng: rest.coordenadas.lng,
      precio_promedio: rest.precioPromedio,
      horarios: rest.horarios,
      rating: rest.rating,
      telefono: rest.telefono,
      imagen_url: toNullIfEmpty(rest.imagen),
    }))
  )

  await upsertTable('alojamientos',
    alojamientos.map(aloj => ({
      id: aloj.id,
      nombre: aloj.nombre,
      tipo: aloj.tipo,
      direccion: aloj.direccion,
      lat: aloj.coordenadas.lat,
      lng: aloj.coordenadas.lng,
      precio_noche: aloj.precioNoche,
      servicios: aloj.servicios,
      rating: aloj.rating,
      telefono: aloj.telefono,
      imagen_url: toNullIfEmpty(aloj.imagen),
    }))
  )

  await upsertTable('gastronomia',
    gastronomia.map(plato => ({
      id: plato.id,
      nombre: plato.nombre,
      descripcion: plato.descripcion,
      ingredientes: plato.ingredientes,
      origen: plato.origen,
      precio_promedio: plato.precioPromedio,
      imagen_url: toNullIfEmpty(plato.imagen),
    }))
  )

  await upsertTable('resenas',
    resenasEjemplo.map(resena => ({
      id: resena.id,
      usuario_id: resena.usuarioId,
      usuario_nombre: resena.usuarioNombre,
      usuario_foto_url: toNullIfEmpty(resena.usuarioFoto),
      lugar_id: resena.lugarId ?? null,
      restaurante_id: resena.restauranteId ?? null,
      evento_id: resena.eventoId ?? null,
      rating: resena.rating,
      comentario: resena.comentario,
      fecha: toNullIfEmpty(resena.fecha),
      likes: resena.likes,
    }))
  )

  console.log('Seed completed')
}

run().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
