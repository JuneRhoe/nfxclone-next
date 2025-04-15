import TextField, { TextFieldProps } from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { usePasswordInputFieldHook } from './hooks'
import { getInputFieldStyles } from './utils'

export type LABEL_MODE = 'inner' | 'outer'
export type COLOR_MODE = 'dark' | 'light'

type Props = TextFieldProps & {
  labelMode?: LABEL_MODE
  colorMode?: COLOR_MODE
}

const InputFieldBase = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'labelMode' && prop !== 'colorMode',
})<Props>(({ labelMode, colorMode }) => ({
  ...getInputFieldStyles(labelMode, colorMode),
}))

export default function InputField(props: Props) {
  const { type, variant, inputBaseProps } = usePasswordInputFieldHook(
    props.type,
    props.labelMode || 'inner',
  )

  return (
    <InputFieldBase
      {...props}
      type={type}
      variant={variant}
      autoComplete="new-password"
      slotProps={{
        input: {
          ...inputBaseProps,
        },
      }}
    />
  )
}
