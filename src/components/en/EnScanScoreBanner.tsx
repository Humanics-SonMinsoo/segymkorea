'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { EN_NAV } from '@/data/en/site'

const STORAGE_KEY = 'segym-en-scan-score-float-dismissed-v1'

export function EnScanScoreBanner() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (!pathname?.startsWith('/en')) return
    if (pathname.startsWith('/en/scan-and-score')) {
      setVisible(false)
      setEntered(false)
      return
    }
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return
    } catch {
      /* ignore */
    }
    setVisible(true)
  }, [pathname])

  useEffect(() => {
    if (!visible) return
    setEntered(false)
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setEntered(true))
    })
    return () => window.cancelAnimationFrame(id)
  }, [visible])

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-[60] w-[min(100%-2rem,22rem)] sm:bottom-5 sm:right-5">
      <div
        className={`rounded-2xl border border-primary/25 bg-white shadow-2xl shadow-primary/15 overflow-hidden transition-[opacity,transform] duration-300 ${
          entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <div className="flex items-start gap-3 px-4 pt-3.5 pb-2">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Coming soon</p>
            <p className="mt-0.5 text-sm font-bold text-gray-900 leading-snug">SEGYM Scan &amp; Score</p>
            <p className="mt-1 text-xs text-gray-600 leading-relaxed">
              Measure athletic ability — then see the result as a clear score.
            </p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-lg p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 shrink-0"
            aria-label="Dismiss"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-4 pb-3.5 flex gap-2">
          <Link
            href="/en/scan-and-score"
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            Learn more
          </Link>
          <OpenInquiryButton className="flex-1 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
            {EN_NAV.inquire}
          </OpenInquiryButton>
        </div>
      </div>
    </div>
  )
}
