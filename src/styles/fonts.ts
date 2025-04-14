import { Roboto } from 'next/font/google'

const FONT_ROBOTO = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export default FONT_ROBOTO
