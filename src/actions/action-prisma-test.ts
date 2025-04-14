'use server'

// import { cache } from 'react'
import { prisma } from '@/libs/prisma/prisma-db'
import { TMP_TABLE } from '@/libs/dataDefinitions'

// export async function GetTmps() {
//   const tmps = await prisma.tmp_table.findMany()
//   return tmps
// }

// export const GetTmps = unstable_cache(
//   cache(async () => {
//     const tmps = await prisma.tmps.findMany()
//     return tmps
//   }),
//   ['tmps'],
//   {
//     tags: ['tmps'],
//   },
// )

// export const GetTmps = cache(async () => {
//   const tmps = await prisma.tmps.findMany()
//   return tmps
// })

export async function GetTmps(): Promise<(TMP_TABLE | null)[]> {
  let tmps: (TMP_TABLE | null)[] = []

  try {
    tmps = await prisma.tmps.findMany()
  } catch (e) {
    console.log('----prisma:GetTmps-----', e)
  }

  return tmps
}
