import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '../components/products/CategoryPage'
import { getCategoryBySlug } from '../data/categories'
import { pageHead } from '../data/seo'

const category = getCategoryBySlug('amerikan-panel-kapi-modelleri')

export const Route = createFileRoute('/amerikan-panel-kapi-modelleri')({
  head: () => pageHead('/amerikan-panel-kapi-modelleri'),
  component: () => <CategoryPage category={category} />,
})
