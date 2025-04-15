import { CSSProperties } from '@mui/material/styles'
import { THEME_MODE } from './Button'

export function getButtonStyles(
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
  boxShadow: 'none',
  textTransform: 'none',
  whiteSpace: 'nowrap',
  color: 'white',
  backgroundColor: '#E50914',
  '&:hover': {
    backgroundColor: '#C11119',
  },
  '&:active': {
    backgroundColor: '#C11119',
  },
  '&.Mui-disabled': {
    color: 'var(--color-gray-300)',
    backgroundColor: '#E55151',
    '&.MuiButton-loading': {
      color: 'transparent',
      backgroundColor: '#E50914',
    },
  },
}

const SECONDARY_STYLES: CSSProperties = {
  boxShadow: 'none',
  textTransform: 'none',
  whiteSpace: 'nowrap',
  color: 'white',
  backgroundColor: '#5D5D5D',
  '&:hover': {
    backgroundColor: '#3D3D3D',
  },
  '&:active': {
    backgroundColor: '#3D3D3D',
  },
  '&.Mui-disabled': {
    color: 'var(--color-gray-300)',
    backgroundColor: '#5D8181',
    '&.MuiButton-loading': {
      color: 'transparent',
      backgroundColor: '#5D5D5D',
    },
  },
}
