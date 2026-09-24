import { createRootRoute } from '@tanstack/react-router'
import { ThemeProvider } from '@emotion/react'
import { theme } from '../styles/theme'
import { GlobalStyles } from '../styles/GlobalStyles'
import { SiteLayout } from '../layouts/SiteLayout'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SiteLayout />
    </ThemeProvider>
  ),
})
