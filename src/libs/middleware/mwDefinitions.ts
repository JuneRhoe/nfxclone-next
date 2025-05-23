import { PATH_BROWSE } from '../definition-route'

// export const REGEX_IGNORE_PATHS =
//   /\/api\/|_next\/static|_next\/image|favicon.ico/i
export const REGEX_IGNORE_PATHS = /_next\/static|_next\/image|favicon.ico/i
export const REGEX_PROTECTED_ROUTES =
  /^\/(api\/user-info|api\/my-medias|api\/search|api\/morelike-medias|browse|search)(\/[\w\-]*)*$/i
export const REGEX_SIGNED_IN_DEFAULT_ROUTE = /^\/(browse|about)(\/[\w\-]*)*$/i
export const SIGNED_IN_DEFAULT_ROUTE = PATH_BROWSE
