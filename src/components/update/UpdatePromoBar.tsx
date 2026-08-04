'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UPDATE_2026_COPY, UPDATE_2026_PATH } from '@/data/update-2026'

/** 한글 사이트 상단 — 하반기 업데이트 예고 띠배너 */
export function UpdatePromoBar() {
  const pathname = usePathname()
  if (pathname?.startsWith('/en') || pathname?.startsWith('/admin')) return null

  return (
    <Link
      href={UPDATE_2026_PATH}
      className="block bg-neutral-950 text-white hover:bg-black transition-colors border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 text-center sm:text-left">
        <div className="min-w-0 text-[11px] sm:text-xs leading-snug">
          <span className="font-bold text-brand-teal">{UPDATE_2026_COPY.bannerLabel}</span>
          <span className="mx-2 text-neutral-600 hidden sm:inline" aria-hidden>
            |
          </span>
          <span className="block sm:inline mt-0.5 sm:mt-0 text-neutral-300">
            {UPDATE_2026_COPY.bannerFeatures}
          </span>
        </div>
        <span className="shrink-0 inline-flex items-center justify-center gap-1 text-[11px] sm:text-xs font-semibold text-white">
          {UPDATE_2026_COPY.bannerCta}
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  )
}
