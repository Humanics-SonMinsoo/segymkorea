'use client'

import { usePathname } from 'next/navigation'

const kakaoChannelUrl = (process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ?? '').trim()

/** FAQ 말풍선은 잠시 숨김 — 실시간 상담(카카오)만 노출 */
export function FloatingFaqWidget() {
  const pathname = usePathname()

  const hideOnAdmin = pathname?.startsWith('/admin') ?? false
  const hideOnEnglish = pathname === '/en' || (pathname?.startsWith('/en/') ?? false)
  const hideOnSegymDay = pathname === '/segym-day' || (pathname?.startsWith('/segym-day/') ?? false)
  const hideOnUpdate = pathname === '/update' || (pathname?.startsWith('/update/') ?? false)

  if (hideOnAdmin || hideOnEnglish || hideOnSegymDay || hideOnUpdate) {
    return null
  }

  if (!kakaoChannelUrl) return null

  return (
    <div className="fixed bottom-24 right-6 z-[85] flex flex-col items-end gap-2" aria-label="실시간 상담">
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
    </div>
  )
}
