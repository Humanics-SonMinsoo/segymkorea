import { getSegymDayKakaoFeed } from '@/lib/segym-day-share'

export function getKakaoJsKey(): string {
  return process.env.NEXT_PUBLIC_KAKAO_JS_KEY?.trim() ?? ''
}

export function isKakaoShareReady(): boolean {
  if (typeof window === 'undefined') return false
  const Kakao = window.Kakao
  return Boolean(getKakaoJsKey() && Kakao?.isInitialized?.())
}

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
