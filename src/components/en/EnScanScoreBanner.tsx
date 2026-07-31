'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'

const STORAGE_KEY = 'segym-en-scan-score-banner-dismissed-v1'

export function EnScanScoreBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return
    } catch {
      /* ignore */
    }
    setVisible(true)
  }, [])

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
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-primary/30 bg-white shadow-2xl shadow-primary/20 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-0.5">Coming soon</p>
            <p className="text-sm sm:text-base font-bold text-gray-900">
              SEGYM Scan &amp; Score — body performance assessment
            </p>
            <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed">
              Measure athletic ability through guided tests — then see the result as a clear score with stats.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              href="/en/scan-and-score"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
            >
              Learn more
            </Link>
            <OpenInquiryButton className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
              Notify me
            </OpenInquiryButton>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-lg p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              aria-label="Dismiss"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
