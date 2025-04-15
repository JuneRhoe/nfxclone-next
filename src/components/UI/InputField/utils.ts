import { CSSProperties } from '@mui/material/styles'
import { COLOR_MODE, LABEL_MODE } from './InputField'

export function getInputFieldStyles(
  labelMode: LABEL_MODE | undefined,
  colorMode: COLOR_MODE | undefined,
): CSSProperties {
  const clrMode = colorMode || 'dark'

  switch (labelMode) {
    case 'inner':
    default:
      return getInnerLabelStyles(clrMode)
    case 'outer':
      return getOuterLabelStyles(clrMode)
  }
}

function getInnerLabelStyles(colorMode: COLOR_MODE | undefined): CSSProperties {
  const isDarkClrMode = colorMode === 'dark'

  return {
    '& label.MuiInputLabel-root': {
      color: isDarkClrMode ? 'var(--color-gray-500)' : 'var(--color-gray-400)',
      useSelect: 'none',
    },
    '& label.MuiInputLabel-shrink': {
      color: isDarkClrMode ? 'var(--color-gray-500)' : 'var(--color-gray-400)',
    },
    '& .MuiFilledInput-root': {
      overflow: 'hidden',
      borderRadius: 4,
      border: '1px solid',
      backgroundColor: isDarkClrMode ? '#191919b3' : 'white',
      borderColor: '#B2BAC2',
      '&:hover': {
        borderColor: isDarkClrMode
          ? 'var(--color-gray-100)'
          : 'var(--color-gray-300)',
        backgroundColor: isDarkClrMode
          ? 'var(--color-gray-800)'
          : 'var(--color-gray-100)',
      },
      '&.Mui-focused': {
        backgroundColor: 'transparent',
        boxShadow: isDarkClrMode
          ? 'inset 0px 0px 0px 1px #fff'
          : 'inset 0px 0px 0px 1px var(--color-gray-700)',
        borderColor: isDarkClrMode ? 'white' : 'var(--color-gray-700)',
      },
      '&.Mui-error': {
        borderColor: 'var(--color-red-500)',
        '&:hover': {
          borderColor: 'var(--color-red-700)',
        },
        '&.Mui-focused': {
          boxShadow: 'inset 0px 0px 0px 1px var(--color-red-700)',
          borderColor: 'var(--color-red-700)',
        },
      },
      '& .MuiInputBase-input': {
        color: isDarkClrMode ? 'white' : 'var(--color-gray-800)',
      },
    },
    '& .MuiFormHelperText-root': {
      marginLeft: '0.25rem',
      color: 'var(--color-gray-500)',
    },
  }
}

function getOuterLabelStyles(colorMode: COLOR_MODE | undefined): CSSProperties {
  const isDarkClrMode = colorMode === 'dark'

  return {
    '& .MuiInputBase-input': {
      backgroundColor: isDarkClrMode ? '#191919b3' : 'white',
      color: isDarkClrMode ? 'white' : 'var(--color-gray-800)',
    },
    '& label.Mui-focused': {
      color: isDarkClrMode ? 'white' : 'var(--color-gray-800)',
    },
    '& label.MuiInputLabel-root': {
      color: isDarkClrMode ? 'var(--color-gray-500)' : 'var(--color-gray-400)',
      userSelect: 'none',
    },
    '& label.MuiInputLabel-shrink': {
      color: isDarkClrMode ? 'white' : 'var(--color-gray-800)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#B2BAC2',
      },
      '&:hover fieldset': {
        borderColor: '#E0E3E7',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& .MuiFormHelperText-root': {
      marginLeft: '0.25rem',
      color: 'var(--color-gray-500)',
      '&.Mui-error': {
        color: '#d32f2f',
      },
    },
  }
}
