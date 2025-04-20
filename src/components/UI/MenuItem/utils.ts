import { CSSProperties } from '@mui/material/styles'
import { MENU_TYPE } from './MenuItem'

export function getMenuItemStyles(menuType: MENU_TYPE): CSSProperties {
  switch (menuType) {
    case 'topmenu':
    default:
      return TOPMENU_STYLES
    case 'usermenu':
      return USERMENU_STYLES
  }
}

const TOPMENU_STYLES = {
  minHeight: '2rem',
  fontSize: 'var(--text-xs)',
  color: 'var(--color-gray-400)',
  justifyContent: 'center',

  '&:hover': {
    backgroundColor: 'var(--color-gray-800)',
  },

  '&.Mui-selected': {
    color: 'white',
    fontWeight: 'var(--font-weight-extrabold)',
  },
}

const USERMENU_STYLES = {
  fontSize: 'var(--text-sm)',
  color: 'var(--color-gray-400)',
  justifyContent: 'center',
  // opacity: '0.5',

  '&:hover': {
    backgroundColor: 'var(--color-gray-800)',
  },

  '&.Mui-selected': {
    color: 'white',
  },
}
