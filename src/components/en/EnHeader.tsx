'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { OpenBrochureButton } from '@/components/brochure/OpenBrochureButton'
import { HumanicsBrandBar } from '@/components/en/HumanicsBrandBar'
import { EN_NAV } from '@/data/en/site'

type NavItem = {
  href: string
  label: string
  isCta?: boolean
}

const navItems: NavItem[] = [
  { href: '/en', label: EN_NAV.home },
  { href: '/en/product', label: EN_NAV.product },
  { href: '/en/installations', label: EN_NAV.installations },
  { href: '/en/blog', label: EN_NAV.blog },
  { href: '/en/scan-and-score', label: EN_NAV.scanAndScore, isCta: true },
  { href: '/en#contact-info', label: EN_NAV.contact },
]

const navCtaClass =
  'inline-flex items-center px-3.5 py-1.5 rounded-lg bg-brand-teal text-white text-sm font-bold hover:bg-brand-teal-dark transition-all shadow-sm shadow-brand-teal/30 ring-1 ring-brand-teal/40'

export function EnHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname() ?? ''

  const linkClass = (href: string) => {
    const active = href === '/en' ? pathname === '/en' : pathname.startsWith(href)
    return active
      ? 'text-primary text-sm font-semibold'
      : 'text-gray-700 hover:text-primary transition-colors text-sm font-medium'
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <HumanicsBrandBar />
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/en"
              className="text-2xl text-gray-900 tracking-tight italic"
              style={{ fontFamily: 'var(--font-segym)', fontWeight: 'bold' }}
            >
              SEGYM
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) =>
              item.isCta ? (
                <Link key={item.href} href={item.href} className={navCtaClass}>
                  {item.label}
                </Link>
              ) : (
                <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                  {item.label}
                </Link>
              ),
            )}
            <OpenBrochureButton className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold">
              {EN_NAV.getBrochure}
            </OpenBrochureButton>
            <OpenInquiryButton className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all font-semibold">
              {EN_NAV.inquire}
            </OpenInquiryButton>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {isMenuOpen ? (
          <div className="md:hidden py-4 space-y-4">
            {navItems.map((item) =>
              item.isCta ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block text-center ${navCtaClass}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-700 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
            <OpenBrochureButton
              className="w-full px-4 py-2 bg-white border-2 border-gray-300 text-gray-900 rounded-lg font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              {EN_NAV.getBrochure}
            </OpenBrochureButton>
            <OpenInquiryButton
              className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              {EN_NAV.inquire}
            </OpenInquiryButton>
          </div>
        ) : null}
      </nav>
    </header>
  )
}
