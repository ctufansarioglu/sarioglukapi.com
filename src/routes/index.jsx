import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/home/Hero'
import { CategoryShowcase } from '../components/home/CategoryShowcase'
import { AboutIntro } from '../components/home/AboutIntro'
import { ContactCta } from '../components/home/ContactCta'
import { pageHead } from '../data/seo'

export const Route = createFileRoute('/')({
  head: () => pageHead('/'),
  component: HomePage,
})

function HomePage() {
  return <><Hero /><CategoryShowcase /><AboutIntro /><ContactCta /></>
}
