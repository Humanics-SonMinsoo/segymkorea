import type { Metadata } from 'next'
import { EN_META } from '@/data/en/site'
import { EnHeader } from '@/components/en/EnHeader'
import { EnFooter } from '@/components/en/EnFooter'
import { EnScanScorePopup } from '@/components/en/EnScanScorePopup'

export const metadata: Metadata = {
  title: EN_META.homeTitle,
  description: EN_META.homeDescription,
  openGraph: {
    title: EN_META.homeTitle,
    description: EN_META.homeDescription,
    locale: 'en_US',
    type: 'website',
  },
}

/** Brand bar (~40px) + nav (64px) */
const EN_HEADER_OFFSET = 'pt-[6.5rem] sm:pt-[6.25rem]'

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en" className="min-h-screen">
      <EnHeader />
      <div className={EN_HEADER_OFFSET}>{children}</div>
      <EnFooter />
      <EnScanScorePopup />
    </div>
  )
}
