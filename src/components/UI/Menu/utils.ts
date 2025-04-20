import { CSSProperties } from '@mui/material/styles'

export function getMenuStyles(): CSSProperties {
  return {
    opacity: '0.8',

    '& .MuiPaper-root': {
      backgroundColor: 'black',
      color: 'white',
    },

    '& .MuiMenu-paper': {
      overflow: 'hidden',
    },
    // backgroundColor: 'black',
    // boxShadow: 'none',
    // textTransform: 'none',
    // whiteSpace: 'nowrap',
    // color: 'white',
    // '&.MuiTab-root': {
    //   padding: '0.5rem',
    //   minHeight: '1rem',
    //   minWidth: '1rem',
    //   '& .MuiTouchRipple-root': {
    //     display: 'none',
    //   },
    //   '&:not(.Mui-selected)': {
    //     '&:hover': {
    //       opacity: '0.4',
    //     },
    //   },
    // },
  }
}
