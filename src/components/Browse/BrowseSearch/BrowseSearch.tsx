'use client'

import MediaSliderItem from '../BrowseMediaContainer/MediaSliderContainer/components/MediaSlider/components/MediaSliderItem'
import { useSearchItemSizeInfo, useSearchQuery } from './hooks'

export default function BrowseSearch() {
  const { isLoading, queryKey, medias } = useSearchQuery()

  const { itemSize, gapX } = useSearchItemSizeInfo()

  console.log('------BrowseSearch--------')

  return (
    <div className="w-full px-3 py-4 md:px-8 md:py-6">
      {!isLoading &&
        medias &&
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

      {!isLoading && !medias && queryKey?.length < 2 && (
        <div className="flex h-[5rem] w-full flex-col items-center justify-center p-4 text-gray-500">
          The search keyword must be at least 2 characters long.
        </div>
      )}
    </div>
  )
}
