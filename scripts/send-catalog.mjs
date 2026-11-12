import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { catalog } from '../src/data/catalog.js'

const { RESEND_API_KEY, SUBSCRIBERS, CATALOG_OUTPUT, GITHUB_RUN_ID } = process.env
if (!RESEND_API_KEY || !SUBSCRIBERS || !CATALOG_OUTPUT) {
  throw new Error('RESEND_API_KEY, SUBSCRIBERS ve CATALOG_OUTPUT gereklidir.')
}
const recipients = [...new Set(SUBSCRIBERS.split(/[,;\n\r]+/).map(value => value.trim()).filter(Boolean))]
if (!recipients.length || recipients.some(value => !/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(value))) {
  throw new Error('SUBSCRIBERS geçerli e-posta adresleri içermelidir.')
}
const content = (await readFile(CATALOG_OUTPUT)).toString('base64')
const subject = 'Sarıoğlu Orman Ürünleri | Kapı Modelleri Kataloğu'
const html = `<!doctype html><html lang="tr"><body style="margin:0;background:#f4f3ef;font-family:Arial,sans-serif;color:#252b25"><table role="presentation" style="width:100%;border-collapse:collapse"><tr><td style="padding:32px 16px"><table role="presentation" style="width:100%;max-width:600px;margin:auto;border-collapse:collapse;background:#fff"><tr><td style="padding:32px 36px;background:#253b30;color:#fff"><div style="font-size:22px;font-weight:bold;letter-spacing:1px">SARIOĞLU</div><div style="margin-top:6px;font-size:12px;letter-spacing:1px">ORMAN ÜRÜNLERİ</div></td></tr><tr><td style="padding:36px;line-height:1.7;font-size:15px"><h1 style="margin:0 0 24px;font-size:23px;line-height:1.3;color:#253b30">Kapı Modelleri Kataloğumuz</h1><p>Merhaba,</p><p>Kapı koleksiyonumuzu ve modellerimizi inceleyebilmeniz için güncel kataloğumuzu ekte bilgilerinize sunuyoruz.</p><p>Ürünlerimiz hakkında detaylı bilgi almak veya taleplerinizi paylaşmak için bizimle iletişime geçebilirsiniz.</p><p>İlginiz için teşekkür eder, iyi çalışmalar dileriz.</p><p style="margin-top:28px"><strong>Sarıoğlu Orman Ürünleri</strong><br><a href="https://sarioglukapi.com" style="color:#355c43">sarioglukapi.com</a></p></td></tr></table></td></tr></table></body></html>`
const text = 'Merhaba,\n\nKapı koleksiyonumuzu ve modellerimizi inceleyebilmeniz için güncel kataloğumuzu ekte bilgilerinize sunuyoruz.\n\nÜrünlerimiz hakkında detaylı bilgi almak veya taleplerinizi paylaşmak için bizimle iletişime geçebilirsiniz.\n\nİlginiz için teşekkür eder, iyi çalışmalar dileriz.\n\nSarıoğlu Orman Ürünleri\nhttps://sarioglukapi.com'

for (const [index, recipient] of recipients.entries()) {
  if (index) await new Promise(resolve => setTimeout(resolve, 600))
  const headers = { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' }
  if (GITHUB_RUN_ID) {
    const hash = createHash('sha256').update(recipient.toLowerCase()).digest('hex').slice(0, 32)
    headers['Idempotency-Key'] = `catalog/${GITHUB_RUN_ID}/${hash}`
  }
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers,
    body: JSON.stringify({ from: 'Sarıoğlu Orman Ürünleri <katalog@sarioglukapi.com>', to: [recipient], subject, html, text, attachments: [{ filename: catalog.fileName, content }] }),
  })
  if (!response.ok) throw new Error(`Resend gönderimi başarısız (HTTP ${response.status}, alıcı sırası ${index + 1}).`)
  console.log(`Resend gönderimi kabul etti (${index + 1}/${recipients.length}).`)
}
