'use client'

import { BrochureModalProvider } from '@/components/brochure/BrochureModalContext'
import { FloatingFaqWidget } from '@/components/floating/FloatingFaqWidget'
import { InquiryModalProvider } from '@/components/inquiry/InquiryModalContext'
import { SegymDayProvider } from '@/components/segym-day/SegymDayContext'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <InquiryModalProvider>
      <BrochureModalProvider>
        <SegymDayProvider>
          {children}
          <FloatingFaqWidget />
        </SegymDayProvider>
      </BrochureModalProvider>
    </InquiryModalProvider>
  )
}
