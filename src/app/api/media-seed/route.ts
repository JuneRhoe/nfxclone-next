// import { medias } from '@/drizzle-schema/table-aliases'
// import { drizzleDB } from '@/libs/drizzle/drizzle-db'
// import { MEDIA_DATA } from './media-data'
import { MediaSelect } from '@/drizzle-definitions/data-types'

export async function GET() {
  // const mediaRecords = await drizzleDB.select().from(medias)

  // const tmpData: MediaInfo = mediaRecords[0]
  // console.log('---------tmpData--------', tmpData)

  const arrayMedia: MediaSelect[] = []

  // for (let i = 0; i < MEDIA_DATA.length; i++) {
  //   const numId = Number(MEDIA_DATA[i].id)
  //   const maincate = Number(MEDIA_DATA[i].mainCategory)
  //   delete MEDIA_DATA[i].id
  //   delete MEDIA_DATA[i].mainCategory

  //   arrayMedia.push({ id: numId, mainCategory: maincate, ...MEDIA_DATA[i] })
  // }

  // await drizzleDB.insert(medias).values(arrayMedia)

  // console.log('---------arrayMedia--------', arrayMedia)

  return Response.json(arrayMedia)
}
