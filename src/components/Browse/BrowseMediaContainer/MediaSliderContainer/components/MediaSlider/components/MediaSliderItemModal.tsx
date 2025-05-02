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

interface Props extends Omit<ModalProps, 'children'> {
  mediaInfo: MediaSelect
  isFadeIn: boolean
  isFadeOut: boolean
  itemRect: DOMRect | undefined
  startFadeOut: () => void
  closeModal: () => void
  onShowMoreInfoModal: () => void
}

export default function MediaSliderItemModal({
  mediaInfo,
  isFadeIn,
  isFadeOut,
  itemRect,
  startFadeOut,
  closeModal,
  onShowMoreInfoModal,
  ...props
}: Props) {
  const {
    isInMyList,
    isAddMyMediaLoading,
    addMyMedia,
    isRemoveMyMediaLoading,
    removeMyMedia,
  } = useMyMedias(mediaInfo, startFadeOut)

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
      disableScrollLock
      // disableEnforceFocus
      disableRestoreFocus
      disableAutoFocus
      slots={{ backdrop: ModalBackdrop }}
      slotProps={{
        backdrop: {
          closeModal: startFadeOut,
        },
      }}
    >
      <div
        className="absolute h-full w-full rounded-md transition-all ease-in-out
          focus-visible:outline-0"
        style={{
          left: `${!isFadeIn || isFadeOut ? itemRect.left - 1 : modalLeft}px`,
          top: `${!isFadeIn || isFadeOut ? itemRect.top - 1 : modalTop}px`,
          width: `${!isFadeIn || isFadeOut ? itemRect.width : modalWidth}px`,
          height: `${!isFadeIn || isFadeOut ? itemRect.height : modalHeight}px`,
          backgroundColor: `${COLOR_BACKGROUND}`,
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'touch') {
            return
          }

          startFadeOut()
        }}
      >
        <div className="h-full w-full">
          <div className="h-[55%]" onPointerDown={startFadeOut}>
            <Image
              className="w-full rounded-sm"
              src={getSliderItemTitleImg(mediaInfo.id)}
              width="434"
              height="250"
              alt="Slider Item Image"
            />
          </div>
          <div className="flex h-[45%] items-center justify-center">
            {isFadeIn && !isFadeOut && (
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
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
