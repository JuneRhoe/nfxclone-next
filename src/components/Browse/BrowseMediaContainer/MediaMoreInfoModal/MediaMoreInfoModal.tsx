import Grow from '@mui/material/Grow'
import { MediaSelect } from '@/drizzle-definitions/data-types'
import Modal, { ModalProps } from '@/components/UI/Modal/Modal'
import { COLOR_BACKGROUND } from '@/styles/styleVariables'
import MediaMoreInfoModalBackdrop from './MediaMoreInfoModalBackdrop'
import MediaMoreInfoModalTop from './MediaMoreInfoModalTop'
import MediaMoreInfoModalBottom from './MediaMoreInfoModalBottom'
import { useRef } from 'react'

interface Props extends Omit<ModalProps, 'children'> {
  mediaInfo: MediaSelect
  itemRect: DOMRect | undefined
  closeModal: () => void
}

export default function MediaMoreInfoModal({
  mediaInfo,
  itemRect,
  closeModal,
  ...props
}: Props) {
  const divRef = useRef<HTMLDivElement | null>(null)

  return (
    <Modal
      {...props}
      open={props.open}
      onClose={closeModal}
      closeAfterTransition
      disableEnforceFocus
      disableRestoreFocus
      slots={{ backdrop: MediaMoreInfoModalBackdrop }}
      slotProps={{ backdrop: { closeModal } }}
    >
      <Grow
        in={props.open}
        style={{ transformOrigin: `${itemRect?.left}px ${itemRect?.top}px 0` }}
        timeout={300}
      >
        <div
          className={`absolute top-0 left-0 flex h-full w-full items-start justify-center
            overflow-x-hidden overflow-y-auto rounded-md p-5 focus-visible:outline-0 sm:p-10`}
          onPointerDown={(e) => {
            if (divRef.current?.contains(e.target as Node)) {
              return
            }

            closeModal()
          }}
        >
          <div
            ref={divRef}
            className="relative w-[64rem] rounded-t-xl shadow-md"
            style={{ backgroundColor: `${COLOR_BACKGROUND}` }}
          >
            <div className="relative w-full">
              <MediaMoreInfoModalTop
                mediaInfo={mediaInfo}
                closeModal={closeModal}
              />
            </div>
            <div>
              <MediaMoreInfoModalBottom mediaInfo={mediaInfo} />
            </div>
          </div>
        </div>
      </Grow>
    </Modal>
  )
}
