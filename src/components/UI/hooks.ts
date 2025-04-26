import { useEffect, useState } from 'react'
import { useThrottledCallback } from 'use-debounce'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Breakpoint, useTheme } from '@mui/material/styles'

const THROTTLE_SCROLL_WAIT_TIME = 100
const THROTTLE_RESIZE_WAIT_TIME = 300

type ScreenSize = 'none' | Breakpoint | '2xl'

interface ScrollPos {
  posX: number
  posY: number
}

export function useScrollPos() {
  const [scrollPos, setScrollPos] = useState<ScrollPos>({ posX: 0, posY: 0 })

  const debounceHandleScroll = useThrottledCallback(() => {
    setScrollPos({ posX: window.scrollX, posY: window.scrollY })
  }, THROTTLE_SCROLL_WAIT_TIME)

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

export function useGetInnerWidth() {
  const [currentWidth, setCurrentWidth] = useState(0)

  const debounceHandleResize = useThrottledCallback(() => {
    setCurrentWidth(window.innerWidth)
  }, THROTTLE_RESIZE_WAIT_TIME)

  useEffect(() => {
    debounceHandleResize()
  }, [debounceHandleResize])

  useEffect(() => {
    window.addEventListener('resize', debounceHandleResize)

    return () => window.removeEventListener('resize', debounceHandleResize)
  }, [debounceHandleResize])

  return currentWidth
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
  return useMediaQuery((theme) => theme.breakpoints.up('lg'))
}

export function useScreenSize(): ScreenSize {
  const innerWidth = useGetInnerWidth()
  const theme = useTheme()

  if (innerWidth <= 0) {
    return 'none'
  }

  if (innerWidth < theme.breakpoints.values.xs) {
    return 'xs'
  } else if (innerWidth < theme.breakpoints.values.sm) {
    return 'sm'
  } else if (innerWidth < theme.breakpoints.values.md) {
    return 'md'
  } else if (innerWidth < theme.breakpoints.values.lg) {
    return 'lg'
  } else if (innerWidth < theme.breakpoints.values.xl) {
    return 'xl'
  } else if (innerWidth >= theme.breakpoints.values.xl) {
    return '2xl'
  }

  return 'none'
}
