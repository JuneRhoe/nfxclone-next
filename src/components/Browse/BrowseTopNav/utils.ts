import { PATH_BROWSE, PATH_BROWSE_ABOUT } from '@/libs/definition-route'

export interface TAB_INFO {
  path: string
  label: string
}

export const TAB_INFO_LIST: TAB_INFO[] = [
  { path: PATH_BROWSE, label: 'Home' },
  { path: PATH_BROWSE_ABOUT, label: 'About' },
]

export function isValidPath(pathName: string): boolean {
  return TAB_INFO_LIST.map(({ path }) => path).includes(pathName)
}
