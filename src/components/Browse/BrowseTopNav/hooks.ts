import { useEffect, useId } from 'react'
import { useMainStore } from '@/libs/stores/mainStoreProvider'
import { useTanstackQuery } from '@/libs/tanstack/hooks'
import { queryFunction } from '@/libs/tanstack/utils'
import { UserInfo } from '@/libs/stores/slices/userInfoSlice'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import {
  QUERY_KEY_MY_MEDIAS,
  QUERY_KEY_USER_INFO,
} from '@/libs/tanstack/queryKeys'

export function useInitUserInfo() {
  const { userInfo, setUserInfoAction, setMyMediasAction } = useMainStore(
    (state) => state,
  )

  const {
    isLoading: isUserInfoLoading,
    status: userInfoStatus,
    data: userInfoData,
  } = useTanstackQuery<UserInfo>(
    [QUERY_KEY_USER_INFO, useId()],
    async () => {
      const response = await queryFunction('user-info')
      return await response?.json()
    },
    !userInfo,
  )

  useEffect(() => {
    if (isUserInfoLoading || userInfoStatus !== 'success' || !userInfoData) {
      return
    }

    setUserInfoAction(userInfoData)
  }, [userInfoData, isUserInfoLoading, userInfoStatus, setUserInfoAction])

  const {
    isLoading: isMyMediasLoading,
    status: myMediasStatus,
    data: myMediasData,
  } = useTanstackQuery<MediaSelect[]>(
    [QUERY_KEY_MY_MEDIAS, userInfo?.id],
    async () => {
      const response = await queryFunction('my-medias')
      return await response?.json()
    },
    !!userInfo,
  )

  useEffect(() => {
    if (isMyMediasLoading || myMediasStatus !== 'success' || !myMediasData) {
      return
    }

    if (!Array.isArray(myMediasData)) {
      setMyMediasAction([])
      return
    }

    setMyMediasAction(myMediasData)
  }, [myMediasData, isMyMediasLoading, myMediasStatus, setMyMediasAction])
}
