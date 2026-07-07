'use client'

import { useCallback, useMemo, useState } from 'react'
import { buildSegymDayInviteText, getSegymDayPageUrl } from '@/lib/segym-day-share'
import { getKakaoJsKey, isKakaoShareReady, shareSegymDayOnKakao } from '@/lib/kakao-share'
import { SEGYM_DAY_COPY } from '@/data/segym-day'

type Props = {
  variant?: 'page' | 'admin'
}

export function SegymDaySharePanel({ variant = 'page' }: Props) {
  const [copyState, setCopyState] = useState<'idle' | 'link' | 'invite'>('idle')
  const [shareError, setShareError] = useState<string | null>(null)

  const inviteText = useMemo(() => buildSegymDayInviteText(), [])
  const pageUrl = useMemo(() => getSegymDayPageUrl(), [])
  const hasKakaoKey = Boolean(getKakaoJsKey())
  const isAdmin = variant === 'admin'

  const flashCopy = (kind: 'link' | 'invite') => {
    setCopyState(kind)
    window.setTimeout(() => setCopyState('idle'), 2500)
  }

  const copyText = useCallback(async (text: string, kind: 'link' | 'invite') => {
    setShareError(null)
    try {
      await navigator.clipboard.writeText(text)
      flashCopy(kind)
    } catch {
      setShareError('복사에 실패했습니다. 아래 내용을 직접 선택해 복사해 주세요.')
    }
  }, [])

  const handleKakaoShare = useCallback(() => {
    setShareError(null)
    const result = shareSegymDayOnKakao()
    if (result.ok) return
    if (result.reason === 'no_key') {
      setShareError(
        '카카오 공유 키가 아직 설정되지 않았습니다. 초대 문구 복사 후 카톡에 붙여넣어 주세요. (Vercel: NEXT_PUBLIC_KAKAO_JS_KEY)',
      )
      void copyText(inviteText, 'invite')
      return
    }
    setShareError('카카오 SDK 로딩 중입니다. 잠시 후 다시 시도하거나 초대 문구를 복사해 주세요.')
  }, [copyText, inviteText])

  const handleNativeShare = useCallback(async () => {
    setShareError(null)
    if (typeof navigator.share !== 'function') {
      await copyText(inviteText, 'invite')
      setShareError('초대 문구가 복사되었습니다. 카카오톡 채팅방에 붙여넣기 해 주세요.')
      return
    }
    try {
      await navigator.share({
        title: SEGYM_DAY_COPY.shareCardTitle,
        text: inviteText,
        url: pageUrl,
      })
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') return
      await copyText(inviteText, 'invite')
    }
  }, [copyText, inviteText, pageUrl])

  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white ${
        isAdmin ? 'p-4 sm:p-5' : 'p-4 sm:p-5 shadow-sm'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div>
          <p className="text-sm font-bold text-gray-900 ko-modal-copy">
            {isAdmin ? '초대 링크 · 카카오톡 공유 (영업·마케팅용)' : '지인에게 초대하기'}
          </p>
          <p className="mt-1 text-xs sm:text-sm text-gray-600 ko-modal-copy leading-relaxed">
            {isAdmin
              ? '대표님께 SEGYM DAY 초대 카드를 카카오톡으로 보내거나, 초대 문구를 복사해 전달하세요.'
              : SEGYM_DAY_COPY.sharePanelHint}
          </p>
        </div>
        {!hasKakaoKey && isAdmin ? (
          <span className="shrink-0 inline-flex items-center rounded-md bg-amber-50 border border-amber-200 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
            카카오 JS 키 설정 시 공유 버튼 활성화
          </span>
        ) : null}
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
        <button
          type="button"
          onClick={handleKakaoShare}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#FEE500] text-[#191919] text-sm font-bold hover:brightness-95 transition-all shadow-sm"
        >
          <span aria-hidden>💬</span>
          {SEGYM_DAY_COPY.kakaoShareButton}
        </button>
        <button
          type="button"
          onClick={() => copyText(inviteText, 'invite')}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border-2 border-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          {copyState === 'invite' ? '초대 문구 복사됨 ✓' : '초대 문구 복사'}
        </button>
        <button
          type="button"
          onClick={() => copyText(pageUrl, 'link')}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border-2 border-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          {copyState === 'link' ? '링크 복사됨 ✓' : '링크만 복사'}
        </button>
        <button
          type="button"
          onClick={handleNativeShare}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border-2 border-primary/25 text-primary text-sm font-semibold hover:bg-primary-muted/30 transition-colors sm:ml-auto"
        >
          공유하기
        </button>
      </div>

      {shareError ? (
        <p className="mt-3 text-xs sm:text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 ko-modal-copy">
          {shareError}
        </p>
      ) : null}

      {isAdmin ? (
        <details className="mt-4 group">
          <summary className="text-xs font-medium text-gray-500 cursor-pointer hover:text-gray-700">
            미리보기 문구 펼치기
          </summary>
          <pre className="mt-2 text-xs text-gray-600 whitespace-pre-wrap break-words bg-gray-50 rounded-lg p-3 border border-gray-100 ko-modal-copy max-h-48 overflow-y-auto">
            {inviteText}
          </pre>
        </details>
      ) : null}

      {isAdmin && hasKakaoKey && !isKakaoShareReady() ? (
        <p className="mt-2 text-[11px] text-gray-400">카카오 SDK 로딩 중…</p>
      ) : null}
    </div>
  )
}
