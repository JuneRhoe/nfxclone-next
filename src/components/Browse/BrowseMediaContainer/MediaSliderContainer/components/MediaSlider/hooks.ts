import { RefObject, useState } from 'react'
import { TouchPos } from './utils'
import { SliderItemSizeInfo } from '@/components/UI/Slider/Slider'
import { useScreenSize } from '@/components/UI/hooks'
import { useModal } from '@/components/UI/Modal/hooks'

export const PADDING_CLASS = 'px-[1.5rem] sm:px-[2.5rem]'

const OPEN_MODAL_POINTER_DELAY = 200
const OPEN_MODAL_TOUCH_DELAY = 100

export function useMediaSlider() {
  return {
    paddingClass: PADDING_CLASS,
  }
}

export function useMediaSliderItemSizeInfo(): SliderItemSizeInfo {
  const screenSize = useScreenSize()

  switch (screenSize) {
    case 'xs':
      return {
        itemSize: 100 / 2,
        countPerPage: 2,
      }
    case 'sm':
    case 'md':
      return {
        itemSize: 100 / 3,
        countPerPage: 3,
      }
    case 'lg':
      return {
        itemSize: 100 / 4,
        countPerPage: 4,
      }

    case 'xl':
      return {
        itemSize: 100 / 5,
        countPerPage: 5,
      }
    case '2xl':
      return {
        itemSize: 100 / 6,
        countPerPage: 6,
      }
  }

  return {
    countPerPage: 0,
    itemSize: 0,
  }
}

export function useMediaSliderItemModal(
  divRef: RefObject<HTMLDivElement | null>,
) {
  const { open, handleOpen, handleClose } = useModal()

  const itemRect = divRef.current?.getBoundingClientRect()

  return { open, itemRect, handleOpen, handleClose }
}

export function useMediaSliderItem(isSliding: boolean, handleOpen: () => void) {
  const [timerId, setTimerId] = useState<NodeJS.Timeout>()
  const [touchPos, setTouchPos] = useState<TouchPos | null>(null)

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchPos({
      clientX: Math.floor(e.touches[0].clientX),
      clientY: Math.floor(e.touches[0].clientY),
    })
  }

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchPos(null)

    const clientX = Math.floor(e.changedTouches[0].clientX)
    const clientY = Math.floor(e.changedTouches[0].clientY)

    if (touchPos?.clientX !== clientX || touchPos?.clientY !== clientY) {
      return
    }

    if (isSliding) {
      return
    }

    clearTimeout(timerId)

    setTimerId(
      setTimeout(() => {
        handleOpen()
      }, OPEN_MODAL_TOUCH_DELAY),
    )
  }

  const onPointerOver = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isSliding || e.pointerType === 'touch') {
      return
    }
    clearTimeout(timerId)
    setTimerId(
      setTimeout(() => {
        handleOpen()
      }, OPEN_MODAL_POINTER_DELAY),
    )
  }

  const onPointerOut = () => {
    clearTimeout(timerId)
  }

  return {
    onTouchStart,
    onTouchEnd,
    onPointerOver,
    onPointerOut,
  }
}
