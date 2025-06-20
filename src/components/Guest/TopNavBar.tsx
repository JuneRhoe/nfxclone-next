'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import Button from '@/components/UI/Button/Button'
import { getAssetPath } from '@/libs/utils-asset'
import { useMainStore } from '@/libs/stores/mainStoreProvider'
import { PATH_ROOT, PATH_SIGN_UP } from '@/libs/definition-route'

export default function TopNavBar() {
  const pathname = usePathname()
  const themeMode = useMainStore((state) => state.themeMode)

  return (
    <div
      className={clsx({
        'absolute flex h-full w-full items-center justify-between px-6 py-0 sm:px-8':
          themeMode === 'dark',
        [`flex w-full items-center justify-between border-b-1 border-b-gray-200 p-1 sm:p-2
        md:p-3 lg:p-4 xl:p-5 2xl:p-6`]: themeMode === 'light',
      })}
    >
      <div
        className={clsx('w-[4rem]', {
          'sm:w-[7rem]': themeMode === 'dark',
          'sm:w-[6rem]': themeMode === 'light',
        })}
      >
        <Link href={PATH_ROOT}>
          <Image
            src={getAssetPath('/logo.webp')}
            width="123"
            height="70"
            alt="Netflix Clone Logo"
          />
        </Link>
      </div>

      <div className="flex gap-3">
        <Button
          variant="contained"
          size="medium"
          LinkComponent={Link}
          href={pathname === PATH_ROOT ? PATH_SIGN_UP : PATH_ROOT}
        >
          {pathname === PATH_ROOT ? 'Sign Up' : 'Sign In'}
        </Button>
      </div>
    </div>
  )
}
