import clsx from 'clsx'
import MyInfo from '@/components/MyInfo/MyInfo'
import { useMainStore } from '@/libs/stores/mainStoreProvider'

export default function Footer() {
  const themeMode = useMainStore((state) => state.themeMode)

  return (
    <div
      className={clsx('flex w-full items-center justify-center py-5', {
        ['bg-gray-200 text-gray-700']: themeMode === 'light',
      })}
    >
      <div className="flex flex-col items-center justify-center gap-2 text-xl sm:text-2xl">
        <MyInfo themeMode={themeMode} />
      </div>
    </div>
  )
}
