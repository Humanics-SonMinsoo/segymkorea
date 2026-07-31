'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useModalEnterAnimation } from '@/hooks/useModalEnterAnimation'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'

const STORAGE_KEY = 'segym-en-scan-score-popup-dismissed-v1'

function ScanScorePopupDialog({ onClose }: { onClose: () => void }) {
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
        className={`absolute inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity duration-300 ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Close"
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
          aria-label="Close popup"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-neutral-950 px-5 pt-6 pb-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-light mb-2">Coming soon</p>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            SEGYM Scan &amp; Score
          </h2>
          <p className="mt-2 text-sm text-neutral-300 leading-relaxed max-w-sm mx-auto">
            Measure athletic ability through guided tests — then see the result as a clear score.
          </p>
        </div>

        <div className="bg-neutral-100 px-6 py-5 flex justify-center">
          <div className="w-full max-w-[220px] rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-md">
            <img
              src="/images/scan-score/result-score.png"
              alt="SEGYM Scan and Score result"
              className="w-full h-auto block"
            />
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-2.5">
          <Link
            href="/en/scan-and-score"
            onClick={onClose}
            className="block w-full py-3.5 rounded-xl bg-primary text-white text-center text-sm font-bold hover:bg-primary-dark transition-colors shadow-brand"
          >
            Explore Scan &amp; Score
          </Link>
          <OpenInquiryButton
            onClick={onClose}
            className="block w-full py-3.5 rounded-xl border border-neutral-300 bg-white text-neutral-900 text-center text-sm font-semibold hover:bg-neutral-50 transition-colors"
          >
            Request launch updates
          </OpenInquiryButton>
          <button
            type="button"
            onClick={onClose}
            className="block w-full py-2 text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}

/** Shows a Scan & Score promo popup on EN pages (except the landing itself). */
export function EnScanScorePopup() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!pathname?.startsWith('/en')) return
    if (pathname.startsWith('/en/scan-and-score')) return

    const timer = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem(STORAGE_KEY) === '1') return
      } catch {
        /* ignore */
      }
      setOpen(true)
    }, 800)

    return () => window.clearTimeout(timer)
  }, [pathname])

  const close = useCallback(() => {
    setOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [])

  if (!open) return null
  return <ScanScorePopupDialog onClose={close} />
}
