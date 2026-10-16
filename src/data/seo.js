import { categories } from './categories'

export const siteUrl = 'https://sarioglukapi.com'

export function canonicalUrl(path) {
  return `${siteUrl}${path === '/' ? '/' : `${path.replace(/\/$/, '')}/`}`
}

export const pages = [
  {
    path: '/',
    title: 'Kapı Modelleri ve Ahşap Kapı Üretimi | Sarıoğlu Orman Ürünleri',
    description: 'Tosya, Kastamonu’da Sarıoğlu Orman Ürünleri üretimi ahşap doğrama, Amerikan panel, lake, melamin ve PVC kapı modellerini keşfedin.',
  },
  {
    path: '/kurumsal',
    title: 'Kurumsal | Sarıoğlu Orman Ürünleri',
    description: 'Tosya, Kastamonu’da ahşap işleme ve kapı üretimi yapan Sarıoğlu Orman Ürünleri’nin üretim yaklaşımını ve kapı koleksiyonlarını tanıyın.',
  },
  {
    path: '/iletisim',
    title: 'İletişim | Sarıoğlu Orman Ürünleri',
    description: 'Kapı modelleri ve proje talepleriniz için Sarıoğlu Orman Ürünleri’ne ulaşın. Tosya, Kastamonu adresimiz, telefon, e-posta ve WhatsApp bilgilerimiz.',
  },
  ...categories.map((category) => ({
    path: `/${category.slug}`,
    title: `${category.shortName} Kapı Modelleri | Sarıoğlu Orman Ürünleri`,
    description: `${category.description} Sarıoğlu Orman Ürünleri’nin ${category.shortName.toLocaleLowerCase('tr')} kapı koleksiyonunu inceleyin.`,
  })),
]

export function pageHead(path) {
  const page = pages.find((entry) => entry.path === path)
  if (!page) throw new Error(`SEO kaydı bulunamadı: ${path}`)
  return {
    meta: [
      { title: page.title },
      { name: 'description', content: page.description },
    ],
    links: [{ rel: 'canonical', href: canonicalUrl(path) }],
  }
}
