import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getSliderItemTitleImg } from '../../../utils'
import {
  faCheck,
  faPlus,
  faXmark,
  faPlay,
} from '@fortawesome/free-solid-svg-icons'
import IconButton from '@/components/UI/IconButton/IconButton'
import Button from '@/components/UI/Button/Button'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import { useMyMedias } from '../../MediaSliderContainer/components/MyMediasSlider/hooks'
import { COLOR_BACKGROUND } from '@/styles/styleVariables'

interface Props {
  mediaInfo: MediaSelect
  closeModal: () => void
}

export default function MediaMoreInfoModalTop({
  mediaInfo,
  closeModal,
}: Props) {
  const {
    isInMyList,
    isAddMyMediaLoading,
    addMyMedia,
    isRemoveMyMediaLoading,
    removeMyMedia,
  } = useMyMedias(mediaInfo, closeModal)

  return (
    <>
      <Image
        className="w-full rounded-t-xl"
        src={mediaInfo.previewMainImg || getSliderItemTitleImg(mediaInfo.id)}
        width="868"
        height="500"
        alt="Preview Image"
        priority
      />
      {mediaInfo.previewTitleImg && (
        <Image
          className="absolute bottom-[20%] left-[2%] h-auto w-[50%]"
          src={mediaInfo.previewTitleImg}
          width="520"
          height="208"
          alt="Browse Preview Title"
        />
      )}
      <div className="absolute top-[3%] right-[2%]">
        <IconButton icon={faXmark} buttonMode="dark" onClick={closeModal} />
      </div>
      <div
        className="absolute bottom-[5%] left-[2%] flex items-center gap-2 rounded-md p-1.5 sm:gap-4"
        style={{ backgroundColor: `${COLOR_BACKGROUND}` }}
      >
        <Button
          size="small"
          buttonMode="third"
          resizeOnMobile
          onClick={() => {}}
        >
          <div className="flex w-[4rem] items-center justify-center gap-1">
            <FontAwesomeIcon icon={faPlay} fixedWidth />
            Play
          </div>
        </Button>

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
    </>
  )
}
