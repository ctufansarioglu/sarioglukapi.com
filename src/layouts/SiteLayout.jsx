import styled from '@emotion/styled'
import { Outlet } from '@tanstack/react-router'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

const Page = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1 0 auto;
  min-width: 0;
`

export function SiteLayout() {
  return (
    <Page>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Page>
  )
}
