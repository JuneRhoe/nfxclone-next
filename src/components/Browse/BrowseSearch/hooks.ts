import { searchMedias } from '@/actions/action-search-medias'
import { useScreenSize } from '@/components/UI/hooks'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import { PATH_BROWSE } from '@/libs/definition-route'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

export function useSearchQuery() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const queryKey = searchParams.get('k') || ''

  const [isLoading, starSearchMedias] = useTransition()

  const [medias, setMedias] = useState<MediaSelect[] | null>(null)

  useEffect(() => {
    if (queryKey) {
      return
    }

    router.push(PATH_BROWSE)
  }, [router, queryKey])

  useEffect(() => {
    const callSearchMediasAction = async () => {
      starSearchMedias(async () => {
        if (!queryKey) {
          return
        }

        if (queryKey.length < 2) {
          setMedias(null)
          return
        }

        setMedias(await searchMedias(queryKey))
      })
    }
    callSearchMediasAction()
  }, [queryKey])

  return { isLoading, queryKey, medias }
}

export interface SearchItemSizeInfo {
  itemSize: number
  gapX: number
}

export function useSearchItemSizeInfo(): SearchItemSizeInfo {
  const screenSize = useScreenSize()
  const gapX = 0.5

  switch (screenSize) {
    case 'xs':
      return {
        itemSize: (100 - gapX) / 2,
        gapX,
      }
    case 'sm':
    case 'md':
      return {
        itemSize: (100 - gapX * 2) / 3,
        gapX,
      }
    case 'lg':
      return {
        itemSize: (100 - gapX * 4) / 4,
        gapX,
      }
    case 'xl':
      return {
        itemSize: (100 - gapX * 5) / 5,
        gapX,
      }
    case '2xl':
      return {
        itemSize: (100 - gapX * 5) / 6,
        gapX,
      }
  }

  return {
    itemSize: (100 - gapX * 2) / 3,
    gapX,
  }
}
