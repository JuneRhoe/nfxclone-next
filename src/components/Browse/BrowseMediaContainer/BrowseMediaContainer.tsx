'use client'

import { MediaSelect } from '@/drizzle-definitions/data-types'
import MediaSliderContainer from './MediaSliderContainer/MediaSliderContainer'

export interface BrowseMediaProps {
  mainCategoryInfoMap: Map<number, string>
  mediaInfoArray: [number, MediaSelect[]][]
}

export default function BrowseMediaContainer({
  mainCategoryInfoMap,
  mediaInfoArray,
}: BrowseMediaProps) {
  return (
    <div className="relative z-4 mt-[calc(45%-3rem)] w-full sm:mt-[calc(40%-3rem)]">
      <MediaSliderContainer
        mainCategoryInfoMap={mainCategoryInfoMap}
        mediaInfoArray={mediaInfoArray}
      />
    </div>
  )
}
