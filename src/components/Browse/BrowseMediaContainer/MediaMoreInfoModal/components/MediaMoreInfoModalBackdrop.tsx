import { COLOR_BACKGROUND } from '@/styles/styleVariables'

interface Props {
  closeModal: () => void
}

export default function MediaMoreInfoModalBackdrop({ closeModal }: Props) {
  return (
    <div
      className={'h-full w-full opacity-70'}
      style={{ backgroundColor: `${COLOR_BACKGROUND}` }}
      onPointerDown={closeModal}
    />
  )
}
