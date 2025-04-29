import { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
  faRotateRight,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import { useIntersection } from '@/components/UI/hooks'
import IconButton from '@/components/UI/IconButton/IconButton'

const INTERSECTION_MARGIN = '-200px'
const SHOW_MUTE_CONTROL_DELAY = 800

export interface MediaPreviewVideoProps {
  videoRef: React.RefObject<HTMLVideoElement | null>
  mediaInfo: MediaSelect
  isSetAutoPlay: boolean
  isAutoPlayed: boolean
  isVideoPlaying: boolean
  isVideoEnded: boolean
  onVideoPlaying: (playing: boolean) => void
  onVideoEnded: (ended: boolean) => void
  onVideoVisible: (visible: boolean) => void
}

export default function MediaPreviewVideo({
  videoRef,
  mediaInfo,
  isSetAutoPlay,
  isAutoPlayed,
  isVideoPlaying,
  isVideoEnded,
  onVideoPlaying,
  onVideoEnded,
  onVideoVisible,
}: MediaPreviewVideoProps) {
  const isVideoVisible = useIntersection(videoRef, INTERSECTION_MARGIN)

  const [isMuted, setIsMuted] = useState(true)
  const [showMuteControl, setShowMuteControl] = useState(false)

  useEffect(() => {
    onVideoVisible(isVideoVisible)
  }, [isVideoVisible, onVideoVisible])

  return (
    <>
      <video
        ref={videoRef}
        className={clsx(
          'absolute z-1 w-full bg-[#171717] opacity-0 transition-opacity duration-500',
          { 'opacity-100': isVideoPlaying && !isVideoEnded },
        )}
        muted={isMuted}
        loop={false}
        onPlaying={() => {
          onVideoEnded(false)
          onVideoPlaying(true)
          setTimeout(() => setShowMuteControl(true), SHOW_MUTE_CONTROL_DELAY)
        }}
        onEnded={() => {
          onVideoPlaying(false)
          onVideoEnded(true)
          setShowMuteControl(false)
        }}
      >
        {mediaInfo.previewTrailer && (
          <source src={mediaInfo.previewTrailer} type="video/mp4" />
        )}
        <track kind="captions" />
      </video>

      <div
        className="absolute right-[1.5rem] bottom-[30%] z-3 flex items-center justify-end
          transition-all duration-300 sm:right-[2.5rem]"
      >
        {isVideoPlaying && showMuteControl && (
          <IconButton
            icon={isMuted ? faVolumeXmark : faVolumeHigh}
            onClick={() => setIsMuted(!isMuted)}
          />
        )}
        {!isVideoPlaying && (isAutoPlayed || !isSetAutoPlay) && (
          <IconButton
            icon={faRotateRight}
            onClick={() => videoRef.current?.play()}
          />
        )}
      </div>
    </>
  )
}
