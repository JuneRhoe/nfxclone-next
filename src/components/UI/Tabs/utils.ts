import { CSSProperties } from '@mui/material/styles'
import { THEME_MODE } from './Tabs'

export function getTabsStyles(
  themeMode: THEME_MODE | undefined,
  hideIndicator: boolean | undefined,
): CSSProperties {
  switch (themeMode) {
    case 'primary':
    default:
      return PRIMARY_STYLES(hideIndicator)
    case 'secondary':
      return SECONDARY_STYLES(hideIndicator)
  }
}

const PRIMARY_STYLES = (hideIndicator: boolean | undefined): CSSProperties => ({
  minHeight: 0,

  '& .MuiTabs-list': {
    columnGap: '1rem',
  },

  '& .MuiTabs-indicator': {
    display: hideIndicator ? 'none' : 'inline-block',
    backgroundColor: 'white',
    height: '1px',
  },
})

const SECONDARY_STYLES = (
  hideIndicator: boolean | undefined,
): CSSProperties => ({
  minHeight: 0,

  '& .MuiTabs-list': {
    columnGap: '1rem',
  },

  '& .MuiTabs-indicator': {
    display: hideIndicator ? 'none' : 'inline-block',
    backgroundColor: 'white',
    height: '1px',
  },
})
