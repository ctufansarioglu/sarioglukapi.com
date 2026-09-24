import styled from '@emotion/styled'
import { Container } from '../common/Container'
import { ButtonLink } from '../common/Button'

const Section = styled.section`padding: 90px 0; background: ${({ theme }) => theme.colors.surfaceMuted};`
const Box = styled(Container)`
  display: grid;
  grid-template-columns: .75fr 1.25fr;
  gap: 84px;
  align-items: start;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) { grid-template-columns: 1fr; gap: 26px; }
`
const Kicker = styled.span`font-size: .72rem; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; color: ${({ theme }) => theme.colors.textMuted};`
const Title = styled.h2`max-width: 720px; font-size: clamp(2rem, 3.7vw, 3.3rem); line-height: 1.05; letter-spacing: -.045em; font-weight: 620;`
const Text = styled.p`max-width: 690px; color: ${({ theme }) => theme.colors.textMuted}; line-height: 1.78; font-size: 1rem; margin-bottom: 26px;`

export function AboutIntro() {
  return <Section><Box><Kicker>Sarıoğlu Orman Ürünleri</Kicker><div><Title>Malzemeyi tanıyan üretim, zamana dirençli bir yaklaşım.</Title><Text>Tosya’da faaliyet gösteren Sarıoğlu Orman Ürünleri, kapı ve ahşap işleme alanındaki üretim tecrübesini sade, işlevsel ve uzun ömürlü çözümlerle bir araya getirir.</Text><ButtonLink to="/kurumsal" variant="outline">Kurumsal</ButtonLink></div></Box></Section>
}
