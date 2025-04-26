import 'server-only'

import { getBrowsePreviewMediaInfoList } from 'queries/medias'
import BrowsePreview from './BrowsePreview'

export default async function BrowsePreviewServer() {
  const previewMediaInfoList = await getBrowsePreviewMediaInfoList()

  const randomIndex = Math.floor(Math.random() * previewMediaInfoList.length)
  const previewMediaInfo = previewMediaInfoList[randomIndex]

  return <BrowsePreview previewMediaInfo={previewMediaInfo} />
}
