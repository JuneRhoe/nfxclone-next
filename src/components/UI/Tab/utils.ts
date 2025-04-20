import { CSSProperties } from '@mui/material/styles'
import { THEME_MODE } from './Tab'

export function getTabStyles(themeMode: THEME_MODE | undefined): CSSProperties {
  switch (themeMode) {
    case 'primary':
    default:
      return PRIMARY_STYLES
    case 'secondary':
      return SECONDARY_STYLES
  }
}

const PRIMARY_STYLES: CSSProperties = {
  boxShadow: 'none',
  textTransform: 'none',
  whiteSpace: 'nowrap',
  color: 'white',
  fontSize: 'md: var(--text-base), sm: var(--text-sm)',

  '&.MuiTab-root': {
    padding: '0.5rem',
    minHeight: '1rem',
    minWidth: '1rem',

    '& .MuiTouchRipple-root': {
      display: 'none',
    },

    '&:not(.Mui-selected)': {
      '&:hover': {
        opacity: '0.4',
      },
    },
  },
}

const SECONDARY_STYLES: CSSProperties = {
  boxShadow: 'none',
  textTransform: 'none',
  whiteSpace: 'nowrap',
  color: 'white',

  '&.MuiTab-root': {
    padding: '0.5rem',
    minHeight: '1rem',
    minWidth: '1rem',

    '& .MuiTouchRipple-root': {
      display: 'none',
    },

    '&:not(.Mui-selected)': {
      '&:hover': {
        opacity: '0.4',
      },
    },
  },
}
