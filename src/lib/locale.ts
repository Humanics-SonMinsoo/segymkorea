'use client'

import { usePathname } from 'next/navigation'

/** True when browsing the English site under `/en`. */
export function useIsEnglishSite(): boolean {
  const pathname = usePathname() ?? ''
  return pathname === '/en' || pathname.startsWith('/en/')
}
