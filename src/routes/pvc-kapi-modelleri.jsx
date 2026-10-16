import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '../components/products/CategoryPage'
import { getCategoryBySlug } from '../data/categories'
import { pageHead } from '../data/seo'

const category = getCategoryBySlug('pvc-kapi-modelleri')

export const Route = createFileRoute('/pvc-kapi-modelleri')({
  head: () => pageHead('/pvc-kapi-modelleri'),
  component: () => <CategoryPage category={category} />,
})
