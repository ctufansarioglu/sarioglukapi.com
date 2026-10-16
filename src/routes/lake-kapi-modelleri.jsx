import { createFileRoute } from '@tanstack/react-router'
import { CategoryPage } from '../components/products/CategoryPage'
import { getCategoryBySlug } from '../data/categories'
import { pageHead } from '../data/seo'

const category = getCategoryBySlug('lake-kapi-modelleri')

export const Route = createFileRoute('/lake-kapi-modelleri')({
  head: () => pageHead('/lake-kapi-modelleri'),
  component: () => <CategoryPage category={category} />,
})
