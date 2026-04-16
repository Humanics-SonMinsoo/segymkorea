'use client'

import { trackMetaCustom } from '@/lib/meta-pixel'
import { useInquiryModal } from './InquiryModalContext'
import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export function OpenInquiryButton({ onClick, type = 'button', ...rest }: Props) {
  const { openInquiryModal } = useInquiryModal()

  return (
    <button
      type={type}
      {...rest}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) {
          trackMetaCustom('OpenInquiryModal', { placement: 'cta' })
          openInquiryModal()
        }
      }}
    />
  )
}
