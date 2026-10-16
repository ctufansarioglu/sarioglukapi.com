import { useState } from 'react'
import styled from '@emotion/styled'
import { Link } from '@tanstack/react-router'
import { Container } from '../common/Container'
import { navigationItems } from '../../data/navigation'

const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255,255,255,.96);
`
const Inner = styled(Container)`min-height: 70px; display: flex; align-items: center; justify-content: space-between; gap: 24px;`
const Brand = styled(Link)`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  gap: 4px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.25rem, 2.1vw, 1.6rem);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -.035em;
  color: ${({ theme }) => theme.colors.primaryDark};
  span {
    font-size: .72rem;
    line-height: 1.3;
    font-weight: 700;
    letter-spacing: .09em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.primary};
  }
`
const Nav = styled.nav`
  display: flex; align-items: center; gap: 28px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: absolute; top: 70px; left: 0; right: 0; padding: 20px;
    background: ${({ theme }) => theme.colors.white}; border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    flex-direction: column; align-items: stretch; display: ${({ open }) => (open ? 'flex' : 'none')};
  }
`
const NavLink = styled(Link)`font-size: .86rem; font-weight: 560; color: ${({ theme }) => theme.colors.textMuted}; &:hover { color: ${({ theme }) => theme.colors.text}; }`
const MenuButton = styled.button`display: none; border: 0; background: transparent; padding: 8px 0; color: inherit; font-size: .86rem; font-weight: 600; @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) { display: inline-flex; }`

export function Header() {
  const [open, setOpen] = useState(false)
  return <HeaderBar><Inner><Brand to="/" onClick={() => setOpen(false)}>SARIOĞLU <span>Orman Ürünleri</span></Brand><MenuButton onClick={() => setOpen((value) => !value)} aria-label="Menüyü aç veya kapat">Menü</MenuButton><Nav open={open}>{navigationItems.map((item) => <NavLink key={item.label} to={item.to} hash={item.hash} onClick={() => setOpen(false)}>{item.label}</NavLink>)}</Nav></Inner></HeaderBar>
}
