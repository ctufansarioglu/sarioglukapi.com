import { Global, css } from '@emotion/react'

export function PhotoSwipeStyles() {
  return (
    <Global
      styles={css`
        .pswp__bg {
          background: #11110f;
        }

        .pswp__top-bar {
          padding: 8px 10px;
        }

        .pswp__counter {
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          opacity: 0.72;
        }

        .pswp__model-caption {
          position: absolute;
          left: 50%;
          bottom: max(22px, env(safe-area-inset-bottom));
          z-index: 20;
          display: flex;
          align-items: baseline;
          gap: 10px;
          max-width: calc(100% - 40px);
          transform: translateX(-50%);
          padding: 10px 14px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(17, 17, 15, 0.72);
          backdrop-filter: blur(10px);
          color: #fff;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          white-space: nowrap;
        }

        .pswp__model-caption strong {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .pswp__model-caption span {
          overflow: hidden;
          color: rgba(255, 255, 255, 0.68);
          font-size: 12px;
          text-overflow: ellipsis;
        }

        @media (max-width: 640px) {
          .pswp__model-caption {
            bottom: max(14px, env(safe-area-inset-bottom));
            max-width: calc(100% - 24px);
            padding: 9px 11px;
          }

          .pswp__model-caption span {
            max-width: 58vw;
          }
        }
      `}
    />
  )
}
