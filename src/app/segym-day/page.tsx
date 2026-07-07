import type { Metadata } from 'next'
import { SiteSubPage } from '@/components/layout/SiteSubPage'
import { SegymDayApplyContent } from '@/components/segym-day/SegymDayApplyContent'
import { SEGYM_DAY_COPY, SEGYM_DAY_HERO_IMAGE } from '@/data/segym-day'
import { getSiteUrl } from '@/lib/site-url'
import { SEGYM_DAY_PATH } from '@/lib/segym-day-share'

const siteOrigin = getSiteUrl()
const ogImage = `${siteOrigin}${SEGYM_DAY_HERO_IMAGE}`

export const metadata: Metadata = {
  title: `${SEGYM_DAY_COPY.pageTitle} | 세짐 SEGYM`,
  description: SEGYM_DAY_COPY.shareOgDescription,
  openGraph: {
    title: SEGYM_DAY_COPY.shareCardTitle,
    description: SEGYM_DAY_COPY.shareOgDescription,
    url: `${siteOrigin}${SEGYM_DAY_PATH}`,
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'SEGYM DAY',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEGYM_DAY_COPY.shareCardTitle,
    description: SEGYM_DAY_COPY.shareOgDescription,
    images: [ogImage],
  },
}

export default function SegymDayPage() {
  return (
    <SiteSubPage
      variant="light"
      contentMaxWidth="wide"
      title={SEGYM_DAY_COPY.pageTitle}
      description={SEGYM_DAY_COPY.pageDescription}
    >
      <div className="mb-8 -mt-2 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <img src={SEGYM_DAY_HERO_IMAGE} alt="SEGYM DAY" className="w-full h-auto block" />
      </div>
      <SegymDayApplyContent />
    </SiteSubPage>
  )
}
