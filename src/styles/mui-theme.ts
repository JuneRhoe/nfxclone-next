'use client'

import { createTheme } from '@mui/material/styles'
// import { grey, red } from '@mui/material/colors'

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
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
})

export default MUI_THEME
