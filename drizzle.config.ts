import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DRZ_SESS_URL!,
  },
  schemaFilter: 'develop',
  migrations: {
    table: 'drizzle-mg-table',
    schema: 'develop',
  },
})
