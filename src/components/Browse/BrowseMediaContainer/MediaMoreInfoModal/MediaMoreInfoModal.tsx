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

const SCROLLBAR_WIDTH = 16

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

  const modalPos = {
    x: modalLeft + modalWidth / 2 - window.innerWidth / 2,
    y: modalTop + modalHeight / 2 - window.innerHeight / 2,
    scale: modalWidth / window.innerWidth || 0.8,
    opacity: 0,
  }

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
        className={`absolute top-0 left-0 flex h-full w-full items-start justify-center
          overflow-x-hidden overflow-y-auto rounded-md focus-visible:outline-0
          ${isAnimationCompleted ? '' : 'transparent-scrollbar'}`}
        initial={modalPos}
        exit={modalPos}
        animate={{
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{
          backgroundColor: `${isAnimationCompleted ? '#101010CC' : 'transparent'}`,
          scrollbarGutter: 'stable',
        }}
        onAnimationStart={() => setIsAnimationCompleted(false)}
        onAnimationComplete={() => setIsAnimationCompleted(true)}
        onPointerDown={(e) => {
          if (divRef.current?.contains(e.target as Node)) {
            return
          }

          if (e.clientX >= window.innerWidth - SCROLLBAR_WIDTH) {
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
