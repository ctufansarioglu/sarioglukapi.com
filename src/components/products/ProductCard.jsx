import styled from '@emotion/styled'

const Card = styled.article`
  min-width: 0;
  display: grid;
  gap: 12px;
`

const ImageLink = styled.a`
  position: relative;
  display: block;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: #efefec;
  cursor: zoom-in;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.text};
    outline-offset: 3px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover img {
      transform: scale(1.018);
    }
  }
`

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform 240ms ease;
`

const MissingImage = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 24px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-align: center;
`

const Meta = styled.div`
  min-width: 0;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: baseline;
`

const Name = styled.h3`
  min-width: 0;
  margin: 0;
  font-size: 0.9rem;
  font-weight: 620;
  letter-spacing: -0.01em;
`

const Code = styled.span`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.72rem;
  letter-spacing: 0.03em;
`

export function ProductCard({ product }) {
  const handleImageLoad = (event) => {
    const image = event.currentTarget
    const link = image.closest('[data-pswp-item]')

    if (!link) return

    link.dataset.pswpWidth = image.naturalWidth
    link.dataset.pswpHeight = image.naturalHeight
  }

  return (
    <Card>
      {product.image ? (
        <ImageLink
          href={product.image}
          data-pswp-item
          data-pswp-width="1"
          data-pswp-height="1"
          data-model-code={product.id}
          data-model-name={product.name}
          aria-label={`${product.id} kodlu ${product.name} modelini büyüt`}
        >
          <Image
            src={product.image}
            alt={`${product.name} modeli`}
            loading="lazy"
            decoding="async"
            onLoad={handleImageLoad}
          />
        </ImageLink>
      ) : (
        <ImageLink as="div">
          <MissingImage>Görsel eklenecek</MissingImage>
        </ImageLink>
      )}

      <Meta>
        <Name>{product.name}</Name>
        <Code>{product.id}</Code>
      </Meta>
    </Card>
  )
}