import clsx, { ClassValue } from 'clsx'

interface Props {
  vectorX: string
  children: React.ReactNode
  disableTransition: boolean
  className?: ClassValue[] | string
  onTransitionEnd?: () => void
}

export default function SliderItemContainer({
  vectorX,
  children,
  disableTransition,
  className,
  onTransitionEnd,
}: Props) {
  return (
    <div
      className={clsx(
        'ease-[cubic-bezier(0.5, 0, 0.1, 1)] whitespace-nowrap',
        className,
      )}
      style={{
        transitionProperty: disableTransition ? 'none' : 'transform',
        transform: `translate3d(${vectorX}, 0, 0)`,
        transitionDuration: disableTransition ? 'unset' : '900ms',
      }}
      onTransitionEnd={() => onTransitionEnd?.()}
    >
      {children}
    </div>
  )
}
