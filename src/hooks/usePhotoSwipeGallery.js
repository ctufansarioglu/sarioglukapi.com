import { useEffect } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

export function usePhotoSwipeGallery(galleryRef, dependencyKey) {
  useEffect(() => {
    const gallery = galleryRef.current

    if (!gallery) return undefined

    const lightbox = new PhotoSwipeLightbox({
      gallery,
      children: 'a[data-pswp-item]',
      pswpModule: () => import('photoswipe'),
      bgOpacity: 0.94,
      wheelToZoom: true,
      paddingFn: () => ({ top: 56, bottom: 88, left: 24, right: 24 }),
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
