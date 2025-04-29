import { getUsersMyMedias } from '@/actions/action-get-mymedias'

export async function GET() {
  const medias = await getUsersMyMedias()

  return Response.json(medias)
}
