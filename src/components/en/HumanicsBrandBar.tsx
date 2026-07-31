'use client'

import Link from 'next/link'
import { COMPANY_PUBLIC_EN, HUMANICS_BRAND_BAR } from '@/data/en/site'

export function HumanicsBrandBar() {
  const C = COMPANY_PUBLIC_EN
  return (
    <div className="bg-neutral-950 text-neutral-300 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 py-2.5 text-[11px] sm:text-xs leading-snug">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span
              className="text-white font-bold tracking-[0.18em] uppercase"
              style={{ fontFamily: 'var(--font-segym), system-ui, sans-serif' }}
            >
              {HUMANICS_BRAND_BAR.logoText}
            </span>
            <span className="hidden sm:inline text-neutral-600" aria-hidden>
              |
            </span>
            <span className="text-neutral-300">{HUMANICS_BRAND_BAR.tagline}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-neutral-400">
            <span className="hidden md:inline italic text-neutral-500">{HUMANICS_BRAND_BAR.catchphrase}</span>
            <a
              href={C.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              {HUMANICS_BRAND_BAR.linkLabel}
            </a>
            <Link href="/" className="hover:text-white transition-colors">
              한국어
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
