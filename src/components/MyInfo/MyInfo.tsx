import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { ThemeMode } from '@/styles/styleVariables'

export default function MyInfo({
  themeMode = 'dark',
}: {
  themeMode?: ThemeMode
}) {
  return (
    <>
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-2">
          <span
            style={{
              color:
                themeMode === 'dark'
                  ? 'var(--color-gray-500)'
                  : 'var(--color-gray-400)',
            }}
          >
            Built by
          </span>
          <Link
            href="https://www.linkedin.com/in/junghyunrhoe/"
            className="hover:underline"
            target="_blank"
          >
            Jung Hyun Rhoe
          </Link>
        </div>
        <Link href="https://www.linkedin.com/in/junghyunrhoe/" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} fixedWidth />
        </Link>
      </div>
      <div>
        <div
          className="flex flex-col gap-2 text-xs sm:text-sm"
          style={{
            color:
              themeMode === 'dark'
                ? 'var(--color-gray-400)'
                : 'var(--color-gray-600)',
          }}
        >
          <div className="flex items-center gap-2">
            <FontAwesomeIcon className="pt-0.5" icon={faGithub} fixedWidth />
            <Link
              href="https://github.com/JuneRhoe/nfxclone-next"
              className="hover:underline"
              target="_blank"
            >
              https://github.com/JuneRhoe/nfxclone-next
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <FontAwesomeIcon className="pt-0.5" icon={faEnvelope} fixedWidth />
            <div>junghyun.rhoe@gmail.com</div>
            {/* <LinkText to="" target="_blank"></LinkText> */}
          </div>
        </div>
      </div>
    </>
  )
}
