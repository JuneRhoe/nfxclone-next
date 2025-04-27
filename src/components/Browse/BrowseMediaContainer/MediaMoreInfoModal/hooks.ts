import { RefObject, useEffect, useState, useTransition } from 'react'
import { useModal } from '@/components/UI/Modal/hooks'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import { getMoreLikeMedias } from '@/actions/action-get-morelike-medias'

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
  const [isGetMorelikeMediasLoading, startGetMorelikeMedias] = useTransition()

  useEffect(() => {
    const callMorelikeMediasAction = async () => {
      startGetMorelikeMedias(async () => {
        if (!mediaInfo.mainCategory) {
          return
        }
        setMorelikeMedias(await getMoreLikeMedias(mediaInfo.mainCategory))
      })
    }
    callMorelikeMediasAction()
  }, [mediaInfo.mainCategory])

  return { isGetMorelikeMediasLoading, morelikeMedias }
}
