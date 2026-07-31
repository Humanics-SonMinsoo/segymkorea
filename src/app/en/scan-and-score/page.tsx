import type { Metadata } from 'next'
import { EN_META } from '@/data/en/site'
import { EnScanAndScorePage } from '@/components/en/EnScanAndScorePage'

export const metadata: Metadata = {
  title: EN_META.scanTitle,
  description: EN_META.scanDescription,
  openGraph: {
    title: EN_META.scanTitle,
    description: EN_META.scanDescription,
    locale: 'en_US',
    type: 'website',
  },
}

export default function ScanAndScoreRoute() {
  return <EnScanAndScorePage />
}
