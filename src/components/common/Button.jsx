import styled from '@emotion/styled'
import { Link } from '@tanstack/react-router'

const buttonStyles = ({ theme, variant = 'primary' }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 46,
  padding: '0 18px',
  borderRadius: theme.radius.pill,
  border: variant === 'outline' ? `1px solid ${theme.colors.border}` : `1px solid ${theme.colors.primaryDark}`,
  background: variant === 'outline' ? theme.colors.white : theme.colors.primaryDark,
  color: variant === 'outline' ? theme.colors.text : theme.colors.white,
  fontSize: '.9rem',
  fontWeight: 600,
  letterSpacing: '-.01em',
  transition: 'background 160ms ease, border-color 160ms ease, color 160ms ease',
  '&:hover': {
    background: variant === 'outline' ? theme.colors.surfaceMuted : theme.colors.primary,
    borderColor: variant === 'outline' ? theme.colors.text : theme.colors.primary,
  },
})

export const ButtonLink = styled(Link)(buttonStyles)
export const AnchorButton = styled.a(buttonStyles)
