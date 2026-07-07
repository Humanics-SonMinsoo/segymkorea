import { getSegymDayKakaoFeed } from '@/lib/segym-day-share'

const KAKAO_SDK_SRC = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js'
const KAKAO_SCRIPT_ID = 'kakao-js-sdk'

export function getKakaoJsKey(): string {
  return process.env.NEXT_PUBLIC_KAKAO_JS_KEY?.trim() ?? ''
}

export function isKakaoShareReady(): boolean {
  if (typeof window === 'undefined') return false
  const Kakao = window.Kakao
  return Boolean(getKakaoJsKey() && Kakao?.isInitialized?.() && Kakao.Share)
}

function loadKakaoScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('no window'))
  }
  if (window.Kakao) {
    return Promise.resolve()
  }

  const existing = document.getElementById(KAKAO_SCRIPT_ID) as HTMLScriptElement | null
  if (existing) {
    if (existing.dataset.loaded === 'true' && window.Kakao) {
      return Promise.resolve()
    }
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('kakao script error')), { once: true })
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = KAKAO_SCRIPT_ID
    script.src = KAKAO_SDK_SRC
    script.async = true
    script.onload = () => {
      script.dataset.loaded = 'true'
      resolve()
    }
    script.onerror = () => reject(new Error('kakao script error'))
    document.head.appendChild(script)
  })
}

let ensurePromise: Promise<'ready' | 'no_key' | 'load_failed' | 'init_failed'> | null = null

/** 카카오 SDK 로드 + init (공유 버튼 클릭 시 재시도) */
export async function ensureKakaoShareReady(): Promise<
  'ready' | 'no_key' | 'load_failed' | 'init_failed'
> {
  const key = getKakaoJsKey()
  if (!key) return 'no_key'

  if (isKakaoShareReady()) return 'ready'

  if (!ensurePromise) {
    ensurePromise = (async () => {
      try {
        await loadKakaoScript()
        if (!window.Kakao) return 'load_failed'
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(key)
        }
        if (!window.Kakao.isInitialized() || !window.Kakao.Share) {
          return 'init_failed'
        }
        return 'ready'
      } catch {
        return 'load_failed'
      } finally {
        ensurePromise = null
      }
    })()
  }

  return ensurePromise
}

export async function shareSegymDayOnKakaoAsync(): Promise<
  { ok: true } | { ok: false; reason: 'no_key' | 'load_failed' | 'init_failed' }
> {
  const status = await ensureKakaoShareReady()
  if (status !== 'ready' || !window.Kakao?.Share) {
    const reason = status === 'no_key' ? 'no_key' : status === 'init_failed' ? 'init_failed' : 'load_failed'
    return { ok: false, reason }
  }

  const feed = getSegymDayKakaoFeed()
  const link = { mobileWebUrl: feed.pageUrl, webUrl: feed.pageUrl }

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: feed.title,
      description: feed.description,
      imageUrl: feed.imageUrl,
      link,
    },
    buttons: [{ title: feed.buttonTitle, link }],
  })

  return { ok: true }
}

/** @deprecated 동기 호출 — ensureKakaoShareReady 사용 권장 */
export function shareSegymDayOnKakao(): { ok: true } | { ok: false; reason: 'no_key' | 'not_ready' } {
  if (!getKakaoJsKey()) {
    return { ok: false, reason: 'no_key' }
  }
  if (!isKakaoShareReady() || !window.Kakao?.Share) {
    return { ok: false, reason: 'not_ready' }
  }

  const feed = getSegymDayKakaoFeed()
  const link = { mobileWebUrl: feed.pageUrl, webUrl: feed.pageUrl }

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: feed.title,
      description: feed.description,
      imageUrl: feed.imageUrl,
      link,
    },
    buttons: [{ title: feed.buttonTitle, link }],
  })

  return { ok: true }
}
