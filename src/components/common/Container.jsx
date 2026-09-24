import styled from '@emotion/styled'

export const Container = styled.div`
  width: min(calc(100% - 40px), ${({ theme }) => theme.container});
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: min(calc(100% - 28px), ${({ theme }) => theme.container});
  }
`
