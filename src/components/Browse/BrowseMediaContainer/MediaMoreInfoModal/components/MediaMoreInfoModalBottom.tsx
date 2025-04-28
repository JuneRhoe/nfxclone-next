import { MediaSelect } from '@/drizzle-definitions/data-types'
import MediaMoreInfoModalMoreLikeThis from './MediaMoreInfoModalMoreLikeThis'

interface Props {
  mediaInfo: MediaSelect
}

export default function MediaMoreInfoModalBottom({ mediaInfo }: Props) {
  return (
    <div className="flex flex-col gap-8 p-[3%] text-sm md:text-base">
      <div className="flex w-full items-start justify-between gap-5">
        <div className="flex w-[60%] flex-col gap-3">
          <div className="flex h-full w-full items-center gap-2">
            <div
              className="flex items-center justify-center rounded-sm border-1 border-gray-400 px-1.5
                whitespace-nowrap"
            >
              {mediaInfo.ratingSymbol}
            </div>
            <div className="flex items-center">
              {mediaInfo.ratingDetails?.join(' • ')}
            </div>
          </div>
          <div className="text-base md:text-2xl">{mediaInfo.title}</div>
          <div>{mediaInfo.description}</div>
        </div>
        <div className="flex w-[40%] flex-col gap-2">
          <div className="flex flex-wrap gap-1">
            <div className="text-gray-500">Cast:</div>
            <div>{mediaInfo.casts?.join(', ')}</div>
          </div>
          <div className="flex flex-wrap gap-1">
            <div className="text-gray-500">Genres:</div>
            <div>{mediaInfo.genres?.join(', ')}</div>
          </div>
          <div className="flex flex-wrap gap-1">
            <div className="whitespace-nowrap text-gray-500">
              This movie is:
            </div>
            <div>{mediaInfo.impressions?.join(', ')}</div>
          </div>
        </div>
      </div>
      <MediaMoreInfoModalMoreLikeThis mediaInfo={mediaInfo} />
    </div>
  )
}
