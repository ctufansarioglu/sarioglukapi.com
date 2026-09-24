import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/home/Hero'
import { CategoryShowcase } from '../components/home/CategoryShowcase'
import { AboutIntro } from '../components/home/AboutIntro'
import { ContactCta } from '../components/home/ContactCta'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return <><Hero /><CategoryShowcase /><AboutIntro /><ContactCta /></>
}
