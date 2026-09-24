import styled from '@emotion/styled'
import { Container } from '../common/Container'
import { ProductGrid } from './ProductGrid'
import { getCategoryProducts } from '../../data/categories'

const Header = styled.section`padding: 68px 0 46px; border-bottom: 1px solid ${({ theme }) => theme.colors.border};`
const Kicker = styled.span`display: block; margin-bottom: 15px; color: ${({ theme }) => theme.colors.textMuted}; font-size: .7rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;`
const Title = styled.h1`margin-bottom: 18px; max-width: 900px; font-size: clamp(2.5rem, 5vw, 4.4rem); line-height: 1; letter-spacing: -.05em; font-weight: 620;`
const Description = styled.p`max-width: 680px; margin-bottom: 14px; color: ${({ theme }) => theme.colors.textMuted}; font-size: 1rem; line-height: 1.72;`
const Count = styled.span`color: ${({ theme }) => theme.colors.textMuted}; font-size: .8rem;`
const Products = styled.section`padding: 54px 0 24px;`

export function CategoryPage({ category }) {
  const products = getCategoryProducts(category)
  return <><Header><Container><Kicker>Kapı Modelleri</Kicker><Title>{category.name}</Title><Description>{category.description}</Description><Count>{category.count} model</Count></Container></Header><Products><Container><ProductGrid products={products} /></Container></Products></>
}
