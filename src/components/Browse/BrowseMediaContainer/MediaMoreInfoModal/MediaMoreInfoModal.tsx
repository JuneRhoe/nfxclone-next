import { useEffect, useRef, useState } from 'react'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import Modal, { ModalProps } from '@/components/UI/Modal/Modal'
import { COLOR_BACKGROUND } from '@/styles/styleVariables'
import MediaMoreInfoModalBackdrop from './components/MediaMoreInfoModalBackdrop'
import MediaMoreInfoModalTop from './components/MediaMoreInfoModalTop'
import MediaMoreInfoModalBottom from './components/MediaMoreInfoModalBottom'
import { getModalRect } from '../MediaSliderContainer/components/MediaSlider/utils'
import { FADE_TIMER } from './hooks'
import { useMediaQueryXS } from '@/components/UI/hooks'

interface Props extends Omit<ModalProps, 'children'> {
  mediaInfo: MediaSelect
  itemRect: DOMRect | undefined
  isFadeIn: boolean
  isFadeOut: boolean
  enableOpacityEffect?: boolean
  startFadeOut: () => void
}

export default function MediaMoreInfoModal({
  mediaInfo,
  itemRect,
  isFadeIn,
  isFadeOut,
  enableOpacityEffect,
  startFadeOut,
  ...props
}: Props) {
  const divRef = useRef<HTMLDivElement | null>(null)

  const isScreenXS = useMediaQueryXS()

  const [timerId, setTimerId] = useState<NodeJS.Timeout>()
  const [fadeCompleted, setFadeCompleted] = useState(false)

  useEffect(() => {
    if (fadeCompleted || timerId) {
      return
    }

    clearTimeout(timerId)
    setTimerId(undefined)

    setTimerId(
      setTimeout(() => {
        setFadeCompleted(true)
      }, FADE_TIMER * 2),
    )

    return () => clearTimeout(timerId)
  }, [timerId, fadeCompleted])

  if (!itemRect) {
    return null
  }

  const {
    left: modalLeft,
    top: modalTop,
    width: modalWidth,
    height: modalHeight,
  } = getModalRect(itemRect)

  const showControls = fadeCompleted && !isFadeOut

  return (
    <Modal
      {...props}
      open={props.open}
      onClose={startFadeOut}
      closeAfterTransition
      disableEnforceFocus
      disableRestoreFocus
      slots={{ backdrop: MediaMoreInfoModalBackdrop }}
      slotProps={{ backdrop: { closeModal: startFadeOut } }}
    >
      <div
        className={`absolute top-0 left-0 flex h-full w-full items-start justify-center
          overflow-x-hidden overflow-y-hidden rounded-md transition-all ease-in
          focus-visible:outline-0`}
        style={{
          left: `${isFadeIn && !isFadeOut ? 0 : modalLeft}px`,
          top: `${isFadeIn && !isFadeOut ? 0 : modalTop}px`,
          width: `${isFadeIn && !isFadeOut ? '100%' : modalWidth + 'px'}`,
          height: `${isFadeIn && !isFadeOut ? '100%' : modalHeight + 'px'}`,
          opacity: `${enableOpacityEffect ? (isFadeIn && !isFadeOut ? '1' : '0') : isFadeOut ? '0.2' : '1'}`,
          overflowY: `${showControls ? 'auto' : 'hidden'}`,
          backgroundColor: `${showControls ? '#101010CC' : '#101010'}`,
        }}
        onPointerDown={(e) => {
          if (divRef.current?.contains(e.target as Node)) {
            return
          }

          startFadeOut()
        }}
      >
        <div
          ref={divRef}
          className="relative w-[64rem] rounded-t-xl shadow-md"
          style={{
            backgroundColor: `${COLOR_BACKGROUND}`,
            margin: `${isFadeIn ? (isScreenXS ? '1rem' : '2rem') : '0'}`,
          }}
        >
          <div className="relative w-full">
            <MediaMoreInfoModalTop
              showControls={showControls}
              mediaInfo={mediaInfo}
              startFadeOut={startFadeOut}
            />
          </div>
          <div>
            {showControls && <MediaMoreInfoModalBottom mediaInfo={mediaInfo} />}
          </div>
        </div>
      </div>
    </Modal>
  )
}
