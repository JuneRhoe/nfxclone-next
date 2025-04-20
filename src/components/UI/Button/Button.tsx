import { ButtonProps } from '@mui/material/Button'
import MuiButton from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Spinner from '@/components/Spinner/Spinner'
import { getButtonStyles } from './utils'

export type BUTTON_MODE = 'primary' | 'secondary' | 'third'

interface Props extends ButtonProps {
  buttonMode?: BUTTON_MODE
  resizeOnMobile?: boolean
}

const Button = styled(
  (props) => (
    <MuiButton {...props} loadingIndicator={<Spinner display="inline" />} />
  ),
  {
    shouldForwardProp: (prop) =>
      prop !== 'buttonMode' && prop !== 'resizeOnMobile',
  },
)<Props>(({ buttonMode, resizeOnMobile, theme }) => ({
  ...getButtonStyles(buttonMode, resizeOnMobile, theme),
}))

export default Button
