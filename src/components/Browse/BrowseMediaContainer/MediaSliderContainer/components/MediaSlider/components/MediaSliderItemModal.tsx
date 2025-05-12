import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import {
  faAngleDown,
  faCheck,
  faPlay,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import Modal, { ModalProps } from '@/components/UI/Modal/Modal'
import ModalBackdrop from '@/components/UI/Modal/ModalBackdrop'
import { getModalRect } from '../utils'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import { COLOR_BACKGROUND } from '@/styles/styleVariables'
import { getSliderItemTitleImg } from '@/components/Browse/utils'
import IconButton from '@/components/UI/IconButton/IconButton'
import { useMyMedias } from '../../MyMediasSlider/hooks'
import { useScrollPos } from '@/components/UI/hooks'

interface Props extends Omit<ModalProps, 'children'> {
  mediaInfo: MediaSelect
  itemRect: DOMRect | undefined
  isSliding: boolean
  closeModal: () => void
  onShowMoreInfoModal: () => void
}

export default function MediaSliderItemModal({
  mediaInfo,
  itemRect,
  isSliding,
  closeModal,
  onShowMoreInfoModal,
  ...props
}: Props) {
  const divRef = useRef<HTMLDivElement | null>(null)
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false)

  const {
    isInMyList,
    isAddMyMediaLoading,
    addMyMedia,
    isRemoveMyMediaLoading,
    removeMyMedia,
  } = useMyMedias(mediaInfo, closeModal)

  const { scrollPosY } = useScrollPos()

  if (!itemRect || isSliding || scrollPosY > 0) {
    return null
  }

  const {
    left: modalLeft,
    top: modalTop,
    width: modalWidth,
    height: modalHeight,
  } = getModalRect(itemRect)

  const showBottom =
    modalWidth > 0 && Math.floor(modalWidth) === divRef.current?.clientWidth

  return (
    <Modal
      {...props}
      open={props.open}
      onClose={closeModal}
      disableScrollLock
      // disableEnforceFocus
      disableRestoreFocus
      disableAutoFocus
      slots={{ backdrop: ModalBackdrop }}
      slotProps={{
        backdrop: { closeModal },
      }}
    >
      <motion.div
        className="absolute h-full w-full rounded-md focus-visible:outline-0"
        initial={{
          left: `${itemRect.left - 1}px`,
          top: `${itemRect.top - 1}px`,
          width: `${itemRect.width}px`,
          height: `${itemRect.height}px`,
          opacity: 0,
        }}
        animate={{
          left: `${modalLeft}px`,
          top: `${modalTop}px`,
          width: `${modalWidth}px`,
          height: `${modalHeight}px`,
          opacity: 1,
          transition: {
            default: { duration: 0.2, delay: 0.3, ease: 'easeInOut' },
          },
        }}
        exit={{
          left: `${itemRect.left - 1}px`,
          top: `${itemRect.top - 1}px`,
          width: `${itemRect.width}px`,
          height: `${itemRect.height}px`,
          transition: { default: { duration: 0.2, ease: 'easeInOut' } },
        }}
        style={{ cursor: isAnimationCompleted ? 'auto' : 'pointer' }}
        onAnimationStart={() => setIsAnimationCompleted(false)}
        onAnimationComplete={() => setIsAnimationCompleted(true)}
      >
        <div
          ref={divRef}
          className="h-full w-full rounded-md"
          style={{ backgroundColor: `${COLOR_BACKGROUND}` }}
        >
          <Image
            className="w-full rounded-sm"
            src={getSliderItemTitleImg(mediaInfo.id)}
            width="434"
            height="250"
            alt="Slider Item Image"
            onPointerDown={closeModal}
          />

          {isAnimationCompleted && showBottom && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.1, delay: 0.05 },
              }}
            >
              <div className="flex items-center justify-center">
                <div className="flex h-full w-full flex-col gap-2 px-3 py-2 text-sm text-white">
                  <div className="flex h-full w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconButton
                        icon={faPlay}
                        buttonMode="secondary"
                        onClick={() => {}}
                      />
                      <IconButton
                        icon={isInMyList ? faCheck : faPlus}
                        loading={isAddMyMediaLoading || isRemoveMyMediaLoading}
                        onClick={() => {
                          if (isInMyList) {
                            removeMyMedia()
                          } else {
                            addMyMedia()
                          }
                        }}
                      />
                    </div>

                    <IconButton
                      icon={faAngleDown}
                      onClick={() => onShowMoreInfoModal()}
                    />
                  </div>

                  <div className="flex h-full w-full items-center gap-2 text-xs">
                    <div
                      className="flex items-center justify-center rounded-sm border-1 border-gray-400 px-1.5
                        whitespace-nowrap"
                    >
                      {mediaInfo.ratingSymbol}
                    </div>
                    <div className="flex items-center">
                      {mediaInfo.ratingDetails?.slice(0, 2)?.join(' • ')}
                    </div>
                  </div>

                  <div className="h-full w-full text-xs">
                    {mediaInfo.genres?.slice(0, 2)?.join(' • ')}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </Modal>
  )
}
