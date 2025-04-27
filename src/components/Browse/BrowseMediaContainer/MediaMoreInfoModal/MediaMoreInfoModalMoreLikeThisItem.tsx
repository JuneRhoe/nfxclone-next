import Image from 'next/image'
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import { useMyMedias } from '../MediaSliderContainer/components/MyMediasSlider/hooks'
import { getSliderItemTitleImg } from '../../utils'
import IconButton from '@/components/UI/IconButton/IconButton'

interface Props {
  mediaInfo: MediaSelect
}

export default function MediaMoreInfoModalMoreLikeThisItem({
  mediaInfo,
}: Props) {
  const {
    isInMyList,
    isAddMyMediaLoading,
    addMyMedia,
    isRemoveMyMediaLoading,
    removeMyMedia,
  } = useMyMedias(mediaInfo)

  return (
    <div className="flex aspect-9/5 flex-col rounded-md bg-[#2F2F2F]">
      <Image
        className="rounded-sm"
        src={getSliderItemTitleImg(mediaInfo.id)}
        width="434"
        height="250"
        alt="Slider Item Image"
      />

      <div className="flex h-auto w-full items-center justify-between gap-2 px-2 py-4">
        <div className="xs:text-sm flex w-full flex-wrap items-center gap-2 text-xs">
          <div
            className="flex items-center justify-center rounded-sm border-1 border-gray-400 px-1.5
              whitespace-nowrap"
          >
            {mediaInfo.ratingSymbol}
          </div>
          <div className="flex items-center">
            {mediaInfo.impressions?.slice(0, 1)}
          </div>
        </div>
        <div className="flex min-w-[2rem] items-center justify-center">
          <IconButton
            icon={isInMyList ? faCheck : faPlus}
            loading={isAddMyMediaLoading || isRemoveMyMediaLoading}
            onClick={() => {
              if (isInMyList) {
                removeMyMedia()
              } else {
                addMyMedia()
              }
            }}
          />
        </div>
      </div>

      <div className="text-ellipsi xs:text-sm min-h-[32vh] p-[3%] text-xs">
        {mediaInfo.description}
      </div>
    </div>
  )
}
