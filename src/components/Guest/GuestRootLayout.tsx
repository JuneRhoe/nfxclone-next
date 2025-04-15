'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { COLOR_BACKGROUND, COLOR_FOREGROUND } from '@/styles/styleVariables'
import { getAssetPath } from '@/libs/assetUtils'
import Footer from '@/components/Footer/Footer'
import TopNavBar from '@/components/Guest/TopNavBar'
import { useMainStore } from '@/libs/stores/mainStoreProvider'

interface Props {
  children: React.ReactNode
}

export default function GuestRootLayout({ children }: Props) {
  const pathname = usePathname()
  const themeMode = useMainStore((state) => state.themeMode)

  const isSignUp = pathname === '/signup'

  return (
    <>
      <div
        className="relative flex h-[85vh] min-h-[37.5rem] w-full flex-col items-center
          sm:min-h-[45rem]"
        style={{
          backgroundColor:
            themeMode === 'dark' ? COLOR_BACKGROUND : COLOR_FOREGROUND,
        }}
      >
        <Image
          className="absolute h-full w-full object-cover"
          style={{ opacity: isSignUp ? 0.2 : themeMode === 'dark' ? 0.5 : 0 }}
          src={getAssetPath('/home/bg-home.webp')}
          placeholder="blur"
          blurDataURL={getAssetPath('/home/bg-home-blur.webp')}
          width="2000"
          height="1125"
          priority
          alt="Background Guest Home"
        />

        <div
          className={clsx(
            'absolute flex h-full w-full flex-col items-center justify-center',
            {
              'pt-[5rem] sm:pt-[8rem]':
                themeMode === 'dark' && pathname !== '/',
              'pt-0 sm:pt-[8rem]': themeMode === 'dark' && pathname === '/',
              'pt-[4rem] sm:pt-[6rem]': themeMode === 'light',
            },
          )}
        >
          {children}
        </div>

        <div
          className={clsx('relative flex w-full flex-col items-center', {
            'h-[5rem] sm:h-[8rem] xl:w-[80%] 2xl:w-[70%]': themeMode === 'dark',
            'h-[4rem] sm:h-[6rem]': themeMode === 'light',
          })}
        >
          <TopNavBar />
        </div>
      </div>
      <Footer />
    </>
  )
}
