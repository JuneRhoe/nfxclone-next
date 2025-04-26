import { useRef } from 'react'
import Image from 'next/image'
import { useMediaSliderItem, useMediaSliderItemModal } from '../hooks'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import SliderItem from '@/components/UI/Slider/components/SliderItem'
import { getSliderItemTitleImg } from '@/components/Browse/utils'
import MediaSliderItemModal from './MediaSliderItemModal'

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

  const { itemRect, open, handleOpen, handleClose } =
    useMediaSliderItemModal(divRef)

  const { onTouchStart, onTouchEnd, onPointerOver, onPointerOut } =
    useMediaSliderItem(isSliding, handleOpen)

  return (
    <>
      <SliderItem
        ref={divRef}
        className="relative aspect-9/5 pr-1"
        style={{ width: `${itemSize}%`, height: 'auto' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <div className="relative h-full w-full">
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
        open={open}
        itemRect={itemRect}
        handleClose={handleClose}
      />
    </>
  )
}
