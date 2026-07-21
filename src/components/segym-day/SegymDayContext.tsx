'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useModalEnterAnimation } from '@/hooks/useModalEnterAnimation'
import { SEGYM_DAY_COPY, SEGYM_DAY_HERO_IMAGE, SEGYM_DAY_HOME_POPUP_ENABLED } from '@/data/segym-day'
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

function SegymDayHomePopup({ onClose }: { onClose: () => void }) {
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
        <div className="bg-black">
          <img src={SEGYM_DAY_HERO_IMAGE} alt="SEGYM DAY" className="w-full h-auto block" />
        </div>
        <div className="p-4 sm:p-5 space-y-2">
          <p className="text-center text-xs font-semibold text-red-600 ko-modal-copy">
            선착순 20명 · 8월 10일(월) 마감
          </p>
          <Link
            href="/segym-day"
            onClick={onClose}
            className="block w-full py-3.5 rounded-xl bg-primary text-white text-center font-bold hover:bg-primary-dark transition-colors shadow-brand"
          >
            {SEGYM_DAY_COPY.applyButton}
          </Link>
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
      const dismissed = sessionStorage.getItem(SEGYM_DAY_COPY.popupStorageKey)
      if (!dismissed) setPopupOpen(true)
    } catch {
      setPopupOpen(true)
    }
  }, [pathname])

  const closePopup = useCallback(() => {
    setPopupOpen(false)
    try {
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
        <SegymDayHomePopup onClose={closePopup} />
      ) : null}
      <SegymDayAboutModal open={aboutOpen} onClose={closeAboutModal} />
    </SegymDayContext.Provider>
  )
}
