'use client'

import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { getAssetPath } from '@/libs/utils-asset'

interface Props {
  isOpen: boolean
}

export default function UserMenuButton({ isOpen }: Props) {
  return (
    <div className="flex h-full cursor-pointer items-center gap-1 transition-all duration-300">
      <Image
        src={getAssetPath('/browse/icon_user.webp')}
        className="w-[1.5rem] rounded-sm sm:w-[2rem]"
        width="160"
        height="160"
        alt="User Icon"
      />
      <FontAwesomeIcon
        icon={faCaretUp}
        className="transition-all duration-200"
        rotation={isOpen ? undefined : 180}
        fixedWidth
      />
    </div>
  )
}
