import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { getTooltipStyles } from './utils'

const Tooltip = styled((props: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: props.className }} />
))(getTooltipStyles)

export default Tooltip
