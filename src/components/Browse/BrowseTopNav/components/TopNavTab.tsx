'use client'

import { useMediaQuerySM } from '@/components/UI/hooks'
import MobileTopNavTab from './MobileTopNavTab'
import RegularTopNavTab from './RegularTopNavTab'

export default function TopNavTab() {
  const isScreenSM = useMediaQuerySM()

  return (
    <div className="flex items-center gap-5">
      {isScreenSM ? <MobileTopNavTab /> : <RegularTopNavTab />}
    </div>
  )
}
