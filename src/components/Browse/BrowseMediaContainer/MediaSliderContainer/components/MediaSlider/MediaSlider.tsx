import MediaSliderNavigator from './components/MediaSliderNavigator'
import MediaSliderNavButton from './components/MediaSliderNavButton'
import MediaSliderItem from './components/MediaSliderItem'
import { useMediaSlider, useMediaSliderItemSizeInfo } from './hooks'
import { useSlider } from '@/components/UI/Slider/hooks'
import Slider from '@/components/UI/Slider/Slider'
import SliderItemContainer from '@/components/UI/Slider/components/SliderItemContainer'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import MediaSliderSkeleton from './MediaSliderSkeleton'

interface Props {
  medias: MediaSelect[] | null
  title?: string
  placeholder?: string
}

export interface MoreInfoModalInfo {
  mediaInfo: MediaSelect
  itemRect: DOMRect | null | undefined
}

export default function MediaSlider({ medias, title, placeholder }: Props) {
  const { countPerPage, itemSize } = useMediaSliderItemSizeInfo()

  const {
    currentIndex,
    displayItems,
    vectorX,
    disableTransition,
    handleNavButtonClickedDebouncer,
    isPrevButtonVisible,
    isNextButtonVisible,
    isSliding,
    setIsSliding,
    onTouchStart,
    onTouchEnd,
  } = useSlider<MediaSelect, MediaSelect[]>(medias, countPerPage, itemSize)

  const { paddingClass } = useMediaSlider()

  if (itemSize < 1) {
    return null
  }

  const mediaLength = medias?.length || 0

  if (!medias || (mediaLength > 0 && displayItems.length < 1)) {
    return (
      <MediaSliderSkeleton
        title={title}
        countPerPage={countPerPage}
        itemSize={itemSize}
      />
    )
  }

  return (
    <>
      <div
        className="flex flex-col gap-2"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {title && (
          <div className={paddingClass}>
            <div className="flex w-full items-center justify-between">
              <div className="text-base sm:text-xl">{title}</div>
              <MediaSliderNavigator
                currentIndex={currentIndex}
                countPerPage={countPerPage}
                totalMediaLength={mediaLength}
              />
            </div>
          </div>
        )}

        {placeholder && mediaLength < 1 ? (
          <div
            className="w-full"
            style={{ aspectRatio: `${(9 * countPerPage) / 5}` }}
          >
            <div
              className="flex h-full w-full items-center justify-center p-5 text-base text-gray-400
                text-shadow-gray-800 text-shadow-lg"
            >
              Please add movies and tv shows to My List
            </div>
          </div>
        ) : (
          <Slider className={paddingClass}>
            <>
              <MediaSliderNavButton
                direction="Prev"
                disabled={!isPrevButtonVisible}
                onClick={() => handleNavButtonClickedDebouncer('Prev')}
              />

              <SliderItemContainer
                vectorX={`${vectorX}%`}
                disableTransition={disableTransition}
                onTransitionEnd={() => setIsSliding(false)}
              >
                {displayItems.map((mediaInfo, i) => (
                  <MediaSliderItem
                    key={i}
                    mediaInfo={mediaInfo}
                    itemSize={itemSize}
                    isSliding={isSliding}
                  />
                ))}
              </SliderItemContainer>

              <MediaSliderNavButton
                direction="Next"
                disabled={!isNextButtonVisible}
                onClick={() => handleNavButtonClickedDebouncer('Next')}
              />
            </>
          </Slider>
        )}
      </div>
    </>
  )
}
