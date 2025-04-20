'use client'

import { createTheme } from '@mui/material/styles'
// import { grey, red } from '@mui/material/colors'

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    extraSmall: true
    small: true
    medium: true
    large: true
  }
}

const MUI_THEME = createTheme({
  // components: {
  //   MuiButton: {
  //     defaultProps: {
  //       style: {
  //         textTransform: 'none',
  //         whiteSpace: 'nowrap',
  //         height: 'fit-content',
  //       },
  //     },
  //   },
  // },
  // cssVariables: true,
  // palette: {
  //   primary: {
  //     light: red[500],
  //     main: red[700],
  //     dark: red[600],
  //   },
  //   secondary: {
  //     light: grey[500],
  //     main: grey[700],
  //     dark: grey[600],
  //   },
  // },
  breakpoints: {
    values: {
      xs: 480,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
})

export default MUI_THEME
