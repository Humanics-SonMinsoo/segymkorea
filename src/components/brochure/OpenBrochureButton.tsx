'use client'

import { BROCHURE_PUBLIC_ENABLED } from '@/data/brochure'
import { trackMetaCustom } from '@/lib/meta-pixel'
import { useBrochureModal } from './BrochureModalContext'
import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export function OpenBrochureButton({ onClick, type = 'button', ...rest }: Props) {
  const { openBrochureModal } = useBrochureModal()

  // 8월 실험: 한/영 소개서 받기 CTA 숨김
  if (!BROCHURE_PUBLIC_ENABLED) return null

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
