import MuiIconButton from '@mui/material/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import clsx from 'clsx'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

type ButtonMode = 'primary' | 'secondary' | 'dark'

interface Props {
  icon: IconProp
  buttonMode?: ButtonMode
  loading?: boolean
  onClick: () => void
}

export default function IconButton({
  icon,
  buttonMode = 'primary',
  loading,
  onClick,
}: Props) {
  return (
    <MuiIconButton loading={loading} style={{ padding: 0 }} onClick={onClick}>
      <div
        className={clsx(
          `xs:py-[0.6rem] xs:px-0 flex rounded-4xl px-[0.1rem] py-1.5 shadow-sm
          shadow-gray-700 drop-shadow-xs transition-all duration-300`,
          {
            [`border-1 border-[var(--color-gray-200)] text-[var(--color-gray-200)]
            hover:border-[var(--color-gray-400)] hover:text-[var(--color-gray-400)]`]:
              buttonMode === 'primary',
            [`border-1 bg-gray-200 text-[var(--color-gray-800)] hover:bg-gray-400
            hover:text-[var(--color-gray-600)]`]: buttonMode === 'secondary',
            'bg-gray-700 text-[var(--color-gray-300)] hover:text-[var(--color-gray-400)]':
              buttonMode === 'dark',
          },
        )}
      >
        <FontAwesomeIcon
          className="xs:px-2 xs:text-sm text-shadow px-1 text-[0.5rem] transition-all duration-300"
          icon={loading ? faSpinner : icon}
          spin={loading}
          fixedWidth
        />
      </div>
    </MuiIconButton>
  )
}
