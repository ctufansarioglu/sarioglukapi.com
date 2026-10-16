import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { RouterClient } from '@tanstack/react-router/ssr/client'
import { createRouter } from './router'

const router = createRouter()

if (window.$_TSR) {
  hydrateRoot(document, <RouterClient router={router} />)
} else {
  createRoot(document).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
