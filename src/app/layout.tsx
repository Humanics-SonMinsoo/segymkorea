import type { Metadata } from 'next'
import './globals.css'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import { Providers } from './providers'

/** OG/메타 절대 URL용. Vercel에서는 NEXT_PUBLIC_SITE_URL(예: https://segymkorea.com) 설정 권장 */
function getSiteUrl(): string {
  let explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) {
    explicit = explicit.replace(/\/$/, '')
    // "segymkorea.com" 처럼 프로토콜 없으면 new URL() 실패 → 레이아웃 전체가 터짐
    if (explicit && !/^https?:\/\//i.test(explicit)) {
      explicit = `https://${explicit.replace(/^\/+/, '')}`
    }
    return explicit
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`
  }
  return 'http://localhost:3000'
}

function safeMetadataBase(): URL {
  const origin = getSiteUrl()
  try {
    return new URL(origin)
  } catch {
    const fallback =
      process.env.VERCEL_URL != null
        ? `https://${String(process.env.VERCEL_URL).replace(/\/$/, '')}`
        : 'http://localhost:3000'
    return new URL(fallback)
  }
}

const siteTitle = '세짐 - AI 스마트 운동로봇 SEGYM'
const siteDescription = 'AI 스마트 운동로봇 SEGYM, 세짐으로 운동의 모든 순간을 바꾸세요.'
/** 카카오 등 링크 미리보기(OG)용 — public/images/segym_new.png */
const ogImagePath = '/images/segym_new.png'

const siteOrigin = getSiteUrl()
/** 카카오·페북 크롤러는 절대 URL을 권장. siteOrigin은 실제로 이미지가 열리는 호스트와 같아야 함 */
const ogImageAbsoluteUrl = `${siteOrigin}${ogImagePath}`

/**
 * 네이버 서치어드바이저 — 메타 `content` 값.
 * Vercel에 `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` 이 있으면 그걸 우선(교체 시 유용).
 */
const naverSiteVerification =
  process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION?.trim() ||
  '0317053086827c712462cc69590af1a362b9654b'

export const metadata: Metadata = {
  metadataBase: safeMetadataBase(),
  title: siteTitle,
  description: siteDescription,
  verification: {
    other: { 'naver-site-verification': naverSiteVerification },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    locale: 'ko_KR',
    url: siteOrigin,
    images: [
      {
        url: ogImageAbsoluteUrl,
        width: 1200,
        height: 630,
        alt: '세짐 SEGYM 스미스 로봇',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImageAbsoluteUrl],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <GoogleAnalytics />
        <MetaPixel />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
