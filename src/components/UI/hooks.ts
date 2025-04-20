import { useEffect, useState } from 'react'
import { useThrottledCallback } from 'use-debounce'
import useMediaQuery from '@mui/material/useMediaQuery'

const THROTTLE_WAIT_TIME = 100

type ScreenSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ScrollPos {
  posX: number
  posY: number
}

export function useScrollPos() {
  const [scrollPos, setScrollPos] = useState<ScrollPos>({ posX: 0, posY: 0 })

  const debounceHandleScroll = useThrottledCallback(() => {
    setScrollPos({ posX: window.scrollX, posY: window.scrollY })
  }, THROTTLE_WAIT_TIME)

  useEffect(() => {
    window.addEventListener('scroll', debounceHandleScroll)

    return () => window.removeEventListener('scroll', debounceHandleScroll)
  }, [debounceHandleScroll])

  return { scrollPosX: scrollPos.posX, scrollPosY: scrollPos.posY }
}

export function useIntersection(
  element: React.RefObject<HTMLElement | null>,
  rootMargin?: string,
): boolean {
  const [isVisible, setState] = useState(false)

  useEffect(() => {
    if (!element.current) {
      return
    }

    const current = element.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting)
      },
      { rootMargin },
    )

    observer?.observe(current)

    return () => current && observer.unobserve(current)
  }, [element, rootMargin])

  return isVisible
}

export function useMediaQueryXS(): boolean {
  return useMediaQuery((theme) => theme.breakpoints.down('xs'))
}

export function useMediaQuerySM(): boolean {
  return useMediaQuery((theme) => theme.breakpoints.down('sm'))
}

export function useMediaQueryMD(): boolean {
  return useMediaQuery((theme) => theme.breakpoints.down('md'))
}

export function useMediaQueryLG(): boolean {
  return useMediaQuery((theme) => theme.breakpoints.down('lg'))
}

export function useMediaQueryXL(): boolean {
  return useMediaQuery((theme) => theme.breakpoints.down('xl'))
}

export function useScreenSize(): ScreenSize {
  const isExtraSmall = useMediaQueryXS()
  const isSmall = useMediaQuerySM()
  const isMid = useMediaQueryMD()
  const isLarge = useMediaQueryLG()
  const isExtraLarge = useMediaQueryXL()

  if (isExtraSmall) {
    return 'xs'
  } else if (isSmall) {
    return 'sm'
  } else if (isMid) {
    return 'md'
  } else if (isLarge) {
    return 'lg'
  } else if (isExtraLarge) {
    return 'xl'
  }

  return 'none'
}
