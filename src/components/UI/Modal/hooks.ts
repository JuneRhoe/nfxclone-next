import { useState } from 'react'

export function useModal() {
  const [open, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return { open, handleOpen, handleClose }
}
