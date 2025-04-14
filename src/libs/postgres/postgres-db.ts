import 'server-only'

import postgres from 'postgres'

const dbUrl =
  `${process.env.POSTGRES_URL_ONLY}/${process.env.POSTGRES_URL_PARAMS_POSTGRES}` ||
  ''

const globalForPostgres = global as unknown as { excuteSQL: postgres.Sql }

export const excuteSQL =
  globalForPostgres.excuteSQL || postgres(dbUrl, { ssl: 'require' })

if (process.env.NODE_ENV !== 'production')
  globalForPostgres.excuteSQL = excuteSQL
