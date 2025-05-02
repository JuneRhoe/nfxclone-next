import { RefObject, useEffect, useState } from 'react'
import { useModal } from '@/components/UI/Modal/hooks'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import { useTanstackQuery } from '@/libs/tanstack/hooks'
import { queryFunction } from '@/libs/tanstack/utils'
import { QUERY_KEY_MORELIKE_MEDIAS } from '@/libs/tanstack/queryKeys'

export const FADE_TIMER = 200

export function useMediaMoreInfoModal(
  divRef: RefObject<HTMLDivElement | null>,
) {
  const { isOpen, openModal, closeModal } = useModal()

  const [isFadeIn, setIsFadeIn] = useState(false)
  const [isFadeOut, setIsFadeOut] = useState(false)

  const [fadeInTimerId, setFadeInTimerId] = useState<NodeJS.Timeout>()
  const [fadeOutTimerId, setFadeOutTimerId] = useState<NodeJS.Timeout>()
  const [closeTimerId, setCloseTimerId] = useState<NodeJS.Timeout>()

  const startFadeIn = () => {
    openModal()

    clearTimeout(fadeInTimerId)

    setFadeInTimerId(
      setTimeout(() => {
        setIsFadeIn(true)
      }, FADE_TIMER),
    )
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
    if (isOpen) {
      return
    }

    setIsFadeIn(false)
  }, [isOpen])

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
    isOpen,
    itemRect,
    isFadeIn,
    isFadeOut,
    startFadeIn,
    startFadeOut,
    closeModal,
  }
}

export function useMediaMoreInfoModalMoreLikeThis(mediaInfo: MediaSelect) {
  const [morelikeMedias, setMorelikeMedias] = useState<MediaSelect[]>([])

  const mainCategoryIndex = mediaInfo.mainCategory

  const { isLoading, status, data } = useTanstackQuery<MediaSelect[]>(
    [QUERY_KEY_MORELIKE_MEDIAS, mainCategoryIndex],
    async () => {
      const response = await queryFunction('morelike-medias', [
        { name: 'main-category', value: mainCategoryIndex?.toString() || '' },
      ])

      return await response?.json()
    },
  )

  useEffect(() => {
    if (isLoading || status !== 'success' || !data) {
      return
    }

    if (!Array.isArray(data)) {
      setMorelikeMedias([])
      return
    }

    setMorelikeMedias(data)
  }, [data, isLoading, status])

  return { isLoading, morelikeMedias }
}
