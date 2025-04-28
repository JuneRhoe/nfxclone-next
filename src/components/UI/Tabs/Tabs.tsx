import { TabsProps } from '@mui/material/Tabs'
import MuiTabs from '@mui/material/Tabs'
import { styled } from '@mui/material/styles'
import { getTabsStyles } from './utils'

export type THEME_MODE = 'primary' | 'secondary'

interface Props extends TabsProps {
  themeMode?: THEME_MODE
  hideIndicator?: boolean
}

// MuiTabs-indicator

const Tabs = styled(MuiTabs, {
  shouldForwardProp: (prop) => prop !== 'themeMode' && prop !== 'hideIndicator',
})<Props>(({ themeMode, hideIndicator }) => ({
  ...getTabsStyles(themeMode, hideIndicator),
}))

export default Tabs
