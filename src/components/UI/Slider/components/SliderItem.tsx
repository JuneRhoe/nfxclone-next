import { CSSProperties, RefObject } from 'react'
import clsx, { ClassValue } from 'clsx'

interface Props {
  children: React.ReactNode
  ref?: RefObject<HTMLDivElement | null>
  className?: ClassValue[] | string
  style?: CSSProperties | undefined
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void
  onTouchEnd?: (e: React.TouchEvent<HTMLDivElement>) => void
  onPointerOver?: (e: React.PointerEvent<HTMLDivElement>) => void
  onPointerOut?: (e: React.PointerEvent<HTMLDivElement>) => void
  onPointerMove?: (e: React.PointerEvent<HTMLDivElement>) => void
}

export default function SliderItem({
  children,
  ref,
  className,
  style,
  onTouchStart,
  onTouchEnd,
  onPointerOver,
  onPointerOut,
  onPointerMove,
}: Props) {
  return (
    <div
      ref={ref}
      className={clsx(
        className,
        'inline-block cursor-pointer whitespace-normal',
      )}
      style={style}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onPointerMove={onPointerMove}
    >
      {children}
    </div>
  )
}
