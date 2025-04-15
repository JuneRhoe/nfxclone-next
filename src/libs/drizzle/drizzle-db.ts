import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const client = postgres(process.env.DRZ_TRSC_URL || '', { prepare: false })

export const drizzleDB = drizzle(client)

// import { drizzle } from 'drizzle-orm/node-postgres'
// import * as schema from '@/drizzle/schema'

// export const drizzleDB = drizzle({ schema })
