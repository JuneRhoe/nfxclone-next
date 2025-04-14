import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import RootContainer from '@/components/Root/RootContainer'
import '@/styles/globals.css'
import '@/styles/fontawesome'
import FONT_ROBOTO from '@/styles/fonts'
import MUI_THEME from '@/styles/mui-theme'
import { ROOT_METADATA } from '@/libs/rootMetadata'
import { MainStoreProvider } from '@/libs/stores/mainStoreProvider'
// import { Analytics } from '@vercel/analytics/react'
// import { SpeedInsights } from '@vercel/speed-insights/react'

// import { headers } from 'next/headers'
// import createCache from '@emotion/cache'
// import { CacheProvider } from '@emotion/react'

export const metadata = ROOT_METADATA

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // const headersList = await headers()
  // const nonce = headersList.get('x-nonce') || ''

  // console.log('-----nonce-----', nonce)

  // const cache = createCache({
  //   key: 'my-prefix-key',
  //   nonce: nonce,
  //   prepend: true,
  // })

  /// remove X-Robots-Tag

  return (
    <html lang="en" className={FONT_ROBOTO.variable}>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={MUI_THEME}>
            <MainStoreProvider>
              <RootContainer>{children}</RootContainer>
            </MainStoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
        {/* <Analytics />
        <SpeedInsights /> */}
      </body>
    </html>
  )
}
