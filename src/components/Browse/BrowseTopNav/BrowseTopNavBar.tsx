'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMainStore } from '@/libs/stores/mainStoreProvider'
import { PATH_BROWSE } from '@/libs/definition-route'
import { getAssetPath } from '@/libs/utils-asset'
import { COLOR_BACKGROUND } from '@/styles/styleVariables'
import { useScrollPos } from '@/components/UI/hooks'
import TopNavTab from './components/TopNavTab'
import UserMenu from './components/UserMenu'
import { getSubTitle } from '../utils'
import { getUserInfo } from '@/actions/action-userinfo'
import { getUsersMyMedias } from '@/actions/action-get-mymedias'
import { SearchInput } from '../BrowseSearch/components/SearchInput'

export default function BrowseTopNavBar() {
  const navTapRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { scrollPosY } = useScrollPos()

  const { setUserInfoAction, setMyMediasAction } = useMainStore(
    (state) => state,
  )

  useEffect(() => {
    const callUserInfoMyMediasAction = async () => {
      const userInfo = await getUserInfo()

      if (!userInfo) {
        return
      }

      setUserInfoAction(userInfo)
      setMyMediasAction(await getUsersMyMedias(userInfo.userId))
    }

    callUserInfoMyMediasAction()
  }, [setMyMediasAction, setUserInfoAction])

  const isScrollTop = scrollPosY === 0
  const isBrowseMain = pathname === PATH_BROWSE

  return (
    <div
      className={clsx('sticky top-0 z-20 w-full bg-transparent', {
        'h-[3rem] sm:h-[4rem] md:h-[4.5rem]': isBrowseMain,
        'h-[6rem] sm:h-[6.5rem] md:h-[7.5rem]': !isBrowseMain,
      })}
    >
      <div className="flex w-full items-center">
        <div
          className={clsx(
            'absolute top-0 z-0 h-full w-full transition-opacity duration-400',
            {
              'opacity-100': !isScrollTop && isBrowseMain,
              'opacity-0': isScrollTop && isBrowseMain,
            },
          )}
          style={{ backgroundColor: `${COLOR_BACKGROUND}` }}
        />
        <div
          className={clsx(
            `absolute top-0 h-full w-full bg-linear-to-b from-[${COLOR_BACKGROUND}]
            to-transparent transition-opacity duration-400`,
          )}
        />
        <div
          className="relative flex h-full w-full items-center justify-between gap-2 px-4 py-3 md:px-8
            md:py-4"
        >
          <div
            ref={navTapRef}
            className="flex h-full min-w-fit items-center gap-4 md:gap-10"
          >
            <Link
              href={PATH_BROWSE}
              className="w-[2.5rem] sm:w-[4rem] md:w-[5rem]"
            >
              <Image
                src={getAssetPath('/logo.webp')}
                width="123"
                height="70"
                alt="Netflix Clone Logo"
              />
            </Link>
            <TopNavTab />
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <SearchInput navTapRef={navTapRef} />
            <UserMenu />
          </div>
        </div>
      </div>
      {!isBrowseMain && (
        <div className="relative px-3 py-1 text-xl font-extrabold md:px-8 md:py-1 md:text-3xl">
          {getSubTitle(pathname)}
        </div>
      )}
    </div>
  )
}
