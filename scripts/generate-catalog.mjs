import assert from 'node:assert/strict'
import { resolve } from 'node:path'
import { categories, getCategoryProducts, siteUrl } from '../dist-ssr/entry-server.js'
import { catalog } from '../src/data/catalog.js'
import { generateCatalog } from './catalog.mjs'

await generateCatalog({
  sections: categories.map(category => ({ ...category, products: getCategoryProducts(category) })),
  siteUrl,
  output: resolve('dist', catalog.fileName),
  imagePath: product => {
    assert(product.image.startsWith('/assets/'), `Unexpected catalog asset: ${product.image}`)
    return resolve('dist', `.${product.image}`)
  },
})
