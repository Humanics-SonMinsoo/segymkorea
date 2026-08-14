'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useModalEnterAnimation } from '@/hooks/useModalEnterAnimation'
import {
  SEGYM_DAY_COPY,
  SEGYM_DAY_HOME_POPUP_ENABLED,
  SEGYM_DAY_POPUP_IMAGE,
} from '@/data/segym-day'
import { SegymDayAboutModal } from '@/components/segym-day/SegymDayAboutModal'

type SegymDayContextValue = {
  openAboutModal: () => void
  closeAboutModal: () => void
}

const SegymDayContext = createContext<SegymDayContextValue | null>(null)

export function useSegymDayModal() {
  const ctx = useContext(SegymDayContext)
  if (!ctx) {
    throw new Error('useSegymDayModal은 SegymDayProvider 안에서만 사용할 수 있습니다.')
  }
  return ctx
}

function todayKey() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function SegymDayHomePopup({
  onClose,
  onHideToday,
}: {
  onClose: () => void
  onHideToday: () => void
}) {
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
    <div className="fixed inset-0 z-[105] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <button
        type="button"
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="닫기"
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
          aria-label="팝업 닫기"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-neutral-950">
          <img src={SEGYM_DAY_POPUP_IMAGE} alt="부산 건담짐 SEGYM DAY" className="w-full h-auto block" />
        </div>

        <div className="p-4 sm:p-5 space-y-3">
          <div className="text-center space-y-1.5">
            <p className="text-base sm:text-lg font-bold text-gray-900 ko-modal-copy leading-snug">
              {SEGYM_DAY_COPY.popupHeadline}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 ko-modal-copy leading-relaxed">
              {SEGYM_DAY_COPY.popupSubline}
            </p>
            <p className="text-xs font-semibold text-red-600 ko-modal-copy">
              신청 마감 {SEGYM_DAY_COPY.deadlineLabel}
            </p>
          </div>

          <Link
            href="/segym-day"
            onClick={onClose}
            className="block w-full py-3.5 rounded-xl bg-primary text-white text-center font-bold hover:bg-primary-dark transition-colors shadow-brand"
          >
            {SEGYM_DAY_COPY.applyButton}
          </Link>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {SEGYM_DAY_COPY.popupClose}
            </button>
            <button
              type="button"
              onClick={onHideToday}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors"
            >
              {SEGYM_DAY_COPY.popupHideToday}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SegymDayProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [aboutOpen, setAboutOpen] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    if (!SEGYM_DAY_HOME_POPUP_ENABLED) return
    if (pathname !== '/') return

    try {
      if (localStorage.getItem(SEGYM_DAY_COPY.popupHideTodayKey) === todayKey()) return
      if (sessionStorage.getItem(SEGYM_DAY_COPY.popupStorageKey) === '1') return
    } catch {
      /* ignore */
    }
    setPopupOpen(true)
  }, [pathname])

  const closePopup = useCallback(() => {
    setPopupOpen(false)
    try {
      sessionStorage.setItem(SEGYM_DAY_COPY.popupStorageKey, '1')
    } catch {
      /* ignore */
    }
  }, [])

  const hideToday = useCallback(() => {
    setPopupOpen(false)
    try {
      localStorage.setItem(SEGYM_DAY_COPY.popupHideTodayKey, todayKey())
      sessionStorage.setItem(SEGYM_DAY_COPY.popupStorageKey, '1')
    } catch {
      /* ignore */
    }
  }, [])

  const openAboutModal = useCallback(() => setAboutOpen(true), [])
  const closeAboutModal = useCallback(() => setAboutOpen(false), [])

  return (
    <SegymDayContext.Provider value={{ openAboutModal, closeAboutModal }}>
      {children}
      {SEGYM_DAY_HOME_POPUP_ENABLED && popupOpen && pathname === '/' ? (
        <SegymDayHomePopup onClose={closePopup} onHideToday={hideToday} />
      ) : null}
      <SegymDayAboutModal open={aboutOpen} onClose={closeAboutModal} />
    </SegymDayContext.Provider>
  )
}
