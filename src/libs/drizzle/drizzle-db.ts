import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const globalForDb = global as unknown as {
  postgresClient: ReturnType<typeof postgres> | undefined
  drizzleDB: ReturnType<typeof drizzle> | undefined
}

const client =
  globalForDb.postgresClient ??
  postgres(process.env.DRZ_TRSC_URL!, {
    prepare: false,
    max: 10
  })

export const drizzleDB = globalForDb.drizzleDB ?? drizzle(client)

if (process.env.NODE_ENV !== 'production') {
  globalForDb.postgresClient = client
  globalForDb.drizzleDB = drizzleDB
}