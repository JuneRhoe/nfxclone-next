import { CSSProperties } from '@mui/material/styles'
import { THEME_MODE } from './Tabs'

export function getTabsStyles(
  themeMode: THEME_MODE | undefined,
): CSSProperties {
  switch (themeMode) {
    case 'primary':
    default:
      return PRIMARY_STYLES
    case 'secondary':
      return SECONDARY_STYLES
  }
}

const PRIMARY_STYLES: CSSProperties = {
  minHeight: 0,

  '& .MuiTabs-list': {
    columnGap: '1rem',
  },

  '& .MuiTabs-indicator': {
    backgroundColor: 'white',
    height: '1px',
  },
}

const SECONDARY_STYLES: CSSProperties = {
  minHeight: 0,

  '& .MuiTabs-list': {
    columnGap: '1rem',
  },

  '& .MuiTabs-indicator': {
    backgroundColor: 'white',
    height: '1px',
  },
}
