'use client'

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
        if (!e.defaultPrevented) openInquiryModal()
      }}
    />
  )
}
