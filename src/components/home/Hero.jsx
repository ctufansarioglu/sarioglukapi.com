import styled from '@emotion/styled'
import { Container } from '../common/Container'
import { ButtonLink } from '../common/Button'

import heroWorkshopImage from '../../assets/images/home/hero-workshop.webp'

const Section = styled.section`
  padding: 56px 0 72px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 40px 0 56px;
  }
`

const Grid = styled(Container)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 500px);
  gap: clamp(48px, 6vw, 80px);
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`

const Content = styled.div`
  position: relative;
  z-index: 1;
`

const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
`

const Title = styled.h1`
  max-width: 680px;
  margin-bottom: 24px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.7rem, 5vw, 4.7rem);
  line-height: 1;
  font-weight: 620;
  letter-spacing: -0.05em;
`

const Text = styled.p`
  max-width: 590px;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.02rem;
  line-height: 1.72;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const ImageWrapper = styled.div`
  width: 100%;
  min-width: 0;
  max-width: 500px;
  justify-self: end;
  overflow: hidden;
  aspect-ratio: 4 / 5;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 100%;
    justify-self: stretch;
    aspect-ratio: 16 / 10;
  }
`

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  object-fit: cover;
  object-position: center;
`

export function Hero() {
  return (
    <Section>
      <Grid>
        <Content>
          <Eyebrow>Tosya / Kastamonu</Eyebrow>

          <Title>
            Kapı üretiminde yalın tasarım, güçlü işçilik.
          </Title>

          <Text>
            Sarıoğlu Orman Ürünleri; ahşap doğrama, Amerikan panel,
            lake, melamin ve PVC kapı koleksiyonlarını üretim
            tecrübesiyle bir araya getirir.
          </Text>

          <Actions>
            <ButtonLink to="/" hash="modeller">
              Kapı Modelleri
            </ButtonLink>

            <ButtonLink to="/iletisim" variant="outline">
              İletişim
            </ButtonLink>
          </Actions>
        </Content>

        <ImageWrapper>
          <Image
            src={heroWorkshopImage}
            alt="Sarıoğlu Orman Ürünleri atölyesinde üretim aşamasındaki ahşap kapılar"
            width="1122"
            height="1402"
            fetchPriority="high"
            decoding="async"
          />
        </ImageWrapper>
      </Grid>
    </Section>
  )
}