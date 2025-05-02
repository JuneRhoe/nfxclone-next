import clsx, { ClassValue } from 'clsx'
import { useState } from 'react'

export type NavDirection = 'Prev' | 'Next'

interface Props {
  children: React.ReactNode | ((isHover: boolean) => React.ReactNode)
  className?: ClassValue[] | string
  onClick: () => void
}

export default function SliderNavButton({
  children,
  className,
  onClick,
}: Props) {
  const [isHover, setHover] = useState(false)

  return (
    <button
      className={clsx('outline-0 select-none', className)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={onClick}
    >
      {typeof children === 'function' ? children(isHover) : children}
    </button>
  )
}
