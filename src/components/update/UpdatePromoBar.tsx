'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UPDATE_2026_COPY, UPDATE_2026_PATH } from '@/data/update-2026'

/** 한글 사이트 상단 — 네거티브 업데이트 예고 띠배너 */
export function UpdatePromoBar() {
  const pathname = usePathname()
  if (pathname?.startsWith('/en') || pathname?.startsWith('/admin')) return null

  return (
    <Link
      href={UPDATE_2026_PATH}
      className="block bg-gradient-to-r from-primary via-primary to-primary-dark text-white hover:brightness-110 transition-[filter] border-b border-white/15"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 text-center sm:text-left">
        <div className="min-w-0 text-[11px] sm:text-sm leading-snug">
          <span className="font-extrabold tracking-tight text-white drop-shadow-sm">
            {UPDATE_2026_COPY.bannerHook}
          </span>
          <span className="mx-1.5 sm:mx-2 text-white/50 hidden sm:inline" aria-hidden>
            ·
          </span>
          <span className="block sm:inline mt-0.5 sm:mt-0 font-bold text-white/95">
            {UPDATE_2026_COPY.bannerTitle}
          </span>
          <span className="mx-1.5 sm:mx-2 text-white/40 hidden md:inline" aria-hidden>
            |
          </span>
          <span className="block sm:inline mt-0.5 sm:mt-0 text-white/85 font-medium">
            {UPDATE_2026_COPY.bannerSchedule}
          </span>
        </div>
        <span className="shrink-0 inline-flex items-center justify-center gap-1 self-center rounded-full bg-white/15 px-3 py-1 text-[11px] sm:text-xs font-bold text-white ring-1 ring-white/25">
          {UPDATE_2026_COPY.bannerCta}
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  )
}
