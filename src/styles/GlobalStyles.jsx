import { Global, css } from '@emotion/react'

export function GlobalStyles() {
  return (
    <Global
      styles={(theme) => css`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background: ${theme.colors.background};
          color: ${theme.colors.text};
          font-family: ${theme.fonts.body};
          -webkit-font-smoothing: antialiased;
        }
        body, button, input, textarea { font: inherit; }
        a { color: inherit; text-decoration: none; }
        img { display: block; max-width: 100%; }
        button { cursor: pointer; }
        h1, h2, h3, p { margin-top: 0; }
        ::selection { background: ${theme.colors.primary}; color: ${theme.colors.white}; }
      `}
    />
  )
}
