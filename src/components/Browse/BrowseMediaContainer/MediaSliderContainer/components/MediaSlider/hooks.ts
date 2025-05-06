import { RefObject, useEffect, useState } from 'react'
import { TouchPos } from './utils'
import { SliderItemSizeInfo } from '@/components/UI/Slider/Slider'
import { useScreenSize } from '@/components/UI/hooks'
import { useModal } from '@/components/UI/Modal/hooks'

export const PADDING_CLASS = 'px-[1.5rem] sm:px-[2.5rem]'

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
  isSliding: boolean,
) {
  const { isOpen, openModal, closeModal } = useModal()

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleScroll = () => {
      closeModal()
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [closeModal, isOpen])

  useEffect(() => {
    if (!isSliding) {
      return
    }

    closeModal()
  }, [closeModal, isSliding])

  const itemRect = divRef.current?.getBoundingClientRect()

  return {
    itemRect,
    isOpen,
    openModal,
    closeModal,
  }
}

export function useMediaSliderItem(isSliding: boolean, openModal: () => void) {
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

    openModal()
  }

  const onPointerOver = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isSliding || e.pointerType === 'touch') {
      return
    }

    openModal()
  }

  return {
    onTouchStart,
    onTouchEnd,
    onPointerOver,
  }
}
