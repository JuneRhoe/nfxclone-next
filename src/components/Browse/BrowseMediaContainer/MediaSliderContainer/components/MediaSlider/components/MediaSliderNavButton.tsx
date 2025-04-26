import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import SliderNavButton, {
  NavDirection,
} from '@/components/UI/Slider/components/SliderNavButton'
import { useMediaQueryXS } from '@/components/UI/hooks'

interface Props {
  direction: NavDirection
  disabled?: boolean
  onClick?: () => void
}

export default function MediaSliderNavButton({
  direction,
  disabled,
  onClick,
}: Props) {
  const isScreenXS = useMediaQueryXS()

  return (
    <SliderNavButton
      className={clsx(
        `absolute top-0 z-10 flex min-h-full w-[1.625rem] items-center justify-center
        bg-[#171717] transition-opacity duration-300 sm:w-[2.625rem]`,
        {
          'opacity-0': disabled,
          'opacity-70 hover:opacity-85': !disabled,
          'left-[-0.25rem]': direction === 'Prev',
          'right-0': direction === 'Next',
          'cursor-pointer': !disabled,
          'cursor-auto': disabled,
        },
      )}
      onClick={() => {
        if (disabled) {
          return
        }

        onClick?.()
      }}
    >
      {(isHover) =>
        !disabled && (
          <FontAwesomeIcon
            className="text-3xl text-white opacity-0 transition-opacity duration-300 sm:text-4xl"
            icon={direction === 'Prev' ? faChevronLeft : faChevronRight}
            style={{ opacity: isHover || isScreenXS ? '100' : '0' }}
            fixedWidth
          />
        )
      }
    </SliderNavButton>
  )
}
