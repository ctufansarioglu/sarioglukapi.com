import { getCategoryImages } from './categoryImages'

const categoryDefinitions = [
  {
    slug: 'ahsap-dograma-kapi-modelleri',
    name: 'Ahşap Doğrama Kapılar',
    shortName: 'Ahşap Doğrama',
    codePrefix: 'AD',
    description: 'Doğal ahşabın karakterini güçlü işçilik ve zamansız çizgilerle buluşturan kapı modelleri.',
  },
  {
    slug: 'amerikan-panel-kapi-modelleri',
    name: 'Amerikan Panel Kapılar',
    shortName: 'Amerikan Panel',
    codePrefix: 'AP',
    description: 'Sade, dengeli ve farklı iç mekân stillerine kolayca uyum sağlayan panel kapı seçenekleri.',
  },
  {
    slug: 'lake-kapi-modelleri',
    name: 'Lake Kapılar',
    shortName: 'Lake',
    codePrefix: 'LK',
    description: 'Pürüzsüz yüzeyi ve yalın tasarım diliyle modern iç mekânları tamamlayan lake kapılar.',
  },
  {
    slug: 'melamin-kapi-modelleri',
    name: 'Melamin Kapılar',
    shortName: 'Melamin',
    codePrefix: 'ML',
    description: 'Modern yüzey alternatifleriyle pratik, dengeli ve dekorasyona uyumlu kapı modelleri.',
  },
  {
    slug: 'pvc-kapi-modelleri',
    name: 'PVC Kapılar',
    shortName: 'PVC',
    codePrefix: 'PVC',
    description: 'Farklı renk ve yüzey seçenekleriyle güncel yaşam alanlarına uyum sağlayan PVC kapılar.',
  },
]

export const categories = categoryDefinitions.map((category) => ({
  ...category,
  count: getCategoryImages(category.slug).length,
}))

export const getCategoryBySlug = (slug) =>
  categories.find((category) => category.slug === slug)

export function getCategoryProducts(category) {
  return getCategoryImages(category.slug).map((image, index) => {
    const fallbackNumber = index + 1
    const modelNumber = Number.isNaN(image.number) ? fallbackNumber : image.number
    const number = String(modelNumber).padStart(2, '0')

    return {
      id: `${category.codePrefix}-${number}`,
      name: `${category.shortName} Kapı ${number}`,
      image: image.src,
      fileName: image.fileName,
      width: 1122,
      height: 1402,
    }
  })
}
