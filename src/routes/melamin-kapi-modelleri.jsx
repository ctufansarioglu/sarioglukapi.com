import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '../components/products/CategoryPage'
import { getCategoryBySlug } from '../data/categories'

const category = getCategoryBySlug('melamin-kapi-modelleri')

export const Route = createFileRoute('/melamin-kapi-modelleri')({
  component: () => <CategoryPage category={category} />,
})
