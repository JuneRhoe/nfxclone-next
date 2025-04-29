// import { medias } from '@/drizzle-schema/table-aliases'
// import { drizzleDB } from '@/libs/drizzle/drizzle-db'
// import { drizzleDB } from '@/libs/drizzle/drizzle-db'
// import { MEDIA_DATA } from './media-data'
// import { MediaGenresSelect } from '@/drizzle-definitions/data-types'
// import { mediaGenres } from '@/drizzle-definitions/table-aliases'
// import { mediaCasts } from '@/drizzle-definitions/table-aliases'

export async function GET() {
  // const mediaRecords = await drizzleDB.select().from(medias)
  // const tmpData: MediaInfo = mediaRecords[0]
  //
  // const arrayMedia: MediaSelect[] = []
  //
  // for (let i = 0; i < MEDIA_DATA.length; i++) {
  //   const numId = Number(MEDIA_DATA[i].id)
  //   const maincate = Number(MEDIA_DATA[i].mainCategory)
  //   delete MEDIA_DATA[i].id
  //   delete MEDIA_DATA[i].mainCategory
  //   arrayMedia.push({ id: numId, mainCategory: maincate, ...MEDIA_DATA[i] })
  // }
  //
  // await drizzleDB.insert(medias).values(arrayMedia)
  // console.log('---------arrayMedia--------', arrayMedia)
  //
  // return Response.json(arrayMedia)
  //
  //
  //
  // const arrayGenres: MediaGenresSelect[] = []
  //
  // let index = 0
  //
  // for (let i = 0; i < MEDIA_DATA.length; i++) {
  //   const mediaId = Number(MEDIA_DATA[i].id)
  //   const genres = MEDIA_DATA[i].genres || []
  //   for (const genre of genres) {
  //     arrayGenres.push({ id: index, mediaId, genre })
  //     index++
  //   }
  // }
  //
  // await drizzleDB.insert(mediaGenres).values(arrayGenres)
  //
  // return Response.json(arrayGenres)

  return Response.json('')
}
