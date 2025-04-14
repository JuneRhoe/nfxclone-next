'use server'

// 'use cache'

// import 'server-only'
// import { cache } from 'react'
import { excuteSQL } from '@/libs/postgres/postgres-db'
import { TMP_TABLE } from '@/libs/dataDefinitions'

export async function QueryTest(): Promise<TMP_TABLE[]> {
  const data: TMP_TABLE[] = await excuteSQL<TMP_TABLE[]>`
      SELECT * FROM develop.tmp_table
    `

  return data
}

// export const QueryTest = cache(async (): Promise<TMP_TABLE[]> => {
//   let data: TMP_TABLE[] = []

//   try {
//     data = await excuteSQL<TMP_TABLE[]>`
//       SELECT * FROM develop.tmp_table
//     `
//   } catch (e) {
//     console.error(e)
//   }

//   return data
// })

// import { unstable_cache } from 'next/cache'
// import { excuteSQL } from '@/libs/db'
// import { TMP_TABLE } from '@/libs/definitions'

// export const QueryTest = async (): Promise<TMP_TABLE[]> => {
//   let data: TMP_TABLE[] = []

//   const cachedAction = unstable_cache(
//     () => excuteSQL<TMP_TABLE[]>`
//       SELECT * FROM develop.tmp_table
//     `,
//     ['cacheKey_dynamic_key'],
//     {
//       tags: ['static_tag'],
//     },
//   )

//   try {
//     data = await cachedAction()
//   } catch (e) {
//     console.error(e)
//   }

//   return data
// }
