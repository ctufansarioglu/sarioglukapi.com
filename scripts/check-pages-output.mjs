import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

async function check(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isSymbolicLink()) throw new Error('Symbolic links are not allowed in Pages output.')
    if (entry.isDirectory()) await check(path)
    else if (entry.name.toLowerCase().endsWith('.pdf')) throw new Error('PDF found in Pages output.')
  }
}
await check('dist')
console.log('Pages output contains no PDFs.')
