import styled from '@emotion/styled'
import { Container } from '../common/Container'
import { ButtonLink } from '../common/Button'

const Section = styled.section`padding: 96px 0 0;`
const Box = styled(Container)`
  padding: 50px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 36px;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) { align-items: flex-start; flex-direction: column; }
`
const Title = styled.h2`max-width: 690px; margin-bottom: 0; font-size: clamp(1.8rem, 3.2vw, 2.7rem); line-height: 1.1; letter-spacing: -.035em; font-weight: 620;`

export function ContactCta() {
  return <Section><Box><Title>Projeniz veya seçtiğiniz kapı modeli için bizimle iletişime geçin.</Title><ButtonLink to="/iletisim">İletişim Bilgileri</ButtonLink></Box></Section>
}
