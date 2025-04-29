'use client'

import { MediaSelect } from '@/drizzle-definitions/data-types'
import { useMediaPreviewMedia } from './components/MediaPreview/hooks'
import MediaPreviewImage from './components/MediaPreview/MediaPreviewImage'
import MediaPreviewVideo from './components/MediaPreview/MediaPreviewVideo'

interface Props {
  previewMediaInfo: MediaSelect
}

export default function BrowsePreview({ previewMediaInfo }: Props) {
  const { mediaPreviewImageProps, mediaPreviewVideoProps } =
    useMediaPreviewMedia(previewMediaInfo)

  return (
    <div className="absolute top-0 left-0 flex w-full">
      <MediaPreviewImage {...mediaPreviewImageProps} />
      <div
        className="absolute bottom-[-4px] z-2 h-20 w-full bg-linear-to-t from-[#171717]
          to-transparent duration-400"
      />
      <MediaPreviewVideo {...mediaPreviewVideoProps} />
    </div>
  )
}
