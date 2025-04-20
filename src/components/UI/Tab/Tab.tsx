import { TabProps } from '@mui/material/Tab'
import MuiTab from '@mui/material/Tab'
import { styled } from '@mui/material/styles'
import { getTabStyles } from './utils'

export type THEME_MODE = 'primary' | 'secondary'

interface Props extends TabProps {
  themeMode?: THEME_MODE
}

const Tab = styled(MuiTab, {
  shouldForwardProp: (prop) => prop !== 'themeMode',
})<Props>(({ themeMode }) => ({
  ...getTabStyles(themeMode),
}))

export default Tab
