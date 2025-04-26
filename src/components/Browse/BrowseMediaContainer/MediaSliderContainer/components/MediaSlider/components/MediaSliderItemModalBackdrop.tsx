interface Props {
  handleClose: () => void
}

export default function MediaSliderItemModalBackdrop({ handleClose }: Props) {
  return (
    <div
      className="h-full w-full"
      onPointerDown={handleClose}
      onPointerOver={handleClose}
      onPointerMove={handleClose}
    />
  )
}
