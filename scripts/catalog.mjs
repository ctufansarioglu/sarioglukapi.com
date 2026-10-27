import assert from 'node:assert/strict'
import { createWriteStream } from 'node:fs'
import { mkdir, stat } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pipeline } from 'node:stream/promises'
import PDFDocument from 'pdfkit'
import sharp from 'sharp'
import { catalog } from '../src/data/catalog.js'

export async function generateCatalog({ sections, siteUrl, output, imagePath }) {
  const perPage = 6
  const totalProducts = sections.reduce((total, section) => total + section.products.length, 0)
  assert(totalProducts > 0, 'Catalog has no products')

  const colors = { ink: '#171c19', green: '#29342e', muted: '#666963', line: '#dedfdb', paper: '#f3f3f1' }
  const doc = new PDFDocument({
    size: 'A4', margin: 0, autoFirstPage: false, bufferPages: true,
    info: { Title: catalog.title, Author: 'Sarıoğlu Orman Ürünleri', Subject: 'Kapı koleksiyonu', Language: 'tr-TR' },
    lang: 'tr-TR',
  })
  doc.registerFont('Regular', fileURLToPath(new URL('./fonts/NotoSans-Regular.ttf', import.meta.url)))
  doc.registerFont('Bold', fileURLToPath(new URL('./fonts/NotoSans-SemiBold.ttf', import.meta.url)))

  const W = 595.28
  const H = 841.89
  const M = 42
  const contentWidth = W - 2 * M
  const pageCount = 2 + sections.reduce((total, section) => total + Math.ceil(section.products.length / perPage), 0)
  await mkdir(dirname(output), { recursive: true })
  const writing = pipeline(doc, createWriteStream(output))
  // Attach a handler immediately; any failure is rethrown when awaiting writing.
  writing.catch(() => {})

  function text(value, x, y, { size = 10, color = colors.ink, bold = false, width = contentWidth, ...options } = {}) {
    doc.font(bold ? 'Bold' : 'Regular').fontSize(size).fillColor(color)
      .text(value, x, y, { width, lineGap: 3, ...options })
  }

  function line(y) {
    doc.moveTo(M, y).lineTo(W - M, y).lineWidth(.6).strokeColor(colors.line).stroke()
  }

  function page(label) {
    doc.addPage()
    text('SARIOĞLU', M, 28, { size: 10, bold: true })
    text(label, W - M - 240, 28, { size: 8, color: colors.muted, width: 240, align: 'right' })
    line(52)
  }

  async function image(product, x, y, width, height) {
    const path = imagePath(product)
    const buffer = await sharp(path)
      .resize({ width: Math.ceil(width * 3), height: Math.ceil(height * 3), fit: 'inside', withoutEnlargement: true })
      .flatten({ background: '#ffffff' }).jpeg({ quality: 88, chromaSubsampling: '4:4:4' }).toBuffer()
    doc.image(buffer, x, y, { fit: [width, height], align: 'center', valign: 'center' })
  }

  try {
    // Cover: the site's workshop photograph connects the collection to its craft.
    doc.addPage()
    doc.rect(0, 0, W, 290).fill(colors.green)
    text('SARIOĞLU', M, 45, { size: 25, bold: true, color: '#ffffff' })
    text('ORMAN ÜRÜNLERİ', M, 83, { size: 9, color: '#d8ded9', characterSpacing: 2 })
    text('Kapı Modelleri', M, 146, { size: 36, bold: true, color: '#ffffff' })
    text('KATALOĞU', M, 202, { size: 13, color: '#d8ded9', characterSpacing: 3 })
    const workshopPhoto = await sharp(fileURLToPath(new URL('../src/assets/images/home/hero-workshop.webp', import.meta.url)))
      .resize({ width: Math.ceil(contentWidth * 3), height: 870, fit: 'cover', position: 'centre' })
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4' }).toBuffer()
    doc.image(workshopPhoto, M, 318, { width: contentWidth, height: 290 })
    text('TOSYA / KASTAMONU', M, 621, { size: 8, color: colors.muted, characterSpacing: 1.2 })
    text('Yaşam alanlarına açılan detaylar.', M, 653, { size: 21, bold: true })
    text('Sarıoğlu Orman Ürünleri; ahşap doğrama, Amerikan panel, lake, melamin ve PVC kapı koleksiyonlarını üretim tecrübesiyle bir araya getirir.', M, 695, { size: 10, color: colors.muted, width: 470 })
    text('Ahşap doğrama · Amerikan panel · Lake · Melamin · PVC', M, 765, { size: 8.5, color: colors.muted })

    page('KOLEKSİYON')
    text('İçindekiler', M, 88, { size: 30, bold: true })
    text(`${sections.length} koleksiyon, ${totalProducts} kapı modeli.`, M, 140, { size: 12, color: colors.muted })
    let sectionPage = 3
    for (const [i, section] of sections.entries()) {
      const y = 213 + i * 77
      text(String(i + 1).padStart(2, '0'), M, y, { size: 10, color: colors.muted, width: 35 })
      text(section.name, M + 43, y - 3, { size: 16, bold: true, width: 375 })
      text(`${section.products.length} model`, M + 43, y + 25, { size: 9, color: colors.muted })
      text(String(sectionPage).padStart(2, '0'), W - M - 35, y, { size: 13, width: 35, align: 'right' })
      line(y + 58)
      sectionPage += Math.ceil(section.products.length / perPage)
    }
    text('Sarıoğlu Orman Ürünleri', M, 667, { size: 12, bold: true })
    text('Harsat, 13. Sokak No:19, Tosya / Kastamonu', M, 695, { size: 9, color: colors.muted })
    text('0533 361 00 68 · Cemil Sarıoğlu', M, 716, { size: 9, color: colors.muted })
    text('sariogluormanurunleri@gmail.com', M, 737, { size: 9, color: colors.muted })

    let embedded = 0
    for (const [sectionIndex, section] of sections.entries()) {
      const sectionPages = Math.ceil(section.products.length / perPage)
      for (let offset = 0; offset < section.products.length; offset += perPage) {
        page(`${String(sectionIndex + 1).padStart(2, '0')} / ${section.shortName}`)
        if (offset === 0) doc.outline.addItem(section.name)
        text(section.name, M, 76, { size: 25, bold: true })
        text(section.description, M, 119, { size: 9, color: colors.muted, width: 450 })
        text(`${section.products.length} model  /  Sayfa ${offset / perPage + 1} / ${sectionPages}`, M, 165, { size: 8, color: colors.muted })

        const cellWidth = (contentWidth - 32) / 3
        const cellHeight = 283
        for (const [i, product] of section.products.slice(offset, offset + perPage).entries()) {
          const x = M + (i % 3) * (cellWidth + 16)
          const y = 201 + Math.floor(i / 3) * (cellHeight + 14)
          doc.rect(x, y, cellWidth, 237).lineWidth(.5).strokeColor(colors.line).stroke()
          await image(product, x + 10, y + 10, cellWidth - 20, 217)
          text(product.id, x, y + 247, { size: 10, bold: true, width: cellWidth })
          text(product.name, x, y + 266, { size: 8, color: colors.muted, width: cellWidth })
          embedded++
        }
      }
    }
    assert.equal(embedded, totalProducts, 'Missing catalog models')
    const range = doc.bufferedPageRange()
    assert.equal(range.count, pageCount, 'Unexpected catalog pagination')
    for (let i = 0; i < range.count; i++) {
      doc.switchToPage(i)
      assert(Math.abs(doc.page.width - W) < .1 && Math.abs(doc.page.height - H) < .1, 'Catalog page is not A4')
      line(H - 43)
      text(new URL(siteUrl).host, M, H - 31, { size: 8, color: colors.muted, link: siteUrl })
      text(`${String(i + 1).padStart(2, '0')} / ${range.count}`, W - M - 65, H - 31, { size: 8, color: colors.muted, width: 65, align: 'right' })
    }
    doc.end()
    await writing
    const { size } = await stat(output)
    console.log(`Catalog: ${totalProducts} models, ${pageCount} A4 pages, ${(size / 1024 / 1024).toFixed(2)} MB → ${output}`)
  } catch (error) {
    doc.destroy(error)
    await writing.catch(() => {})
    throw error
  }
}
