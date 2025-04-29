import 'server-only'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import RootContainerServer from '@/components/Root/RootContainerServer'
import '@/styles/globals.css'
import '@/styles/fontawesome'
import FONT_ROBOTO from '@/styles/fonts'
import MUI_THEME from '@/styles/mui-theme'
import { ROOT_METADATA } from '@/libs/metadata-root'
import { MainStoreProvider } from '@/libs/stores/mainStoreProvider'
import TanstackQueryProvider from '@/libs/tanstack/Providers'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

export const metadata = ROOT_METADATA

export default async function RootLayoutServer({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={FONT_ROBOTO.variable}>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={MUI_THEME}>
            <MainStoreProvider>
              <TanstackQueryProvider>
                <RootContainerServer>{children}</RootContainerServer>
              </TanstackQueryProvider>
            </MainStoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
