import {
  createRequestHandler,
  renderRouterToString,
  RouterServer,
} from '@tanstack/react-router/ssr/server'
import { createRouter } from './router'

export { pages, canonicalUrl, siteUrl } from './data/seo'
export { categories } from './data/categories'

export async function render(url, manifest) {
  const handler = createRequestHandler({
    request: new Request(url),
    createRouter,
    getRouterManifest: () => manifest,
  })

  return handler(({ router, responseHeaders }) => {
    const failedMatch = router.state.matches.find((match) => match.status === 'error')
    if (failedMatch) throw failedMatch.error

    return renderRouterToString({
      router,
      responseHeaders,
      children: <RouterServer router={router} />,
    })
  })
}

export function getRoutePaths() {
  const router = createRouter()
  return Object.values(router.routesById)
    .filter((route) => route.id !== '__root__')
    .map((route) => route.fullPath)
}
