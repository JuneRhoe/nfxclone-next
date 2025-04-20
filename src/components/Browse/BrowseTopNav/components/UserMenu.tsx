'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getAssetPath } from '@/libs/utils-asset'
import Tooltip from '@/components/UI/Tooltip/Tooltip'
import UserMenuButton from './UserMenuButton'
import { useMainStore } from '@/libs/stores/mainStoreProvider'
import { signOut } from '@/actions/action-signout'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { userInfo } = useMainStore((state) => state)

  return (
    <Tooltip
      arrow
      disableFocusListener
      open={isOpen}
      placement="bottom-end"
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      title={
        <div className="min-w-[9rem] rounded-sm bg-black opacity-90">
          <div className="flex flex-col gap-3 py-3 text-xs">
            <div className="flex h-[1rem] items-center gap-2 px-3">
              <Image
                src={getAssetPath('/browse/icon_user.webp')}
                className="w-[1.25rem] rounded-sm sm:w-[1.5rem]"
                width="160"
                height="160"
                alt="User Icon"
              />
              <div>{userInfo?.userId}</div>
            </div>
            <div className="h-[1px] bg-gray-700" />
            <div className="flex justify-center">
              <button
                className="cursor-pointer hover:underline"
                onClick={async () => await signOut()}
              >
                Sign out of Netflix Clone
              </button>
            </div>
          </div>
        </div>
      }
    >
      <button onClick={() => setIsOpen(!isOpen)}>
        <UserMenuButton isOpen={isOpen} />
      </button>
    </Tooltip>
  )
}
