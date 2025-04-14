'use server'

import { prisma } from '@/libs/prisma/prisma-db'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { findUser } from './query-utils'
import { encryptData } from './auth-utils'
import { createSession } from '@/libs/session/session'
import { SIGNED_IN_DEFAULT_ROUTE } from '@/libs/middleware/mwDefinitions'

const RegistarFormSchema = z.object({
  userId: z
    .string()
    .min(3, { message: 'User ID must be at least 3 characters long.' })
    .regex(/^[A-Za-z0-9]+$/, {
      message: 'User ID can only contain numbers and letters.',
    })
    .trim(),
  userPassword: z
    .string()
    .min(4, { message: 'Be at least 4 characters long' })
    // .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    // .regex(/[0-9]/, { message: 'Contain at least one number.' })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: 'Contain at least one special character.',
    // })
    .trim(),
})

type FormState =
  | {
      errors?: {
        userId?: string[]
        userPassword?: string[]
      }
      message?: string
    }
  | undefined

export async function register(
  prevState: FormState | undefined,
  formData: FormData,
) {
  const validatedFields = RegistarFormSchema.safeParse({
    userId: formData.get('userId'),
    userPassword: formData.get('userPassword'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { userId, userPassword } = validatedFields.data

  const user = await findUser(userId)

  if (user) {
    return {
      errors: {
        userId: ['That user ID is already taken. Please try another.'],
      },
    }
  }

  let insertedUser = null

  try {
    insertedUser = await prisma.nfxCloneUsers.create({
      data: { userId, userPassword: encryptData(userPassword) },
      select: { userId: true },
    })
  } catch (e) {
    console.error('Failed to register', e)
  }

  if (!insertedUser) {
    redirect('/')
  }

  await createSession(insertedUser.userId)

  redirect(SIGNED_IN_DEFAULT_ROUTE)
}
