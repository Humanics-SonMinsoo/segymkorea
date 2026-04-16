'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

/** 환경 변수 우선. 비우면 아래 발급 ID 사용 (운영은 Vercel에 `NEXT_PUBLIC_GA_MEASUREMENT_ID` 설정 권장) */
const GA_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || 'G-C0L5MZ19K0'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/** App Router 클라이언트 전환마다 page_view 전송 (초기 1회 포함) */
function GoogleAnalyticsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== 'function') return
    const q = searchParams?.toString()
    const page_path = pathname + (q ? `?${q}` : '')
    window.gtag('event', 'page_view', {
      page_path,
      page_location: `${window.location.origin}${page_path}`,
      page_title: document.title,
    })
  }, [pathname, searchParams])

  return null
}

/**
 * Google Analytics 4 (gtag.js)
 * 기본 측정 ID: `G-C0L5MZ19K0`. 바꿀 때는 `NEXT_PUBLIC_GA_MEASUREMENT_ID` 로 덮어쓰면 됩니다.
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsInner />
      </Suspense>
    </>
  )
}
