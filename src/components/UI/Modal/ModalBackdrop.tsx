interface Props {
  closeModal: () => void
}

export default function ModalBackdrop({ closeModal }: Props) {
  return (
    <div
      className="h-full w-full"
      onPointerDown={closeModal}
      onPointerOver={closeModal}
      onPointerMove={closeModal}
    />
  )
}
