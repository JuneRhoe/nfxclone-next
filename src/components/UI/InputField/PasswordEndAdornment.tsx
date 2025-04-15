import InputAdornment from '@mui/material/InputAdornment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

interface Props {
  showPassword: boolean
  handleClickShowPassword: () => void
  handlePointerUpPassword: (e: React.PointerEvent<SVGSVGElement>) => void
  handlePointerDownPassword: (e: React.PointerEvent<SVGSVGElement>) => void
}

export default function PasswordEndAdornment({
  showPassword,
  handleClickShowPassword,
  handlePointerUpPassword,
  handlePointerDownPassword,
}: Props) {
  return (
    <InputAdornment position="end">
      <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        className="cursor-pointer text-gray-400"
        aria-label={showPassword ? 'hide the password' : 'display the password'}
        onClick={handleClickShowPassword}
        onPointerDown={handlePointerDownPassword}
        onPointerUp={handlePointerUpPassword}
        fixedWidth
      />
    </InputAdornment>
  )
}
