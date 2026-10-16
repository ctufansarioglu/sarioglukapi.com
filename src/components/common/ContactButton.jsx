import { useEffect, useId, useRef, useState } from 'react'
import styled from '@emotion/styled'

const phoneNumber = '+905333610068'

const Trigger = styled.button`
  position: fixed;
  right: max(24px, calc(env(safe-area-inset-right) + 16px));
  bottom: max(24px, calc(env(safe-area-inset-bottom) + 16px));
  z-index: 40;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, .22);
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 6px 24px rgba(23, 28, 25, .2), 0 0 0 4px rgba(255, 255, 255, .8);
  transition: transform 180ms ease, background 180ms ease;

  @media (hover: hover) {
    &:hover { transform: translateY(-2px); background: ${({ theme }) => theme.colors.primaryDark}; }
  }
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.text}; outline-offset: 6px; }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: max(18px, calc(env(safe-area-inset-right) + 14px));
    bottom: max(18px, calc(env(safe-area-inset-bottom) + 14px));
    width: 52px;
    height: 52px;
  }
  @media (prefers-reduced-motion: reduce) { transition: none; }
`

const Dialog = styled.dialog`
  position: fixed;
  inset: 0;
  width: min(440px, calc(100% - 32px));
  max-height: calc(100dvh - 32px);
  margin: auto;
  padding: 32px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.body};
  box-shadow: 0 24px 80px rgba(0, 0, 0, .18);

  &::backdrop { background: rgba(23, 28, 25, .46); backdrop-filter: blur(4px); }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    inset: auto 0 max(16px, env(safe-area-inset-bottom));
    max-height: calc(100dvh - 48px - env(safe-area-inset-bottom));
    margin: 0 auto;
    padding: 28px 22px 22px;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.textMuted};
  background: transparent;
  &:hover { background: ${({ theme }) => theme.colors.surfaceMuted}; }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.primary}; outline-offset: 2px; }
`

const Kicker = styled.p`
  margin: 0 44px 16px 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: .68rem;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
`

const Title = styled.h2`
  margin: 0 0 12px;
  max-width: 320px;
  font-size: clamp(1.5rem, 5vw, 1.8rem);
  font-weight: 650;
  letter-spacing: -.045em;
  line-height: 1.18;
`

const Description = styled.p`
  margin: 0 0 26px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: .88rem;
  line-height: 1.7;
`

const Options = styled.div`display: grid; gap: 12px;`

const Option = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 84px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  transition: border-color 160ms ease, background 160ms ease;
  &:hover { border-color: ${({ theme }) => theme.colors.primary}; background: ${({ theme }) => theme.colors.surfaceMuted}; }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.primary}; outline-offset: 3px; }
  & > svg:last-child { margin-left: auto; flex-shrink: 0; color: ${({ theme }) => theme.colors.textMuted}; }
  @media (prefers-reduced-motion: reduce) { transition: none; }
`

const IconBox = styled.span`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`

const Label = styled.span`
  display: grid;
  gap: 6px;
  strong { font-size: .92rem; font-weight: 650; line-height: 1.3; }
  span { font-size: .76rem; line-height: 1.5; color: ${({ theme }) => theme.colors.textMuted}; }
`

const Signature = styled.p`
  margin: 24px 0 0;
  padding-top: 18px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: .7rem;
  letter-spacing: .02em;
`

function Icon({ name, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === 'message' && <><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9.2 9.2 0 0 1-4-.9L3 21l1.9-5.5a9.2 9.2 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5Z" /><path d="M8 10h9M8 14h5" /></>}
      {name === 'whatsapp' && <><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 21l1.7-5a8.5 8.5 0 1 1 15.8-4.3Z" /><path d="m9 7-1 1c-.6 2.7 3.3 6.6 6 6l1-1-2-1-.7.7a6.1 6.1 0 0 1-2-2L11 10 9 7Z" /></>}
      {name === 'phone' && <path d="m7 3 3 5-2 2a15 15 0 0 0 6 6l2-2 5 3v3a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3Z" />}
      {name === 'close' && <path d="m6 6 12 12M18 6 6 18" />}
      {name === 'arrow' && <path d="M5 12h14m-5-5 5 5-5 5" />}
    </svg>
  )
}

export function ContactButton() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef(null)
  const id = useId()

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [open])

  const close = () => dialogRef.current?.close()
  const show = () => {
    dialogRef.current.showModal()
    setOpen(true)
  }
  const dismissBackdrop = (event) => {
    if (event.target !== event.currentTarget) return
    const rect = event.currentTarget.getBoundingClientRect()
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close()
  }
  const keepFocusInDialog = (event) => {
    if (event.key !== 'Tab') return
    const controls = event.currentTarget.querySelectorAll('button:not(:disabled), a[href]')
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <>
      <Trigger type="button" aria-label="İletişim seçeneklerini aç" aria-haspopup="dialog" aria-controls={id} aria-expanded={open} title="Bizimle iletişime geçin" onClick={show}>
        <Icon name="message" size={26} />
      </Trigger>
      <Dialog ref={dialogRef} id={id} aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} onClose={() => setOpen(false)} onClick={dismissBackdrop} onKeyDown={keepFocusInDialog}>
        <CloseButton type="button" aria-label="İletişim penceresini kapat" onClick={close}><Icon name="close" size={20} /></CloseButton>
        <Kicker>Bizimle iletişime geçin</Kicker>
        <Title id={`${id}-title`}>Nasıl iletişim kurmak istersiniz?</Title>
        <Description id={`${id}-description`}>Kapı modelleri ve talepleriniz için bize ulaşın.</Description>
        <Options>
          <Option href={`https://wa.me/${phoneNumber.slice(1)}`} target="_blank" rel="noopener noreferrer" onClick={close}>
            <IconBox><Icon name="whatsapp" /></IconBox>
            <Label><strong>WhatsApp’tan yazın</strong><span>Mesaj göndererek iletişime geçin.</span></Label>
            <Icon name="arrow" size={18} />
          </Option>
          <Option href={`tel:${phoneNumber}`} onClick={close}>
            <IconBox><Icon name="phone" /></IconBox>
            <Label><strong>Telefonla arayın</strong><span>0533 361 00 68 · Cemil Sarıoğlu</span></Label>
            <Icon name="arrow" size={18} />
          </Option>
        </Options>
        <Signature>Sarıoğlu Orman Ürünleri</Signature>
      </Dialog>
    </>
  )
}
