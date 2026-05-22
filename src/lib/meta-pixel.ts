/**
 * Meta 픽셀 — 클라이언트에서만 호출 (NEXT_PUBLIC_META_PIXEL_ID 가 있을 때 layout 에서 fbq 로드됨)
 * @see https://developers.facebook.com/docs/meta-pixel/reference
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function isMetaPixelReady(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function'
}

function toParamObject(params?: Record<string, string | number | boolean | undefined>): Record<string, unknown> | undefined {
  if (!params) return undefined
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === '') continue
    out[k] = v
  }
  return Object.keys(out).length ? out : undefined
}

/** 표준 이벤트 (이벤트 관리자에서 그대로 보임) */
export function trackMetaStandard(
  event: 'Lead' | 'ViewContent' | 'Contact' | 'CompleteRegistration' | 'SubmitApplication',
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (!isMetaPixelReady()) return
  try {
    const p = toParamObject(params)
    if (p) window.fbq!('track', event, p)
    else window.fbq!('track', event)
  } catch {
    /* 픽셀 차단, 광고차단 등 */
  }
}

/** 커스텀 이벤트 — 광고 세트에서 “커스텀 전환”으로 선택 가능 */
export function trackMetaCustom(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (!isMetaPixelReady()) return
  try {
    window.fbq!('trackCustom', name, toParamObject(params) ?? {})
  } catch {
    /* ignore */
  }
}
