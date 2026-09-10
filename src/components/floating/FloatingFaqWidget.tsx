'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useModalEnterAnimation } from '@/hooks/useModalEnterAnimation'

const kakaoChannelUrl = (process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ?? '').trim()

const PHONE_CONSULT = {
  title: '세짐 실시간 전화상담',
  phone: '010-9425-6745',
  detail: '(세짐 파트너팀 담당자)',
} as const

function PhoneConsultModal({ onClose }: { onClose: () => void }) {
  const entered = useModalEnterAnimation()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="phone-consult-title"
    >
      <button
        type="button"
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        className={`relative z-10 w-full max-w-sm rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden transition-[opacity,transform] duration-300 ${
          entered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.97] translate-y-3'
        }`}
      >
        <div className="bg-gradient-to-br from-primary to-primary-dark px-5 py-6 text-center text-white">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <h2 id="phone-consult-title" className="text-lg font-bold ko-modal-copy">
            {PHONE_CONSULT.title}
          </h2>
        </div>

        <div className="px-5 py-6 text-center space-y-2">
          <p className="text-2xl font-bold tracking-wide text-gray-900 tabular-nums">{PHONE_CONSULT.phone}</p>
          <p className="text-sm text-gray-600 ko-modal-copy">{PHONE_CONSULT.detail}</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-brand"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

/** FAQ 말풍선은 잠시 숨김 — 실시간 상담(카카오) + 전화상담 노출 */
export function FloatingFaqWidget() {
  const pathname = usePathname()
  const [phoneOpen, setPhoneOpen] = useState(false)

  const hideOnAdmin = pathname?.startsWith('/admin') ?? false
  const hideOnEnglish = pathname === '/en' || (pathname?.startsWith('/en/') ?? false)
  const hideOnSegymDay = pathname === '/segym-day' || (pathname?.startsWith('/segym-day/') ?? false)
  const hideOnUpdate = pathname === '/update' || (pathname?.startsWith('/update/') ?? false)

  const closePhone = useCallback(() => setPhoneOpen(false), [])

  if (hideOnAdmin || hideOnEnglish || hideOnSegymDay || hideOnUpdate) {
    return null
  }

  const showKakao = Boolean(kakaoChannelUrl)

  return (
    <>
      <div className="fixed bottom-24 right-6 z-[85] flex flex-col items-end gap-2" aria-label="상담 바로가기">
        <button
          type="button"
          onClick={() => setPhoneOpen(true)}
          aria-label="실시간 전화상담"
          className="flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2.5 sm:px-4 text-xs sm:text-sm font-bold text-white shadow-lg shadow-black/15 transition hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <svg className="h-4 w-4 sm:h-[18px] sm:w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          실시간 전화상담
        </button>

        {showKakao ? (
          <a
            href={kakaoChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="카카오톡 실시간 상담 (새 창)"
            className="flex items-center gap-1.5 rounded-full bg-[#FEE500] px-3.5 py-2.5 sm:px-4 text-xs sm:text-sm font-bold text-[#191919] shadow-lg shadow-black/15 transition hover:bg-[#fdd835] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FEE500] focus-visible:ring-offset-2"
          >
            <svg className="h-4 w-4 sm:h-[18px] sm:w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.85 5.33 4.64 6.75-.15.55-.55 2.01-.63 2.32-.1.4.15.39.31.29.13-.09 2.05-1.4 2.88-1.97.9.13 1.84.21 2.8.21 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
            </svg>
            실시간 상담
          </a>
        ) : null}
      </div>

      {phoneOpen ? <PhoneConsultModal onClose={closePhone} /> : null}
    </>
  )
}
