import { useCallback, useEffect, useState } from 'react'
import { NavDirection } from './components/SliderNavButton'
import { rotateArray, TouchPos } from './utils'
import { useDebouncedCallback } from 'use-debounce'

const TOUCH_SKIP_X_DIFF = 50
const TOUCH_SKIP_Y_DIFF = 25

const DEBOUNCER_NAV_BUTTON_CLICK_WAIT_TIME = 300

export function useSlider<TData, TDataArray extends TData[]>(
  data: TDataArray | null,
  countPerPage: number,
  itemSize: number,
) {
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [displayItems, setDisplayItems] = useState<TData[]>([])

  const [isSliding, setIsSliding] = useState(false)
  const [vectorX, setVectorX] = useState<number>(0)
  const [disableTransition, setDisableTransition] = useState(false)

  const [touchPos, setTouchPos] = useState<TouchPos | null>(null)

  useEffect(() => {
    if (currentIndex >= 0 || !data) {
      return
    }

    const newDisplayItems: TData[] = data.slice(0, countPerPage * 2)
    setDisplayItems(newDisplayItems)
  }, [countPerPage, currentIndex, data])

  useEffect(() => {
    if (currentIndex < 0 || isSliding || !data) {
      return
    }

    const totalMediaLength = data.length
    const displayMedias = [...data]

    if (
      totalMediaLength > countPerPage &&
      totalMediaLength < countPerPage * 3
    ) {
      displayMedias.push(...data, ...data)
    }

    const newDisplayItems: TData[] = rotateArray<TData>(
      displayMedias,
      -(currentIndex - countPerPage),
    )

    setDisableTransition(true)
    setDisplayItems(newDisplayItems)
    setVectorX(totalMediaLength <= countPerPage ? 0 : -itemSize * countPerPage)

    if (totalMediaLength <= countPerPage) {
      setCurrentIndex(0)
    }
  }, [countPerPage, currentIndex, isSliding, itemSize, data])

  const handleNavButtonClicked = useCallback(
    (direction: NavDirection) => {
      setDisableTransition(false)

      if (isSliding || !data) {
        return
      }

      setIsSliding(true)

      const curIdx = currentIndex < 0 ? 0 : currentIndex
      const initialVector = currentIndex < 0 ? 0 : -itemSize * countPerPage

      const totalMediaLength = data.length

      if (direction === 'Next') {
        const amount = totalMediaLength - (curIdx + countPerPage * 2)
        let newIdx = curIdx + countPerPage + Math.min(0, amount)
        newIdx = newIdx <= curIdx ? 0 : newIdx

        setCurrentIndex(newIdx)

        const idxDiff =
          newIdx === 0 ? totalMediaLength - curIdx : newIdx - curIdx
        setVectorX(initialVector - itemSize * idxDiff)
      } else {
        let newIdx = 0

        if (curIdx === 0) {
          newIdx = totalMediaLength - countPerPage
        } else {
          newIdx = Math.max(0, curIdx - countPerPage)
        }

        setCurrentIndex(newIdx)

        const idxDiff = curIdx === 0 ? countPerPage : curIdx - newIdx
        setVectorX(initialVector + itemSize * idxDiff)
      }
    },
    [isSliding, data, currentIndex, itemSize, countPerPage],
  )

  const handleNavButtonClickedDebouncer = useDebouncedCallback(
    (direction: NavDirection) => handleNavButtonClicked(direction),
    DEBOUNCER_NAV_BUTTON_CLICK_WAIT_TIME,
  )

  const isPrevButtonVisible = currentIndex >= 0
  const isNextButtonVisible = data && data.length > countPerPage

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
    const xDiff = clientX - (touchPos?.clientX || 0)
    const yDiff = Math.abs(clientY - (touchPos?.clientY || 0))

    if (yDiff > TOUCH_SKIP_Y_DIFF) {
      return
    }

    if (xDiff < -1 * TOUCH_SKIP_X_DIFF) {
      if (!isNextButtonVisible) {
        return
      }

      handleNavButtonClickedDebouncer('Next')
    } else if (xDiff > TOUCH_SKIP_X_DIFF) {
      if (!isPrevButtonVisible) {
        return
      }

      handleNavButtonClickedDebouncer('Prev')
    }
  }

  return {
    currentIndex,
    displayItems,
    vectorX,
    disableTransition,
    handleNavButtonClickedDebouncer,
    isPrevButtonVisible,
    isNextButtonVisible,
    isSliding,
    setIsSliding,
    onTouchStart,
    onTouchEnd,
  }
}
