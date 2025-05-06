import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import Modal, { ModalProps } from '@/components/UI/Modal/Modal'
import { COLOR_BACKGROUND } from '@/styles/styleVariables'
import MediaMoreInfoModalBackdrop from './components/MediaMoreInfoModalBackdrop'
import MediaMoreInfoModalTop from './components/MediaMoreInfoModalTop'
import MediaMoreInfoModalBottom from './components/MediaMoreInfoModalBottom'
import { getModalRect } from '../MediaSliderContainer/components/MediaSlider/utils'
import { useMediaQueryXS } from '@/components/UI/hooks'

interface Props extends Omit<ModalProps, 'children'> {
  mediaInfo: MediaSelect
  itemRect: DOMRect | undefined
  closeModal: () => void
}

export default function MediaMoreInfoModal({
  mediaInfo,
  itemRect,
  closeModal,
  ...props
}: Props) {
  const divRef = useRef<HTMLDivElement | null>(null)
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false)

  const isScreenXS = useMediaQueryXS()

  if (!itemRect) {
    return null
  }

  const {
    left: modalLeft,
    top: modalTop,
    width: modalWidth,
    height: modalHeight,
  } = getModalRect(itemRect)

  return (
    <Modal
      {...props}
      open={props.open}
      onClose={closeModal}
      closeAfterTransition
      disableEnforceFocus
      disableRestoreFocus
      slots={{ backdrop: MediaMoreInfoModalBackdrop }}
      slotProps={{ backdrop: { closeModal } }}
    >
      <motion.div
        className="absolute top-0 left-0 flex h-full w-full items-start justify-center
          overflow-x-hidden overflow-y-hidden rounded-md focus-visible:outline-0"
        initial={{
          left: `calc(${modalLeft}px - 2rem)`,
          top: `calc(${modalTop}px - 2rem)`,
          width: `calc(${modalWidth}px + 4rem)`,
          height: `calc(${modalHeight}px + 4rem)`,
          opacity: 0,
        }}
        animate={{
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          opacity: 1,
          transition: {
            default: { duration: 0.2, ease: 'easeInOut' },
          },
        }}
        exit={{
          left: `${modalLeft}px`,
          top: `${modalTop}px`,
          width: `${modalWidth}px`,
          height: `${modalHeight}px`,
          opacity: 0,
          transition: {
            default: { duration: 0.2, ease: 'easeInOut' },
          },
        }}
        style={{
          overflowY: `${isAnimationCompleted ? 'auto' : 'hidden'}`,
          backgroundColor: `${isAnimationCompleted ? '#101010CC' : 'transparent'}`,
        }}
        onAnimationStart={() => setIsAnimationCompleted(false)}
        onAnimationComplete={() => setIsAnimationCompleted(true)}
        onPointerDown={(e) => {
          if (divRef.current?.contains(e.target as Node)) {
            return
          }

          closeModal()
        }}
      >
        <div
          ref={divRef}
          className="relative max-w-[64rem] rounded-t-xl shadow-md"
          style={{
            backgroundColor: `${COLOR_BACKGROUND}`,
            margin: `${isScreenXS ? '1rem' : '2rem'}`,
          }}
        >
          <div className="relative">
            <MediaMoreInfoModalTop
              mediaInfo={mediaInfo}
              isAnimationCompleted={isAnimationCompleted}
              closeModal={closeModal}
            />
          </div>

          <div>
            <MediaMoreInfoModalBottom
              mediaInfo={mediaInfo}
              isAnimationCompleted={isAnimationCompleted}
            />
          </div>
        </div>
      </motion.div>
    </Modal>
  )
}
