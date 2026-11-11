'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BODY_PERFORMANCE_PATH } from '@/data/body-performance'

/** 한글 사이트 상단 — 체성능 측정 출시 띠배너 */
export function UpdatePromoBar() {
  const pathname = usePathname()
  if (pathname?.startsWith('/en') || pathname?.startsWith('/admin')) return null

  return (
    <Link
      href={BODY_PERFORMANCE_PATH}
      className="block bg-primary text-white hover:bg-primary-dark transition-colors"
    >
      <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 text-center text-[13px] sm:text-sm font-semibold leading-snug tracking-tight">
        <span className="md:hidden">체성능 측정 출시! 수행능력을 측정해보세요 →</span>
        <span className="hidden md:inline">세짐 체성능 측정 출시! 회원들의 운동 수행능력을 측정해보세요 →</span>
      </p>
    </Link>
  )
}
