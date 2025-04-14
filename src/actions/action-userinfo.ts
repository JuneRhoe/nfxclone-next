'use server'

import { getUserInfo as getUserInfoFromDAL } from '@/libs/session/dal'

export async function getUserInfo() {
  return getUserInfoFromDAL()
}
