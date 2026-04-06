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

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: '세짐 - AI 스마트 운동로봇 SEGYM',
  description: 'AI 스마트 운동로봇 SEGYM, 세짐으로 운동의 모든 순간을 바꾸세요.',
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
