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
    openModal: openSliderItemModal,
    closeModal: closeSliderItemModal,
  } = useMediaSliderItemModal(divRef)

  const {
    itemRect: itemRectMoreInfoModal,
    isOpen: isMediaMoreInfoModalOpen,
    openModal: openMediaMoreInfoModal,
    closeModal: closeMediaMoreInfoModal,
  } = useMediaMoreInfoModal(divRef)

  const {
    onTouchStart,
    onTouchEnd,
    onPointerOver,
    onPointerOut,
    onPointerMove,
  } = useMediaSliderItem(isSliderItemModalOpen, isSliding, openSliderItemModal)

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
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
          onPointerMove={onPointerMove}
        >
          <span className="m-1" />
          <Image
            className="absolute top-0 left-0 h-full rounded-sm"
            src={getSliderItemTitleImg(mediaInfo.id)}
            width="434"
            height="250"
            alt="Slider Item Image"
          />
        </div>
      </SliderItem>

      <MediaSliderItemModal
        mediaInfo={mediaInfo}
        open={isSliderItemModalOpen}
        itemRect={itemRectSliderItemModal}
        closeModal={closeSliderItemModal}
        onShowMoreInfoModal={() => {
          closeSliderItemModal()
          openMediaMoreInfoModal()
        }}
      />

      <MediaMoreInfoModal
        mediaInfo={mediaInfo}
        open={isMediaMoreInfoModalOpen}
        itemRect={itemRectMoreInfoModal}
        closeModal={closeMediaMoreInfoModal}
      />
    </>
  )
}
