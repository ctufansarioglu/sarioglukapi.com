import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const distDirectory = resolve(process.cwd(), 'dist')
const indexFile = resolve(distDirectory, 'index.html')
const fallbackFile = resolve(distDirectory, '404.html')

await copyFile(indexFile, fallbackFile)

console.log('Created dist/404.html for GitHub Pages SPA fallback.')
