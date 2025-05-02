interface Props {
  closeModal: () => void
}

export default function MediaMoreInfoModalBackdrop({ closeModal }: Props) {
  return <div className={'h-full w-full'} onPointerDown={closeModal} />
}
