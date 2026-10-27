import { open } from 'node:fs/promises'

// Read PNG metadata on the server, without downloading images in the browser.
export function imageDimensionsPlugin() {
  return {
    name: 'image-dimensions',
    enforce: 'pre',
    async load(id) {
      const [file, query] = id.split('?')
      if (!new URLSearchParams(query).has('dimensions') || !file.endsWith('.png')) return

      this.addWatchFile(file)
      const handle = await open(file, 'r')
      try {
        const header = Buffer.alloc(24)
        const { bytesRead } = await handle.read(header, 0, header.length, 0)
        const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
        if (bytesRead !== 24 || !header.subarray(0, 8).equals(signature)
          || header.toString('ascii', 12, 16) !== 'IHDR') {
          throw new Error(`Invalid PNG header: ${file}`)
        }
        const width = header.readUInt32BE(16)
        const height = header.readUInt32BE(20)
        if (!width || !height) throw new Error(`Invalid image dimensions: ${file}`)

        return `export default ${JSON.stringify({ width, height })}`
      } finally {
        await handle.close()
      }
    },
  }
}
