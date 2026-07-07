/** OG·카카오 공유 등 절대 URL용. Vercel: NEXT_PUBLIC_SITE_URL=https://segymkorea.com */
export function getSiteUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin.replace(/\/$/, '')
  }
  let explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) {
    explicit = explicit.replace(/\/$/, '')
    if (!/^https?:\/\//i.test(explicit)) {
      explicit = `https://${explicit.replace(/^\/+/, '')}`
    }
    return explicit
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`
  }
  return 'http://localhost:3000'
}
