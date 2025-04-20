import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import { getMenuItemStyles } from './utils'

export type MENU_TYPE = 'topmenu' | 'usermenu'

interface Props extends MenuItemProps {
  menuType: MENU_TYPE
}

const MenuItem = styled(MuiMenuItem, {
  shouldForwardProp: (prop) => prop !== 'menuType',
})<Props>(({ menuType }) => ({
  ...getMenuItemStyles(menuType),
}))

export default MenuItem
