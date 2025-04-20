import { PATH_BROWSE_ABOUT, PATH_BROWSE_SEARCH } from '@/libs/definition-route'
import { getAssetPath } from '@/libs/utils-asset'

export function getSubTitle(routePath: string): string {
  switch (routePath) {
    case PATH_BROWSE_ABOUT:
      return 'About Netflix Clone'
    case PATH_BROWSE_SEARCH:
      return 'Search'
  }

  return ''
}

export function getPreviewMediaInfo(mediaId: number) {
  const mainImg = getAssetPath(
    `/browse/media-preview/preview-main-${mediaId}.jpg`,
  )
  const mainBlurImg = getAssetPath(
    `/browse/media-preview/preview-main-${mediaId}-blur.jpg`,
  )
  const titleImg = getAssetPath(
    `/browse/media-preview/preview-title-${mediaId}.webp`,
  )
  const trailer = getAssetPath(
    `/browse/media-preview/preview-trailer-${mediaId}.mp4`,
  )

  return { mainImg, mainBlurImg, titleImg, trailer }
}
