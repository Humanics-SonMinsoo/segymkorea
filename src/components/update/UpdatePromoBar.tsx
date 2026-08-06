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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 text-center sm:text-left">
        <p className="min-w-0 text-[11px] sm:text-sm leading-snug text-white/95">
          <span className="font-medium tracking-tight text-white">
            {UPDATE_2026_COPY.bannerHook}
          </span>
          <span className="mx-1.5 sm:mx-2 text-white/45 hidden sm:inline" aria-hidden>
            /
          </span>
          <span className="block sm:inline mt-0.5 sm:mt-0 font-medium text-white/95">
            {UPDATE_2026_COPY.bannerTitle}
          </span>
          <span className="mx-1.5 sm:mx-2 text-white/35 hidden md:inline" aria-hidden>
            |
          </span>
          <span className="block sm:inline mt-0.5 sm:mt-0 text-white/80 font-normal">
            {UPDATE_2026_COPY.bannerSchedule}
          </span>
        </p>
      </div>
    </Link>
  )
}
