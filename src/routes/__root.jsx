import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { ThemeProvider } from '@emotion/react'
import { theme } from '../styles/theme'
import { GlobalStyles } from '../styles/GlobalStyles'
import { SiteLayout } from '../layouts/SiteLayout'
import { NotFoundPage } from '../components/common/NotFoundPage'

export const Route = createRootRoute({
  head: ({ matches }) => ({
    meta: [
      { charSet: 'UTF-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ...(matches.length === 1 ? [
        { title: 'Sayfa bulunamadı | Sarıoğlu Orman Ürünleri' },
        { name: 'robots', content: 'noindex' },
      ] : []),
    ],
    links: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  }),
  shellComponent: Document,
  notFoundComponent: NotFoundPage,
  component: () => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SiteLayout />
    </ThemeProvider>
  ),
})

function Document({ children }) {
  return (
    <html lang="tr">
      <head><HeadContent /></head>
      <body>
        <div id="root">{children}</div>
        <Scripts />
      </body>
    </html>
  )
}
