import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '../components/products/CategoryPage'
import { getCategoryBySlug } from '../data/categories'

const category = getCategoryBySlug('lake-kapi-modelleri')

export const Route = createFileRoute('/lake-kapi-modelleri')({
  component: () => <CategoryPage category={category} />,
})
