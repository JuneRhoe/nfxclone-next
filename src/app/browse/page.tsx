import 'server-only'

import BrowsePreviewServer from '@/components/Browse/BrowsePreview/BrowsePreviewServer'
import BrowseMediaContainerServer from '@/components/Browse/BrowseMediaContainer/BrowseMediaContainerServer'

export default async function BrowsePageServer() {
  return (
    <>
      <BrowsePreviewServer />
      <BrowseMediaContainerServer />
    </>
  )
}
