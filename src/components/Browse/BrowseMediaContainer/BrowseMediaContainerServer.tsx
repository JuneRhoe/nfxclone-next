import 'server-only'

import { getBrowseDisplayMediaInfo } from 'queries/medias'
import BrowseMediaContainer from './BrowseMediaContainer'

export default async function BrowseMediaContainerServer() {
  const displayMediaInfo = await getBrowseDisplayMediaInfo()

  return (
    <BrowseMediaContainer
      mainCategoryInfoMap={displayMediaInfo.mainCategoryInfoMap}
      mediaInfoArray={displayMediaInfo.mediaInfoArray}
    />
  )
}
