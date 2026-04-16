'use client'

import { trackMetaCustom } from '@/lib/meta-pixel'
import { useBrochureModal } from './BrochureModalContext'
import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export function OpenBrochureButton({ onClick, type = 'button', ...rest }: Props) {
  const { openBrochureModal } = useBrochureModal()

  return (
    <button
      type={type}
      {...rest}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) {
          trackMetaCustom('OpenBrochureModal', { placement: 'cta' })
          openBrochureModal()
        }
      }}
    />
  )
}
