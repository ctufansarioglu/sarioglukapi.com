import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { catalog } from '../src/data/catalog.js'

// Production serves a static PDF. Dev must intercept this URL before SPA fallback.
export function catalogDevPlugin() {
  return {
    name: 'catalog-dev',
    configureServer(server) {
      let pending
      const generate = async () => {
        const [{ generateCatalog }, { categories, getCategoryProducts }, { siteUrl }] = await Promise.all([
          import('./catalog.mjs'),
          server.ssrLoadModule('/src/data/categories.js'),
          server.ssrLoadModule('/src/data/seo.js'),
        ])
        const output = resolve(server.config.root, 'node_modules/.cache', catalog.fileName)
        await generateCatalog({
          sections: categories.map(category => ({ ...category, products: getCategoryProducts(category) })),
          siteUrl,
          output,
          imagePath: product => {
            const pathname = decodeURIComponent(new URL(product.image, 'http://localhost').pathname)
            if (!pathname.startsWith('/src/assets/images/categories/')) {
              throw new Error(`Unexpected catalog asset: ${product.image}`)
            }
            return resolve(server.config.root, `.${pathname}`)
          },
        })
        return readFile(output)
      }

      server.middlewares.use((request, response, next) => {
        if (request.url?.split('?')[0] !== catalog.path) return next()
        if (request.method !== 'GET' && request.method !== 'HEAD') {
          response.writeHead(405, { Allow: 'GET, HEAD' })
          response.end()
          return
        }

        pending ??= generate().finally(() => { pending = undefined })
        pending.then(buffer => {
          response.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${catalog.fileName}"`,
            'Content-Length': buffer.length,
            'Cache-Control': 'no-store',
          })
          response.end(request.method === 'HEAD' ? undefined : buffer)
        }).catch(error => {
          server.config.logger.error(`Catalog generation failed: ${error.stack ?? error}`)
          response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
          response.end('Katalog oluşturulamadı. Geliştirme sunucusunun hata çıktısını kontrol edin.')
        })
      })
    },
  }
}
