import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

/** OG/메타 절대 URL용. Vercel에서는 NEXT_PUBLIC_SITE_URL(예: https://segymkorea.com) 설정 권장 */
function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) {
    return explicit.replace(/\/$/, '')
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`
  }
  return 'http://localhost:3000'
}

const siteTitle = '세짐 - AI 스마트 운동로봇 SEGYM'
const siteDescription = 'AI 스마트 운동로봇 SEGYM, 세짐으로 운동의 모든 순간을 바꾸세요.'
/** 카카오 등 링크 미리보기(OG)용 — public/images/segym_new.png */
const ogImagePath = '/images/segym_new.png'

const siteOrigin = getSiteUrl()
/** 카카오·페북 크롤러는 절대 URL을 권장. siteOrigin은 실제로 이미지가 열리는 호스트와 같아야 함 */
const ogImageAbsoluteUrl = `${siteOrigin}${ogImagePath}`

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: siteTitle,
  description: siteDescription,
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
