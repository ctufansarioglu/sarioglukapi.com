import assert from 'node:assert/strict'
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { render, getRoutePaths, pages, canonicalUrl, siteUrl, categories } from '../dist-ssr/entry-server.js'

const dist = resolve('dist')
const viteManifest = JSON.parse(await readFile(resolve(dist, '.vite/manifest.json'), 'utf8'))
const entry = viteManifest['index.html']
assert(entry?.isEntry, 'Vite client entry is missing')
const manifest = {
  routes: {
    __root__: {
      scripts: [{ attrs: { type: 'module', src: `/${entry.file}` } }],
      css: [...new Set(Object.values(viteManifest).flatMap((chunk) => chunk.css ?? []))]
        .map((file) => `/${file}`),
    },
  },
}

const routePaths = getRoutePaths()
assert.equal(new Set(pages.map((page) => page.path)).size, pages.length, 'Duplicate SEO paths')
assert.deepEqual([...routePaths].sort(), pages.map((page) => page.path).sort(), 'Routes and SEO records differ')
assert.equal(new Set(pages.map((page) => page.title)).size, pages.length, 'Duplicate titles')
assert.equal(new Set(pages.map((page) => page.description)).size, pages.length, 'Duplicate descriptions')

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;',
  })[character])
}

const renderedPages = []
for (const page of pages) {
  const url = canonicalUrl(page.path)
  const response = await render(url, manifest)
  const html = await response.text()
  assert.equal(response.status, 200, `Render failed: ${page.path}`)
  assert.match(html, /<html lang="tr">/, `Wrong language: ${page.path}`)
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `Missing or duplicate h1: ${page.path}`)
  assert.match(html, /data-emotion=/, `Missing styles: ${page.path}`)
  assert.equal((html.match(/<title>/g) ?? []).length, 1, `Duplicate title: ${page.path}`)
  const head = html.slice(0, html.indexOf('</head>'))
  assert(head.includes(`<title>${escapeHtml(page.title)}</title>`), `Wrong title: ${page.path}`)
  assert.equal((head.match(/name="description"/g) ?? []).length, 1, `Duplicate description: ${page.path}`)
  assert(head.includes(`content="${escapeHtml(page.description)}"`), `Wrong description: ${page.path}`)
  assert.equal((head.match(/rel="canonical"/g) ?? []).length, 1, `Duplicate canonical: ${page.path}`)
  assert(head.includes(`href="${url}"`), `Wrong canonical: ${page.path}`)
  assert(!head.includes('noindex'), `Indexing disabled: ${page.path}`)
  assert(!html.includes('<!--$!-->'), `Unresolved Suspense: ${page.path}`)
  const category = categories.find((item) => `/${item.slug}` === page.path)
  if (category) {
    assert.equal((html.match(/<a\b[^>]*\bdata-pswp-item=/g) ?? []).length, category.count, `Missing products: ${page.path}`)
    assert(html.includes(category.name), `Wrong category: ${page.path}`)
  }
  const output = resolve(dist, `.${page.path}`, 'index.html')
  await mkdir(resolve(output, '..'), { recursive: true })
  await writeFile(output, html)
  renderedPages.push(html)
  console.log(`Prerendered ${new URL(url).pathname}`)
}

const notFound = await render(`${siteUrl}/404/`, manifest)
assert.equal(notFound.status, 404, 'Not-found render must return 404')
const notFoundHtml = await notFound.text()
assert.match(notFoundHtml, /Sayfa bulunamadı/, 'Missing not-found content')
assert.match(notFoundHtml.slice(0, notFoundHtml.indexOf('</head>')), /name="robots" content="noindex"/, '404 must be noindex')
assert(!notFoundHtml.includes('rel="canonical"'), '404 must not canonicalize to a valid page')
await writeFile(resolve(dist, '404.html'), notFoundHtml)

await writeFile(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>${escapeHtml(canonicalUrl(page.path))}</loc></url>`).join('\n')}\n</urlset>\n`)
await writeFile(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)

// Check real files, including links between pages, without an SPA fallback.
const localPaths = new Set()
for (const html of [...renderedPages, notFoundHtml]) {
  for (const [, value] of html.matchAll(/(?:src|href)="(\/[^"<>]*)"/g)) {
    const pathname = new URL(value.replaceAll('&amp;', '&'), siteUrl).pathname
    localPaths.add(pathname)
  }
}
for (const pathname of localPaths) {
  const file = pathname.endsWith('/') ? `${pathname}index.html` : pathname
  await access(resolve(dist, `.${file}`)).catch(() => {
    throw new Error(`Missing local output: ${pathname}`)
  })
}
console.log(`Validated ${pages.length} pages, 404, SEO tags and ${localPaths.size} local URLs.`)
