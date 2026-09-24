import styled from '@emotion/styled'
import { Link } from '@tanstack/react-router'
import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'
import { categories } from '../../data/categories'
import { homeCategoryImages } from '../../data/homeCategoryImages'

const Section = styled.section`
  padding: 84px 0 96px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 68px 0 76px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 56px 0 64px;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 30px 18px;
`

const Card = styled(Link)`
  min-width: 0;
  grid-column: span 4;
  display: grid;
  gap: 14px;

  &:nth-of-type(1),
  &:nth-of-type(2) {
    grid-column: span 6;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: span 6 !important;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: span 12 !important;
  }

  @media (hover: hover) {
    &:hover img {
      transform: scale(1.015);
    }
  }
`

const ImageWrap = styled.div`
  width: 100%;
  min-width: 0;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    aspect-ratio: 5 / 6;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    aspect-ratio: 4 / 3;
  }
`

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  object-fit: cover;
  object-position: ${({ $position }) => $position};
  transition: transform 240ms ease;
`

const Content = styled.div`
  min-width: 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 18px;
  padding-right: 2px;
`

const Name = styled.h3`
  min-width: 0;
  margin: 0;
  font-size: 1.02rem;
  font-weight: 650;
  letter-spacing: -0.015em;
`

const Meta = styled.span`
  flex-shrink: 0;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.82rem;
`

export function CategoryShowcase() {
  return (
    <Section id="modeller">
      <Container>
        <SectionHeading
          eyebrow="Koleksiyon"
          title="Kapı modelleri"
          description="Beş ana kategoride yer alan kapı koleksiyonlarını inceleyin."
        />

        <Grid>
          {categories.map((category) => {
            const image = homeCategoryImages[category.slug]

            return (
              <Card key={category.slug} to={`/${category.slug}`}>
                <ImageWrap>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    $position={image.position}
                    loading="lazy"
                    decoding="async"
                  />
                </ImageWrap>

                <Content>
                  <Name>{category.name}</Name>
                  <Meta>{category.count} model</Meta>
                </Content>
              </Card>
            )
          })}
        </Grid>
      </Container>
    </Section>
  )
}
