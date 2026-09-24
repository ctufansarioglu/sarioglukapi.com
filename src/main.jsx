import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const basepath = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

const router = createRouter({
  routeTree,
  basepath,
})

const rootElement = document.getElementById('root')

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
