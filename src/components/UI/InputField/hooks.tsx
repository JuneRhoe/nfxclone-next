import { HTMLInputTypeAttribute, useState } from 'react'
import { FilledInputProps } from '@mui/material/FilledInput'
import { InputBaseProps } from '@mui/material/InputBase'
import { TextFieldVariants } from '@mui/material/TextField'
import { LABEL_MODE } from './InputField'
import PasswordEndAdornment from './PasswordEndAdornment'

export function usePasswordInputFieldHook(
  inputType: HTMLInputTypeAttribute | undefined,
  labelMode: LABEL_MODE,
) {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handlePointerDownPassword = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault()
  }

  const handlePointerUpPassword = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault()
  }

  const endAdormentProps = {
    showPassword,
    handleClickShowPassword,
    handlePointerUpPassword,
    handlePointerDownPassword,
  }

  const isPasswordType = inputType === 'password'

  const filledInputProps: FilledInputProps =
    labelMode === 'inner'
      ? {
          disableUnderline: true,
        }
      : {}

  const inputBaseProps: InputBaseProps = {
    endAdornment: isPasswordType ? (
      <PasswordEndAdornment {...endAdormentProps} />
    ) : null,
    ...filledInputProps,
  }

  const type: HTMLInputTypeAttribute | undefined = isPasswordType
    ? showPassword
      ? 'text'
      : 'password'
    : inputType

  const variant: TextFieldVariants =
    labelMode === 'inner' ? 'filled' : 'outlined'

  return {
    type,
    variant,
    inputBaseProps,
  }
}
