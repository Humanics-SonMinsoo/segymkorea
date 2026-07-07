/** OG·카카오 공유 등 절대 URL용. Vercel: NEXT_PUBLIC_SITE_URL=https://segymkorea.com */
export function getSiteUrl(): string {
  let explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) {
    explicit = explicit.replace(/\/$/, '')
    if (!/^https?:\/\//i.test(explicit)) {
      explicit = `https://${explicit.replace(/^\/+/, '')}`
    }
    return explicit
  }
  if (typeof window !== 'undefined') {
    return window.location.origin.replace(/\/$/, '')
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`
  }
  return 'http://localhost:3000'
}

/** 카카오 공유·OG 링크용 — 등록 도메인과 항상 일치 (운영: segymkorea.com) */
export function getKakaoShareOrigin(): string {
  const site = getSiteUrl()
  if (site.includes('localhost') || site.includes('127.0.0.1')) {
    return site
  }
  if (site.includes('vercel.app')) {
    return site
  }
  return 'https://segymkorea.com'
}
