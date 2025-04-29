'use client'

import { MediaSelect } from '@/drizzle-definitions/data-types'
import MediaSliderItem from '../BrowseMediaContainer/MediaSliderContainer/components/MediaSlider/components/MediaSliderItem'
import { useSearchItemSizeInfo } from './hooks'

interface Props {
  queryKey: string
  medias: MediaSelect[] | null
}

export default function BrowseSearch({ queryKey, medias }: Props) {
  const { itemSize, gapX } = useSearchItemSizeInfo()

  return (
    <div className="w-full px-3 py-4 md:px-8 md:py-6">
      {medias &&
        (medias.length > 0 ? (
          <div className={`flex w-full flex-wrap gap-x-[${gapX}%] gap-y-[4vw]`}>
            {medias.map((mediaInfo) => (
              <MediaSliderItem
                key={mediaInfo.id}
                mediaInfo={mediaInfo}
                itemSize={itemSize}
                isSliding={false}
              />
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center text-gray-500">
            <div>No search results found.</div>
            <div>Please enter a different keyword.</div>
          </div>
        ))}

      {!medias && queryKey?.length < 2 && (
        <div className="flex h-[5rem] w-full flex-col items-center justify-center p-4 text-gray-500">
          The search keyword must be at least 2 characters long.
        </div>
      )}
    </div>
  )
}
