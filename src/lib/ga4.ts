/**
 * Google Analytics 4 (gtag) — 클라이언트에서만 호출.
 * `GoogleAnalytics` 컴포넌트가 같은 측정 ID로 `gtag` 를 로드한 뒤에만 동작합니다.
 *
 * @see https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead
 */

const GA_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || 'G-C0L5MZ19K0'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function isGa4Ready(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.gtag === 'function' &&
    Boolean(GA_ID)
  )
}

function toEventParams(
  params?: Record<string, string | number | boolean | undefined>,
): Record<string, unknown> | undefined {
  if (!params) return undefined
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === '') continue
    out[k] = v
  }
  return Object.keys(out).length ? out : undefined
}

/** 임의 이벤트 (GA4 관리자에서 커스텀 이벤트로 확인) */
export function trackGa4Event(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (!isGa4Ready()) return
  try {
    const p = toEventParams(params)
    if (p) window.gtag!('event', name, p)
    else window.gtag!('event', name)
  } catch {
    /* 광고 차단, CMP 등 */
  }
}

/**
 * 리드/문의 전환용 권장 이벤트.
 * Google Ads 전환 가져오기와 GA4 전환 이벤트로 `generate_lead` 를 쓸 때 활용 가능.
 */
export function trackGa4GenerateLead(params: {
  form_id: string
  form_name: string
}): void {
  trackGa4Event('generate_lead', {
    form_id: params.form_id,
    form_name: params.form_name,
  })
}
