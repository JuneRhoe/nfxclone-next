'use client'

import MediaSlider from '../MediaSlider/MediaSlider'
import { useMyMedias } from './hooks'

export default function MyMediasSlider() {
  const { myMedias } = useMyMedias()

  return (
    <MediaSlider
      title="My List"
      placeholder="Please add movies and tv shows to My List"
      medias={myMedias}
    />
  )
}
