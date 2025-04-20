'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { PATH_BROWSE, PATH_BROWSE_ABOUT } from '@/libs/definition-route'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import Menu from '@/components/UI/Menu/Menu'
import MenuItem from '@/components/UI/MenuItem/MenuItem'

export default function MobileTopNavTab() {
  const router = useRouter()
  const pathName = usePathname()

  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const isOpen = Boolean(anchorEl)

  const handleClickBrowse = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const handleClickMenuItem = (newRoutePath: string) => {
    handleClose()
    router.push(newRoutePath)
  }

  return (
    <>
      <button onClick={handleClickBrowse}>
        <div className="flex cursor-pointer items-center gap-2 text-sm">
          <div className="text-xs">Browse</div>
          <FontAwesomeIcon
            icon={faCaretUp}
            className="transition-all duration-200"
            rotation={isOpen ? undefined : 180}
            fixedWidth
          />
        </div>
      </button>

      <Menu
        anchorEl={anchorEl}
        id="mobile-browse-top-nav-menu"
        open={isOpen}
        slotProps={{
          paper: { sx: { minWidth: '10rem' } },
        }}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          menuType="topmenu"
          onClick={() => handleClickMenuItem(PATH_BROWSE)}
          selected={pathName === PATH_BROWSE}
        >
          Home
        </MenuItem>
        <MenuItem
          menuType="topmenu"
          onClick={() => handleClickMenuItem(PATH_BROWSE_ABOUT)}
          selected={pathName === PATH_BROWSE_ABOUT}
        >
          About
        </MenuItem>
      </Menu>
    </>
  )
}
