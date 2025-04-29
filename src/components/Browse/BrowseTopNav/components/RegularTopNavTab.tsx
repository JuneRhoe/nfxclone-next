'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Tabs from '@/components/UI/Tabs/Tabs'
import Tab from '@/components/UI/Tab/Tab'
import { isValidPath, TAB_INFO_LIST } from '../utils'

export default function RegularTopNavTab() {
  const router = useRouter()
  const pathName = usePathname()
  const [routePath, setRoutePath] = useState<string | boolean>(false)

  const handleChange = (_event: React.SyntheticEvent, newRoutePath: string) => {
    setRoutePath(newRoutePath)
    router.push(newRoutePath)
  }

  useEffect(() => {
    setRoutePath(isValidPath(pathName) ? pathName : false)
  }, [pathName])

  return (
    <Tabs
      value={routePath}
      textColor="inherit"
      onChange={handleChange}
      aria-label="Top Navbar Tabs"
      hideIndicator={!isValidPath(pathName)}
    >
      {TAB_INFO_LIST.map(({ path, label }) => (
        <Tab key={path} value={path} label={label} />
      ))}
    </Tabs>
  )
}
