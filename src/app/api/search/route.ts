import { NextRequest } from 'next/server'
import { searchMedias } from '@/actions/action-search-medias'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const queryKey = searchParams.get('k') || ''

  const medias = await searchMedias(queryKey)

  return Response.json(medias)
}
