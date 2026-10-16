import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '../components/products/CategoryPage'
import { getCategoryBySlug } from '../data/categories'
import { pageHead } from '../data/seo'

const category = getCategoryBySlug('melamin-kapi-modelleri')

export const Route = createFileRoute('/melamin-kapi-modelleri')({
  head: () => pageHead('/melamin-kapi-modelleri'),
  component: () => <CategoryPage category={category} />,
})
