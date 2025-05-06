import { RefObject, useEffect, useState } from 'react'
import { useModal } from '@/components/UI/Modal/hooks'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import { useTanstackQuery } from '@/libs/tanstack/hooks'
import { queryFunction } from '@/libs/tanstack/utils'
import { QUERY_KEY_MORELIKE_MEDIAS } from '@/libs/tanstack/queryKeys'

export function useMediaMoreInfoModal(
  divRef: RefObject<HTMLDivElement | null>,
) {
  const { isOpen, openModal, closeModal } = useModal()

  const itemRect = divRef.current?.getBoundingClientRect()

  return {
    isOpen,
    itemRect,
    openModal,
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
