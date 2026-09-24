import styled from '@emotion/styled'
import { Link } from '@tanstack/react-router'
import { Container } from '../common/Container'
import { categories } from '../../data/categories'

const FooterWrap = styled.footer`margin-top: 96px; padding: 58px 0 26px; background: ${({ theme }) => theme.colors.primaryDark}; color: ${({ theme }) => theme.colors.white};`
const Grid = styled(Container)`display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 64px; @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) { grid-template-columns: 1fr; gap: 38px; }`
const Brand = styled.h2`margin-bottom: 14px; font-size: 1.15rem; font-weight: 700; letter-spacing: -.02em;`
const Text = styled.p`max-width: 430px; color: rgba(255,255,255,.6); line-height: 1.72; font-size: .92rem;`
const Title = styled.h3`margin-bottom: 17px; font-size: .7rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.5);`
const List = styled.div`display: grid; gap: 11px; color: rgba(255,255,255,.75); font-size: .88rem; a:hover { color: white; }`
const Bottom = styled(Container)`margin-top: 46px; padding-top: 22px; border-top: 1px solid rgba(255,255,255,.12); color: rgba(255,255,255,.4); font-size: .76rem;`

export function Footer() {
  return <FooterWrap><Grid><div><Brand>Sarıoğlu Orman Ürünleri</Brand><Text>Ahşap doğrama, Amerikan panel, lake, melamin ve PVC kapı üretimi.</Text></div><div><Title>Kapı Modelleri</Title><List>{categories.map((category) => <Link key={category.slug} to={`/${category.slug}`}>{category.shortName}</Link>)}</List></div><div><Title>İletişim</Title><List><span>Harsat, 13. Sokak No:19, Tosya / Kastamonu</span><a href="tel:+905333610068">0533 361 00 68</a><a href="mailto:ctufansarioglu@gmail.com">ctufansarioglu@gmail.com</a></List></div></Grid><Bottom>© {new Date().getFullYear()} Sarıoğlu Orman Ürünleri</Bottom></FooterWrap>
}
