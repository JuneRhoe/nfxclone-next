import { ButtonProps } from '@mui/material/Button'
import MuiButton from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Spinner from '@/components/Spinner/Spinner'
import { getButtonStyles } from './utils'

export type THEME_MODE = 'primary' | 'secondary'

interface Props extends ButtonProps {
  themeMode?: THEME_MODE
}

const Button = styled(
  (props) => (
    <MuiButton {...props} loadingIndicator={<Spinner display="inline" />} />
  ),
  { shouldForwardProp: (prop) => prop !== 'themeMode' },
)<Props>(({ themeMode }) => ({
  ...getButtonStyles(themeMode),
}))

export default Button
