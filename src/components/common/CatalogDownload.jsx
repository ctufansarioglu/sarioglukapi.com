import { AnchorButton } from './Button'
import { catalog } from '../../data/catalog'

export function CatalogDownload({ compact = false, ...props }) {
  return (
    <AnchorButton
      href={catalog.path}
      download={catalog.fileName}
      aria-label="Kapı modelleri kataloğunu PDF olarak indir"
      {...props}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" style={{ marginRight: 8, flexShrink: 0 }}>
        <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
      </svg>
      {compact ? 'Katalog' : 'Kataloğu İndir'}
      {!compact && <span style={{ marginLeft: 8, fontSize: '.7rem', opacity: .7 }}>PDF</span>}
    </AnchorButton>
  )
}
