import MuiIconButton from '@mui/material/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import clsx from 'clsx'

type ButtonMode = 'primary' | 'secondary'

interface Props {
  buttonMode?: ButtonMode
  icon: IconProp
  onClick: () => void
}

export default function IconButton({
  buttonMode = 'primary',
  icon,
  onClick,
}: Props) {
  return (
    <MuiIconButton style={{ padding: 0 }} onClick={onClick}>
      <FontAwesomeIcon
        className={clsx(
          `shadow-sm shadow-gray-700 drop-shadow-xs transition-all duration-300
          hover:border-[var(--color-gray-400)] hover:text-[var(--color-gray-400)]`,
          {
            [`xs:px-2 xs:py-2.25 xs:text-sm rounded-4xl border-1
            border-[var(--color-gray-200)] px-1 py-1.25 text-[0.5rem]
            text-[var(--color-gray-200)]`]: buttonMode === 'primary',
          },
        )}
        icon={icon}
        fixedWidth
      />
    </MuiIconButton>
  )
}
