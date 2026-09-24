import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '../components/products/CategoryPage'
import { getCategoryBySlug } from '../data/categories'

const category = getCategoryBySlug('ahsap-dograma-kapi-modelleri')

export const Route = createFileRoute('/ahsap-dograma-kapi-modelleri')({
  component: () => <CategoryPage category={category} />,
})
