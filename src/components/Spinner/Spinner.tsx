import { CSSProperties } from 'react'
import clsx, { ClassValue } from 'clsx'
import { ThemeMode } from '@/styles/styleVariables'

type DisplayType = 'full' | 'inline'

interface Props {
  themeMode?: ThemeMode
  display?: DisplayType
  className?: ClassValue[] | string
  iconClassName?: ClassValue[] | string
  style?: CSSProperties | undefined
}

export default function Spinner({
  themeMode = 'dark',
  display = 'full',
  className,
  iconClassName,
  style,
}: Props) {
  return (
    <div
      className={clsx(className, 'flex items-center justify-center', {
        'bg-[#171717]': themeMode === 'dark',
        'bg-white': themeMode === 'light',
        'h-full min-h-[100vh] w-full': display === 'full',
        'h-full w-full bg-transparent': display === 'inline',
      })}
      style={style}
    >
      <div
        className={clsx(
          iconClassName,
          'animate-spin rounded-[50%] border-b-transparent',
          {
            'border-gray-100': themeMode === 'dark',
            'border-gray-500': themeMode === 'light',
            'h-20 w-20 border-10': display === 'full',
            'h-5 w-5 border-3': display === 'inline',
          },
        )}
      />
    </div>
  )
}
