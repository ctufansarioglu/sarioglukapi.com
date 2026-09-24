import { createFileRoute } from '@tanstack/react-router'
import styled from '@emotion/styled'
import { Container } from '../components/common/Container'
import { AnchorButton } from '../components/common/Button'

export const Route = createFileRoute('/iletisim')({ component: ContactPage })

const Section = styled.section`padding: 76px 0 24px;`
const Grid = styled(Container)`display: grid; grid-template-columns: 1fr 1fr; gap: 64px; @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) { grid-template-columns: 1fr; }`
const Title = styled.h1`font-family: ${({ theme }) => theme.fonts.display}; font-size: clamp(2.7rem, 5vw, 4.4rem); line-height: 1; letter-spacing: -.05em; font-weight: 620;`
const Text = styled.p`max-width: 560px; color: ${({ theme }) => theme.colors.textMuted}; line-height: 1.8;`
const Card = styled.div`padding: 30px; border-radius: ${({ theme }) => theme.radius.md}; background: ${({ theme }) => theme.colors.surface}; border: 1px solid ${({ theme }) => theme.colors.border}; display: grid; gap: 26px; align-content: start;`
const Item = styled.div`display: grid; gap: 7px; span { color: ${({ theme }) => theme.colors.textMuted}; font-size: .76rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; } strong, a { font-size: 1.05rem; line-height: 1.6; }`

function ContactPage() {
  return <Section><Grid><div><Title>Bizimle iletişime geçin.</Title><Text>Kapı modelleri, proje talepleri ve üretim hakkında bilgi almak için telefon, e-posta veya WhatsApp üzerinden bize ulaşabilirsiniz.</Text><AnchorButton href="https://wa.me/905333610068" target="_blank" rel="noreferrer">WhatsApp’tan Yazın</AnchorButton></div><Card><Item><span>Adres</span><strong>Harsat, 13. Sokak No:19, 37300 Tosya / Kastamonu</strong></Item><Item><span>Telefon</span><a href="tel:+905333610068">0533 361 00 68</a></Item><Item><span>E-posta</span><a href="mailto:ctufansarioglu@gmail.com">ctufansarioglu@gmail.com</a></Item></Card></Grid></Section>
}
