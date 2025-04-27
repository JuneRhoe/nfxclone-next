import { useEffect, useState, useTransition } from 'react'
import { useMainStore } from '@/libs/stores/mainStoreProvider'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import { addUsersMyMedia } from '@/actions/action-add-mymedias'
import { getUsersMyMedias } from '@/actions/action-get-mymedias'
import { removeUsersMyMedia } from '@/actions/action-remove-mymedias'
import { useDebouncedCallback } from 'use-debounce'

const MY_MEDIA_ACTION_DELAY = 500

export function useMyMedias(mediaInfo?: MediaSelect, closeModal?: () => void) {
  const { myMedias, userInfo, setMyMediasAction } = useMainStore(
    (state) => state,
  )
  const [isInMyList, setIsInMyList] = useState(false)
  const [isAddMyMediaLoading, startAddMyMedia] = useTransition()
  const [isRemoveMyMediaLoading, startRemoveMyMedia] = useTransition()

  useEffect(() => {
    if (!myMedias || !mediaInfo) {
      return
    }

    setIsInMyList(myMedias.some((media) => media.id === mediaInfo.id))
  }, [myMedias, mediaInfo])

  const addMyMedia = useDebouncedCallback(
    () =>
      startAddMyMedia(async () => {
        if (!mediaInfo || !userInfo?.userId) {
          return
        }

        await addUsersMyMedia(userInfo.userId, mediaInfo.id)
        setMyMediasAction(await getUsersMyMedias(userInfo.userId))
      }),
    MY_MEDIA_ACTION_DELAY,
  )

  const removeMyMedia = useDebouncedCallback(
    () =>
      startRemoveMyMedia(async () => {
        if (!mediaInfo || !userInfo?.userId) {
          return
        }

        await removeUsersMyMedia(userInfo.userId, mediaInfo.id)
        closeModal?.()
        setMyMediasAction(await getUsersMyMedias(userInfo.userId))
      }),
    MY_MEDIA_ACTION_DELAY,
  )

  return {
    myMedias,
    isInMyList,
    isAddMyMediaLoading,
    addMyMedia,
    isRemoveMyMediaLoading,
    removeMyMedia,
  }
}
