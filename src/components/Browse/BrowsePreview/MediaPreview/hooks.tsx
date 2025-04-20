import { useEffect, useRef, useState } from 'react'
import { MediaPreviewVideoProps } from './MediaPreviewVideo'
import { MediaPreviewImageProps } from './MediaPreviewImage'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import { getPreviewMediaInfo } from '../../utils'
import { useMediaQueryXS } from '@/components/UI/hooks'

const PREVIEW_DELAY = 800

export function useMediaPreviewMedia(previewMediaInfo: MediaSelect) {
  const isExtraSmall = useMediaQueryXS()

  const [mediaInfo] = useState<MediaSelect>(previewMediaInfo)

  const { mainImg, mainBlurImg, titleImg, trailer } = getPreviewMediaInfo(
    mediaInfo.id,
  )

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoVisible, setIsVideoVisible] = useState(false)

  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoEnded, setIsVideoEnded] = useState(false)

  const [isSetAutoPlay] = useState(true)
  const [isAutoPlayed, setIsAutoPlayed] = useState(false)

  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    const videoInstance = videoRef.current

    if (
      !videoInstance ||
      !mediaInfo ||
      !isImageLoaded ||
      isVideoPlaying ||
      !isSetAutoPlay ||
      isExtraSmall ||
      isAutoPlayed
    ) {
      return
    }

    const timerId = setTimeout(() => {
      setIsAutoPlayed(true)
      videoInstance.play()
    }, PREVIEW_DELAY)

    return () => {
      clearTimeout(timerId)
    }
  }, [
    isImageLoaded,
    isVideoPlaying,
    mediaInfo,
    isSetAutoPlay,
    isAutoPlayed,
    isExtraSmall,
  ])

  useEffect(() => {
    const videoInstance = videoRef.current

    if (!videoInstance || !isVideoPlaying || isVideoEnded || !mediaInfo) {
      return
    }

    if (isVideoVisible) {
      videoInstance.play()
    } else {
      videoInstance.pause()
    }
  }, [isVideoEnded, isVideoPlaying, isVideoVisible, mediaInfo])

  const mediaPreviewVideoProps: MediaPreviewVideoProps = {
    videoRef,
    mediaInfo: { ...mediaInfo, previewTrailer: trailer },
    isSetAutoPlay,
    isAutoPlayed,
    isVideoPlaying,
    isVideoEnded,
    onVideoPlaying: setIsVideoPlaying,
    onVideoEnded: setIsVideoEnded,
    onVideoVisible: setIsVideoVisible,
  }

  const mediaPreviewImageProps: MediaPreviewImageProps = {
    mediaInfo: {
      ...mediaInfo,
      previewMainImg: mainImg,
      previewTitleImg: titleImg,
    },
    mainBlurImg,
    isVideoPlaying,
    isVideoEnded,
    onImageLoaded: setIsImageLoaded,
  }

  return {
    mediaPreviewImageProps,
    mediaPreviewVideoProps,
  }
}
