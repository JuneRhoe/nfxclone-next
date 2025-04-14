'use server'

import { cache } from 'react'
import { prisma } from '@/libs/prisma/prisma-db'

export const findUser = cache(async (userId: string) => {
  try {
    return await prisma.nfxCloneUsers.findFirst({
      where: {
        userId: {
          equals: userId,
          mode: 'insensitive',
        },
      },
      select: {
        userId: true,
      },
    })
  } catch (e) {
    console.error('Failed to find a user', e)
  }
})
