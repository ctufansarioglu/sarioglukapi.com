import styled from '@emotion/styled'
import { Container } from './Container'
import { ButtonLink } from './Button'

const Section = styled.section`padding: 76px 0;`
const Title = styled.h1`font-size: clamp(2.5rem, 5vw, 4.4rem); letter-spacing: -.05em;`

export function NotFoundPage() {
  return <Section><Container><Title>Sayfa bulunamadı.</Title><p>Aradığınız sayfa mevcut değil. Kapı koleksiyonlarımızı ana sayfadan inceleyebilirsiniz.</p><ButtonLink to="/">Ana sayfaya dön</ButtonLink></Container></Section>
}
