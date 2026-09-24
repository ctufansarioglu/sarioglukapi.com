import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '../components/products/CategoryPage'
import { getCategoryBySlug } from '../data/categories'

const category = getCategoryBySlug('pvc-kapi-modelleri')

export const Route = createFileRoute('/pvc-kapi-modelleri')({
  component: () => <CategoryPage category={category} />,
})
