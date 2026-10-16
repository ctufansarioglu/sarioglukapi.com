import { useEffect } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

export function usePhotoSwipeGallery(galleryRef, dependencyKey) {
  useEffect(() => {
    const gallery = galleryRef.current

    if (!gallery) return undefined

    // Cached images can finish loading before React hydrates their onLoad handler.
    const updateSize = (image) => {
      if (!image.naturalWidth || !image.naturalHeight) return
      const link = image.closest('[data-pswp-item]')
      if (!link) return
      link.dataset.pswpWidth = image.naturalWidth
      link.dataset.pswpHeight = image.naturalHeight
    }
    gallery.querySelectorAll('img').forEach(updateSize)

    const lightbox = new PhotoSwipeLightbox({
      gallery,
      children: 'a[data-pswp-item]',
      pswpModule: () => import('photoswipe'),
      bgOpacity: 0.94,
      wheelToZoom: true,
      paddingFn: () => ({ top: 56, bottom: 88, left: 24, right: 24 }),
    })

    lightbox.addFilter('itemData', (itemData) => {
      const image = itemData.element?.querySelector('img')
      if (image?.naturalWidth && image.naturalHeight) {
        itemData.width = image.naturalWidth
        itemData.height = image.naturalHeight
      }
      return itemData
    })

    lightbox.on('uiRegister', () => {
      lightbox.pswp.ui.registerElement({
        name: 'model-caption',
        className: 'pswp__model-caption',
        order: 9,
        isButton: false,
        appendTo: 'root',
        onInit: (element, pswp) => {
          const updateCaption = () => {
            const slideElement = pswp.currSlide?.data?.element
            const code = slideElement?.dataset?.modelCode ?? ''
            const name = slideElement?.dataset?.modelName ?? ''

            element.replaceChildren()

            if (!code && !name) return

            const codeElement = document.createElement('strong')
            codeElement.textContent = code
            element.appendChild(codeElement)

            if (name) {
              const nameElement = document.createElement('span')
              nameElement.textContent = name
              element.appendChild(nameElement)
            }
          }

          pswp.on('change', updateCaption)
          updateCaption()
        },
      })
    })

    lightbox.init()

    return () => {
      lightbox.destroy()
    }
  }, [galleryRef, dependencyKey])
}
