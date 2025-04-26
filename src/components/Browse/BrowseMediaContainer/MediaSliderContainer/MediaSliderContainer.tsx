'use client'

import { BrowseMediaProps } from '../BrowseMediaContainer'
import MediaSlider from './components/MediaSlider/MediaSlider'
import MyMediasSlider from './components/MyMediasSlider/MyMediasSlider'

export default function MediaSliderContainer({
  mainCategoryInfoMap,
  mediaInfoArray,
}: BrowseMediaProps) {
  return (
    <div className="flex flex-col gap-8">
      <MyMediasSlider />

      {mediaInfoArray.map(([mainCategory, mediaInfoList]) => (
        <MediaSlider
          key={mainCategory}
          title={mainCategoryInfoMap.get(mainCategory)}
          medias={mediaInfoList}
        />
      ))}
    </div>
  )
}
