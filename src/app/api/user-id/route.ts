import { getUserIdFromSession } from '@/libs/session/dal'

export async function GET() {
  const userId = await getUserIdFromSession(false)

  return Response.json(userId)
}
