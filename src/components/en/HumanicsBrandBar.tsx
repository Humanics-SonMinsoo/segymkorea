'use client'

import { COMPANY_PUBLIC_EN, HUMANICS_BRAND_BAR } from '@/data/en/site'

export function HumanicsBrandBar() {
  const C = COMPANY_PUBLIC_EN
  return (
    <div className="bg-neutral-950 text-neutral-300 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2.5 text-[11px] sm:text-xs leading-snug">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0">
            <span
              className="text-white font-bold tracking-[0.18em] uppercase shrink-0"
              style={{ fontFamily: 'var(--font-segym), system-ui, sans-serif' }}
            >
              {HUMANICS_BRAND_BAR.logoText}
            </span>
            <span className="hidden sm:inline text-neutral-600" aria-hidden>
              |
            </span>
            <span className="text-neutral-300 truncate">{HUMANICS_BRAND_BAR.tagline}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-neutral-400 shrink-0">
            <a
              href={C.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-white/25 bg-white/5 px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-white hover:bg-white/15 hover:border-white/40 transition-colors"
            >
              {HUMANICS_BRAND_BAR.websiteButton}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
