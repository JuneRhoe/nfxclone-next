import 'server-only'

import { COLOR_BACKGROUND } from '@/styles/styleVariables'
import BrowseTopNavBar from './BrowseTopNav/BrowseTopNavBar'
import Footer from '@/components/Footer/Footer'

interface Props {
  children: React.ReactNode
}

export default async function BrowseRootLayoutServer({ children }: Props) {
  return (
    <div
      className="relative flex h-full min-h-[100vh] w-full flex-col items-start justify-start
        text-sm text-white md:text-base"
      style={{ backgroundColor: `${COLOR_BACKGROUND}` }}
    >
      <BrowseTopNavBar />
      {children}
      <Footer />
    </div>
  )
}
