'use server'

import { cache } from 'react'
import { sql } from 'drizzle-orm'
import { drizzleDB } from '@/libs/drizzle/drizzle-db'
import { nfxCloneUsers } from 'drizzle-schema/table-aliases'

export const findUser = cache(async (userId: string) => {
  try {
    const userRecords = await drizzleDB
      .select({ userId: nfxCloneUsers.userId })
      .from(nfxCloneUsers)
      .where(
        sql`lower(${nfxCloneUsers.userId}) = ${userId.toLocaleLowerCase()}`,
      )
      .limit(1)

    return userRecords[0]
  } catch (e) {
    console.error('Failed to find a user', e)
  }
})
