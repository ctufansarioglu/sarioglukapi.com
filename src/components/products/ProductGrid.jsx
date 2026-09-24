import { useRef } from 'react'
import styled from '@emotion/styled'
import { usePhotoSwipeGallery } from '../../hooks/usePhotoSwipeGallery'
import { PhotoSwipeStyles } from './PhotoSwipeStyles'
import { ProductCard } from './ProductCard'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 34px 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 26px 12px;
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`

export function ProductGrid({ products }) {
  const galleryRef = useRef(null)
  const galleryKey = products.map((product) => product.id).join('|')

  usePhotoSwipeGallery(galleryRef, galleryKey)

  return (
    <>
      <PhotoSwipeStyles />
      <Grid ref={galleryRef}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </>
  )
}
