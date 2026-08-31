'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { EN_NAV, EN_SCAN_SCORE_POPUP } from '@/data/en/site'
import { useModalEnterAnimation } from '@/hooks/useModalEnterAnimation'

function todayKey() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function EnScanScoreHomePopup({
  onClose,
  onHideToday,
}: {
  onClose: () => void
  onHideToday: () => void
}) {
  const entered = useModalEnterAnimation()
  const C = EN_SCAN_SCORE_POPUP

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
    <div className="fixed inset-0 z-[105] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <button
        type="button"
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label={C.popupClose}
        onClick={onClose}
      />
      <div
        className={`relative z-10 w-full max-w-md sm:max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden transition-[opacity,transform] duration-300 ${
          entered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.97] translate-y-3'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/50 text-white p-2 hover:bg-black/70 transition-colors"
          aria-label={C.popupClose}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-neutral-950">
          <img
            src="/images/scan-score/launch-hero.png"
            alt="SEGYM Scan and Score feature launch"
            className="w-full h-auto block"
          />
        </div>

        <div className="p-4 sm:p-5 space-y-3">
          <div className="text-center space-y-1.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{C.eyebrow}</p>
            <p className="text-base sm:text-lg font-bold text-gray-900 leading-snug">{C.headline}</p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{C.subline}</p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/en/scan-and-score"
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center rounded-xl bg-brand-teal px-3 py-3 text-sm font-bold text-white hover:bg-brand-teal-dark transition-colors"
            >
              {C.learnMore}
            </Link>
            <OpenInquiryButton
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              {EN_NAV.inquire}
            </OpenInquiryButton>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {C.popupClose}
            </button>
            <button
              type="button"
              onClick={onHideToday}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors"
            >
              {C.popupHideToday}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EnScanScoreBanner() {
  const pathname = usePathname()
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    if (!pathname?.startsWith('/en')) return
    if (pathname.startsWith('/en/scan-and-score')) return

    try {
      if (localStorage.getItem(EN_SCAN_SCORE_POPUP.popupHideTodayKey) === todayKey()) return
      if (sessionStorage.getItem(EN_SCAN_SCORE_POPUP.popupStorageKey) === '1') return
    } catch {
      /* ignore */
    }
    setPopupOpen(true)
  }, [pathname])

  const closePopup = useCallback(() => {
    setPopupOpen(false)
    try {
      sessionStorage.setItem(EN_SCAN_SCORE_POPUP.popupStorageKey, '1')
    } catch {
      /* ignore */
    }
  }, [])

  const hideToday = useCallback(() => {
    setPopupOpen(false)
    try {
      localStorage.setItem(EN_SCAN_SCORE_POPUP.popupHideTodayKey, todayKey())
      sessionStorage.setItem(EN_SCAN_SCORE_POPUP.popupStorageKey, '1')
    } catch {
      /* ignore */
    }
  }, [])

  if (!popupOpen) return null

  return <EnScanScoreHomePopup onClose={closePopup} onHideToday={hideToday} />
}
