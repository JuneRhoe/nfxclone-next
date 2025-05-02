import clsx from 'clsx'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faPlay } from '@fortawesome/free-solid-svg-icons'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import Button from '@/components/UI/Button/Button'
import { useMediaMoreInfoModal } from '../../../BrowseMediaContainer/MediaMoreInfoModal/hooks'
import { useRef } from 'react'
import MediaMoreInfoModal from '../../../BrowseMediaContainer/MediaMoreInfoModal/MediaMoreInfoModal'

export interface MediaPreviewImageProps {
  mediaInfo: MediaSelect
  mainBlurImg: string
  isVideoPlaying: boolean
  isVideoEnded: boolean
  onImageLoaded: (loaded: boolean) => void
}

export default function MediaPreviewImage({
  mediaInfo,
  mainBlurImg,
  isVideoPlaying,
  isVideoEnded,
  onImageLoaded,
}: MediaPreviewImageProps) {
  const moreInfoButtonRef = useRef<HTMLDivElement>(null)

  const { isOpen, isFadeIn, isFadeOut, startFadeIn, startFadeOut } =
    useMediaMoreInfoModal(moreInfoButtonRef)

  return (
    <>
      <div
        className={clsx(
          'h-full w-full opacity-100 transition-opacity duration-800',
          {
            'opacity-0': !isVideoPlaying && isVideoEnded,
          },
        )}
      >
        {mediaInfo.previewMainImg && (
          <Image
            className="w-full"
            src={mediaInfo.previewMainImg}
            placeholder="blur"
            blurDataURL={mainBlurImg}
            width="1140"
            height="640"
            alt="Browse Preview Main"
            priority
            onLoad={() => onImageLoaded(true)}
          />
        )}
        <div
          className="absolute bottom-[30%] z-3 flex w-[50%] flex-col justify-end gap-5 px-[1.5rem]
            sm:px-[2.5rem]"
        >
          <div
            className="h-[100%] transition-all duration-600"
            style={{
              width: isVideoPlaying && !isVideoEnded ? '60%' : '100%',
            }}
          >
            {mediaInfo.previewTitleImg && (
              <Image
                src={mediaInfo.previewTitleImg}
                width="520"
                height="208"
                alt="Browse Preview Title"
              />
            )}
          </div>
          <div className="flex gap-2">
            <Button
              size="small"
              buttonMode="third"
              resizeOnMobile
              onClick={() => {}}
            >
              <div className="flex items-center justify-center gap-1">
                <FontAwesomeIcon icon={faPlay} fixedWidth />
                Play
              </div>
            </Button>
            <Button
              size="small"
              buttonMode="secondary"
              resizeOnMobile
              onClick={startFadeIn}
            >
              <div
                ref={moreInfoButtonRef}
                className="flex items-center justify-center gap-1"
              >
                <FontAwesomeIcon icon={faCircleInfo} fixedWidth />
                More Info
              </div>
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <MediaMoreInfoModal
          mediaInfo={mediaInfo}
          open={isOpen}
          itemRect={moreInfoButtonRef.current?.getBoundingClientRect()}
          isFadeIn={isFadeIn}
          isFadeOut={isFadeOut}
          startFadeOut={startFadeOut}
          enableOpacityEffect
        />
      )}
    </>
  )
}
