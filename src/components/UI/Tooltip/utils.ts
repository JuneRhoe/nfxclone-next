import { CSSProperties } from '@mui/material/styles'

export function getTooltipStyles(): CSSProperties {
  return {
    '& .MuiTooltip-tooltip': {
      backgroundColor: 'black',
      border: '1px solid var(--color-gray-700)',

      '& .MuiTooltip-arrow': {
        color: 'var(--color-gray-700)',
      },
    },
  }
}
