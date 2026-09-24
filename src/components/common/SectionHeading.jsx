import styled from '@emotion/styled'

const Wrapper = styled.div`
  max-width: 660px;
  margin-bottom: 42px;
`
const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .11em;
  text-transform: uppercase;
`
const Title = styled.h2`
  margin-bottom: 14px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.9rem, 3vw, 2.7rem);
  line-height: 1.08;
  letter-spacing: -.035em;
  font-weight: 620;
`
const Description = styled.p`
  margin-bottom: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  line-height: 1.7;
`

export function SectionHeading({ eyebrow, title, description }) {
  return <Wrapper>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<Title>{title}</Title>{description && <Description>{description}</Description>}</Wrapper>
}
