import 'server-only'

import { getBrowseDisplayInfo } from '@/data/medias'
import BrowseMediaContainer from './BrowseMediaContainer'

export default async function BrowseMediaContainerServer() {
  const displayInfo = await getBrowseDisplayInfo()

  return <BrowseMediaContainer displayInfo={displayInfo} />
}
