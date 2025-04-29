import { NextRequest } from 'next/server'
import { getMoreLikeMedias } from '@/actions/action-get-morelike-medias'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mainCategory = Number(searchParams.get('main-category') || -1)

  if (Number.isNaN(mainCategory) || mainCategory < 0) {
    return new Response('Error', {
      status: 400,
    })
  }

  const medias = await getMoreLikeMedias(mainCategory)

  return Response.json(medias)
}
