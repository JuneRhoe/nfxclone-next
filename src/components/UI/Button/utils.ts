import { CSSProperties, Theme } from '@mui/material/styles'
import { BUTTON_MODE } from './Button'

export function getButtonStyles(
  buttonMode: BUTTON_MODE | undefined,
  resizeOnMobile: boolean | undefined,
  theme: Theme,
): CSSProperties {
  const sizeStyles = resizeOnMobile
    ? {
        [theme?.breakpoints?.down('xs')]: {
          height: '1.25rem',
          fontSize: '0.625rem',
        },
      }
    : undefined

  switch (buttonMode) {
    case 'primary':
    default:
      return { ...PRIMARY_STYLES, ...sizeStyles }
    case 'secondary':
      return { ...SECONDARY_STYLES, ...sizeStyles }
    case 'third':
      return { ...THIRD_STYLES, ...sizeStyles }
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

const THIRD_STYLES: CSSProperties = {
  height: '10px sm:20px',
  boxShadow: 'none',
  textTransform: 'none',
  whiteSpace: 'nowrap',
  color: 'black',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'var(--color-gray-300)',
  },
  '&:active': {
    backgroundColor: 'var(--color-gray-300)',
  },
  '&.Mui-disabled': {
    color: 'var(--color-gray-600)',
    backgroundColor: 'var(--color-gray-200)',
    '&.MuiButton-loading': {
      color: 'transparent',
      backgroundColor: '#5D5D5D',
    },
  },
}
