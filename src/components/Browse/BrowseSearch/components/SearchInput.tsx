import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { PATH_BROWSE, PATH_BROWSE_SEARCH } from '@/libs/definition-route'
import { useMediaQueryXS } from '@/components/UI/hooks'
import { useDebouncedCallback } from 'use-debounce'

interface Props {
  navTapRef: React.RefObject<HTMLDivElement | null>
}

export function SearchInput({ navTapRef }: Props) {
  const is2XS = useMediaQueryXS()
  const router = useRouter()
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)

  const [queryKey, setQueryKey] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [prevPath, setPrevPath] = useState<string>(PATH_BROWSE)

  const hasKeyword = queryKey.length > 0

  const routeDebouncer = useDebouncedCallback(() => {
    if (queryKey) {
      const searchParam = new URLSearchParams()
      searchParam.append('k', queryKey)
      router.push(`${PATH_BROWSE_SEARCH}?${searchParam}`)
    } else {
      router.push(prevPath)
    }
  }, 500)

  useEffect(() => {
    const handleClick = (e: PointerEvent | MouseEvent) => {
      if (!hasKeyword) {
        return
      }

      if (e.target instanceof HTMLAnchorElement) {
        setQueryKey('')
        setShowInput(false)
        return
      }

      if (
        (e.target instanceof HTMLAnchorElement ||
          e.target instanceof HTMLImageElement) &&
        navTapRef.current?.contains(e.target as Node)
      ) {
        setQueryKey('')
        setShowInput(false)
      }
    }

    window.addEventListener('click', handleClick)

    return () => window.removeEventListener('click', handleClick)
  }, [hasKeyword, navTapRef])

  const resetInput = () => {
    setQueryKey('')
    setShowInput(false)
    router.push(prevPath)
  }

  return (
    <>
      <div
        className="flex items-center justify-center bg-black outline-0"
        style={{
          padding: showInput ? '0.25rem' : '0',
          border: showInput ? '1px solid #6a7282' : '0',
          backgroundColor: showInput ? 'black' : 'transparent',
        }}
      >
        <FontAwesomeIcon
          className="cursor-pointer text-[1rem] transition-all duration-300 hover:text-gray-400
            sm:text-[1.25rem]"
          icon={faMagnifyingGlass}
          onClick={() => {
            setPrevPath(pathname)
            setShowInput(true)
            inputRef.current?.focus()
          }}
          fixedWidth
        />

        <input
          ref={inputRef}
          type="text"
          value={queryKey}
          className="bg-transparent px-2 text-xs text-gray-300 outline-0 transition-all duration-300
            ease-in-out sm:text-sm"
          style={{
            width: showInput ? (is2XS ? '7rem' : '13rem') : '0',
            paddingLeft: showInput ? '0.5rem' : '0',
            paddingRight: showInput ? '0.5rem' : '0',
          }}
          autoComplete="new-password"
          placeholder={showInput ? 'Title, people, genres' : ''}
          onKeyUp={(e) => {
            if (hasKeyword || e.key !== 'Escape') {
              return
            }

            resetInput()
          }}
          onChange={(e) => {
            setQueryKey(e.target.value)
            routeDebouncer()
          }}
          onBlur={() => {
            if (hasKeyword) {
              return
            }

            resetInput()
          }}
        />

        {showInput && (
          <FontAwesomeIcon
            className="cursor-pointer text-[0.875rem] transition-all duration-300 hover:text-gray-400"
            style={{ visibility: hasKeyword ? 'visible' : 'hidden' }}
            icon={faXmark}
            onClick={resetInput}
            fixedWidth
          />
        )}
      </div>
    </>
  )
}
