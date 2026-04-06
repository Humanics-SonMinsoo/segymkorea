'use client'

import { BrochureModalProvider } from '@/components/brochure/BrochureModalContext'
import { FloatingFaqWidget } from '@/components/floating/FloatingFaqWidget'
import { InquiryModalProvider } from '@/components/inquiry/InquiryModalContext'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <InquiryModalProvider>
      <BrochureModalProvider>
        {children}
        <FloatingFaqWidget />
      </BrochureModalProvider>
    </InquiryModalProvider>
  )
}
