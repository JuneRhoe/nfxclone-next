'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Tabs from '@/components/UI/Tabs/Tabs'
import Tab from '@/components/UI/Tab/Tab'
import {
  PATH_BROWSE,
  PATH_BROWSE_ABOUT,
  PATH_BROWSE_SEARCH,
} from '@/libs/definition-route'

export default function RegularTopNavTab() {
  const router = useRouter()
  const pathName = usePathname()
  const [routePath, setRoutePath] = useState(pathName)

  const handleChange = (_event: React.SyntheticEvent, newRoutePath: string) => {
    setRoutePath(newRoutePath)
    router.push(newRoutePath)
  }

  useEffect(() => {
    setRoutePath(pathName)
  }, [pathName])

  return (
    <Tabs
      value={routePath}
      textColor="inherit"
      onChange={handleChange}
      aria-label="Top Navbar Tabs"
      hideIndicator={routePath === PATH_BROWSE_SEARCH}
    >
      <Tab value={PATH_BROWSE} label="Home" />
      <Tab value={PATH_BROWSE_ABOUT} label="About" />
      <Tab value={PATH_BROWSE_SEARCH} />
    </Tabs>
  )
}
