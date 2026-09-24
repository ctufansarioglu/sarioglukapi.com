import { createFileRoute } from '@tanstack/react-router'
import styled from '@emotion/styled'
import { Container } from '../components/common/Container'

export const Route = createFileRoute('/kurumsal')({ component: CorporatePage })

const Section = styled.section`padding: 76px 0 24px;`
const Grid = styled(Container)`display: grid; grid-template-columns: .8fr 1.2fr; gap: 72px; @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) { grid-template-columns: 1fr; gap: 28px; }`
const Kicker = styled.span`font-size: .78rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: ${({ theme }) => theme.colors.textMuted};`
const Title = styled.h1`font-family: ${({ theme }) => theme.fonts.display}; font-size: clamp(2.7rem, 5vw, 4.4rem); line-height: 1; letter-spacing: -.05em; font-weight: 620;`
const Content = styled.div`p { color: ${({ theme }) => theme.colors.textMuted}; font-size: 1.06rem; line-height: 1.85; } h2 { margin-top: 44px; font-family: ${({ theme }) => theme.fonts.display}; font-size: 1.8rem; letter-spacing: -.03em; font-weight: 620; }`

function CorporatePage() {
  return <Section><Grid><div><Kicker>Kurumsal</Kicker><Title>Ahşapla başlayan bir üretim geleneği.</Title></div><Content><p>Sarıoğlu Orman Ürünleri, Kastamonu’nun Tosya ilçesinde ahşap işleme ve kapı üretimi alanında faaliyet gösterir. Üretim yaklaşımımız; malzemeyi tanıyan işçilik, sade tasarım ve farklı ihtiyaçlara cevap veren ürün çeşitliliği üzerine kuruludur.</p><p>Ürün yelpazemizde ahşap doğrama, Amerikan panel, lake, melamin ve PVC kapı modelleri yer alır. Kapı çözümlerini yaşam alanlarının mimari karakteriyle uyumlu, anlaşılır ve seçilebilir koleksiyonlar halinde sunmayı önemsiyoruz.</p><h2>Üretim yaklaşımımız</h2><p>Geleneksel ahşap bilgisini güncel üretim anlayışıyla bir araya getiriyor; yüzey, profil, kasa ve pervaz detaylarında bütünlüklü bir görünüm hedefliyoruz.</p></Content></Grid></Section>
}
