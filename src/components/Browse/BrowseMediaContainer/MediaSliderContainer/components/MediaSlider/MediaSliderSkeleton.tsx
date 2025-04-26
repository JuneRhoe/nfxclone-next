import clsx from 'clsx'
import { useMediaSlider } from './hooks'
import Skeleton from '@mui/material/Skeleton'

interface Props {
  title?: string
  countPerPage: number
  itemSize: number
}

export default function MediaSliderSkeleton({
  title,
  countPerPage,
  itemSize,
}: Props) {
  const { paddingClass } = useMediaSlider()
  const itemArray = Array.from(Array(countPerPage).keys())

  return (
    <div className="flex flex-col gap-2">
      {title && (
        <div className={paddingClass}>
          <div className="flex w-full items-center justify-between">
            <div className="text-base sm:text-xl">{title}</div>
          </div>
        </div>
      )}
      <div className={clsx('flex w-full gap-1', paddingClass)}>
        {itemArray.map((i) => (
          <div
            key={i}
            className="aspect-9/5 h-auto"
            style={{ width: `${itemSize}%` }}
          >
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: 'grey.900', borderRadius: '0.25rem' }}
              width="100%"
              height="100%"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
