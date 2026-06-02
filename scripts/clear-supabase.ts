import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local')
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
})

const tables = [
  'resenas',
  'eventos',
  'restaurantes',
  'alojamientos',
  'gastronomia',
  'lugares',
]

async function clearTable(table: string) {
  const { error } = await supabase.from(table).delete().not('id', 'is', null)
  if (error) {
    throw new Error(`Error limpiando ${table}: ${error.message}`)
  }
  console.log(`OK: ${table} vaciada`) 
}

async function main() {
  for (const table of tables) {
    await clearTable(table)
  }
  console.log('Listo: todas las tablas quedaron vacias')
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
