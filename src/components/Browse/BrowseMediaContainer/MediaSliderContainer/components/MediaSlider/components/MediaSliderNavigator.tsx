import clsx from 'clsx'
import { useMemo } from 'react'

interface Props {
  currentIndex: number
  countPerPage: number
  totalMediaLength: number
}

export default function MediaSliderNavigator({
  currentIndex,
  countPerPage,
  totalMediaLength,
}: Props) {
  const navItems = useMemo(() => {
    if (countPerPage < 1) {
      return []
    }

    const totalPage = Math.ceil(totalMediaLength / countPerPage)

    return Array.from(Array(Number(totalPage)).keys())
  }, [countPerPage, totalMediaLength])

  const curPage = useMemo(() => {
    if (currentIndex < 0 || countPerPage < 1) {
      return 0
    }

    return Math.floor((currentIndex + countPerPage - 1) / countPerPage)
  }, [countPerPage, currentIndex])

  return (
    <div className="flex gap-0.5 pr-2">
      {navItems.map((index) => (
        <div
          key={index}
          className={clsx('h-0.5 w-4 transition-colors duration-200', {
            'bg-gray-600': curPage !== index,
            'bg-gray-50': curPage === index,
          })}
        />
      ))}
    </div>
  )
}
