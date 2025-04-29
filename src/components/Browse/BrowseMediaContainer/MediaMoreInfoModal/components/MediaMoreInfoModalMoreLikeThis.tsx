import { MediaSelect } from '@/drizzle-definitions/data-types'
import MediaMoreInfoModalMoreLikeThisItem from './MediaMoreInfoModalMoreLikeThisItem'
import { useMediaMoreInfoModalMoreLikeThis } from '../hooks'
import Spinner from '@/components/Spinner/Spinner'

interface Props {
  mediaInfo: MediaSelect
}

export default function MediaMoreInfoModalMoreLikeThis({ mediaInfo }: Props) {
  useMediaMoreInfoModalMoreLikeThis(mediaInfo)

  const { isLoading, morelikeMedias } =
    useMediaMoreInfoModalMoreLikeThis(mediaInfo)

  if (isLoading) {
    return (
      <Spinner
        className="opacity-50"
        display="inline"
        iconClassName={'w-10 h-10 border-5'}
      />
    )
  }

  return (
    <div className="flex w-full flex-col gap-4 text-sm md:text-base">
      <div className="w-full text-base md:text-2xl">More Like This</div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {morelikeMedias?.map((mediaInfo) => (
          <MediaMoreInfoModalMoreLikeThisItem
            key={mediaInfo.id}
            mediaInfo={mediaInfo}
          />
        ))}
      </div>
    </div>
  )
}
