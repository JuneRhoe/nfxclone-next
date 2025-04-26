import React from 'react'
import clsx, { ClassValue } from 'clsx'

export interface SliderItemSizeInfo {
  countPerPage: number
  itemSize: number
}

interface Props {
  children: React.ReactNode
  className?: ClassValue[] | string
}

export default function Slider({ children, className }: Props) {
  return (
    <div className={clsx('relative overflow-hidden', className)}>
      {children}
    </div>
  )
}
