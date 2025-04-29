import { useScreenSize } from '@/components/UI/hooks'
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
