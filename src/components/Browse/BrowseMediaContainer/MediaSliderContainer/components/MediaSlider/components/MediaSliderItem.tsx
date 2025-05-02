import { useRef } from 'react'
import Image from 'next/image'
import { useMediaSliderItem, useMediaSliderItemModal } from '../hooks'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import SliderItem from '@/components/UI/Slider/components/SliderItem'
import { getSliderItemTitleImg } from '@/components/Browse/utils'
import MediaSliderItemModal from './MediaSliderItemModal'
import { useMediaMoreInfoModal } from '@/components/Browse/BrowseMediaContainer/MediaMoreInfoModal/hooks'
import MediaMoreInfoModal from '@/components/Browse/BrowseMediaContainer/MediaMoreInfoModal/MediaMoreInfoModal'

interface Props {
  mediaInfo: MediaSelect
  itemSize: number
  isSliding: boolean
}

export default function MediaSliderItem({
  mediaInfo,
  itemSize,
  isSliding,
}: Props) {
  const divRef = useRef<HTMLDivElement>(null)

  const {
    itemRect: itemRectSliderItemModal,
    isOpen: isSliderItemModalOpen,
    isFadeIn: isSliderItemModalFadeIn,
    isFadeOut: isSliderItemModalFadeOut,
    startFadeIn: sliderItemModalStartFadeIn,
    cancelFadeIn: sliderItemModalCancelFadeIn,
    startFadeOut: sliderItemModalStartFadeOut,
    closeModal: closeSliderItemModal,
  } = useMediaSliderItemModal(divRef, isSliding)

  const {
    itemRect: itemRectMoreInfoModal,
    isOpen: isMediaMoreInfoModalOpen,
    isFadeIn: isMoreInfoModalFadeIn,
    isFadeOut: isMoreInfoModalFadeOut,
    startFadeIn: moreInfoModalStartFadeIn,
    startFadeOut: moreInfoModalStartFadeOut,
  } = useMediaMoreInfoModal(divRef)

  const { onTouchStart, onTouchEnd, onPointerOver, onPointerOut } =
    useMediaSliderItem(
      isSliding,
      sliderItemModalStartFadeIn,
      sliderItemModalCancelFadeIn,
    )

  return (
    <>
      <SliderItem
        ref={divRef}
        className="relative aspect-9/5 pr-1"
        style={{ width: `${itemSize}%`, height: 'auto' }}
      >
        <div
          className="relative h-full w-full"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onPointerOver={(e) => {
            onPointerOver(e)
            divRef.current?.focus()
          }}
          onPointerOut={onPointerOut}
        >
          <span className="m-1" />
          <Image
            className="absolute top-0 left-0 h-full rounded-sm"
            src={getSliderItemTitleImg(mediaInfo.id)}
            width="434"
            height="250"
            alt="Slider Item Image"
            priority
          />
        </div>
      </SliderItem>

      {isSliderItemModalOpen && (
        <MediaSliderItemModal
          mediaInfo={mediaInfo}
          open={isSliderItemModalOpen}
          itemRect={itemRectSliderItemModal}
          isFadeIn={isSliderItemModalFadeIn}
          isFadeOut={isSliderItemModalFadeOut}
          startFadeOut={sliderItemModalStartFadeOut}
          closeModal={closeSliderItemModal}
          onShowMoreInfoModal={() => {
            closeSliderItemModal()
            moreInfoModalStartFadeIn()
          }}
        />
      )}

      {isMediaMoreInfoModalOpen && (
        <MediaMoreInfoModal
          mediaInfo={mediaInfo}
          open={isMediaMoreInfoModalOpen}
          itemRect={itemRectMoreInfoModal}
          isFadeIn={isMoreInfoModalFadeIn}
          isFadeOut={isMoreInfoModalFadeOut}
          startFadeOut={moreInfoModalStartFadeOut}
        />
      )}
    </>
  )
}
