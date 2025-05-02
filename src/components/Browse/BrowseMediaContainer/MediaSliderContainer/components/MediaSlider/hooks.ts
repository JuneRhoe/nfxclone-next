import { RefObject, useEffect, useState } from 'react'
import { TouchPos } from './utils'
import { SliderItemSizeInfo } from '@/components/UI/Slider/Slider'
import { useScreenSize } from '@/components/UI/hooks'
import { useModal } from '@/components/UI/Modal/hooks'

export const PADDING_CLASS = 'px-[1.5rem] sm:px-[2.5rem]'

const OPEN_MODAL_DELAY = 100
const FADE_TIMER = 200

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

  const [isFadeIn, setIsFadeIn] = useState(false)
  const [isFadeOut, setIsFadeOut] = useState(false)

  const [openTimerId, setOpenTimerId] = useState<NodeJS.Timeout>()
  const [fadeInTimerId, setFadeInTimerId] = useState<NodeJS.Timeout>()
  const [fadeOutTimerId, setFadeOutTimerId] = useState<NodeJS.Timeout>()
  const [closeTimerId, setCloseTimerId] = useState<NodeJS.Timeout>()

  const startFadeIn = () => {
    clearTimeout(openTimerId)

    setOpenTimerId(
      setTimeout(() => {
        openModal()

        clearTimeout(fadeInTimerId)

        setFadeInTimerId(
          setTimeout(() => {
            setIsFadeIn(true)
          }, FADE_TIMER),
        )
      }, OPEN_MODAL_DELAY),
    )
  }

  const cancelFadeIn = () => {
    clearTimeout(openTimerId)
  }

  const startFadeOut = () => {
    clearTimeout(fadeOutTimerId)

    setFadeOutTimerId(
      setTimeout(() => {
        clearTimeout(closeTimerId)
        setCloseTimerId(undefined)
        setIsFadeOut(true)
      }, FADE_TIMER),
    )
  }

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
    if (isOpen) {
      return
    }

    setIsFadeIn(false)
  }, [isOpen])

  useEffect(() => {
    if (!isSliding) {
      return
    }

    clearTimeout(fadeInTimerId)
    setIsFadeIn(false)
    closeModal()
  }, [closeModal, fadeInTimerId, isSliding])

  useEffect(() => {
    if (!isFadeOut || closeTimerId) {
      return
    }

    setCloseTimerId(
      setTimeout(() => {
        closeModal()
        setIsFadeOut(false)
      }, FADE_TIMER),
    )
  }, [closeModal, isFadeOut, closeTimerId])

  const itemRect = divRef.current?.getBoundingClientRect()

  return {
    itemRect,
    isOpen,
    isFadeIn,
    isFadeOut,
    startFadeIn,
    cancelFadeIn,
    startFadeOut,
    openModal,
    closeModal,
  }
}

export function useMediaSliderItem(
  isSliding: boolean,
  startFadeIn: () => void,
  cancelFadeIn: () => void,
) {
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

    startFadeIn()
  }

  const onPointerOver = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isSliding || e.pointerType === 'touch') {
      return
    }

    startFadeIn()
  }

  const onPointerOut = () => {
    cancelFadeIn()
  }

  return {
    onTouchStart,
    onTouchEnd,
    onPointerOver,
    onPointerOut,
  }
}
