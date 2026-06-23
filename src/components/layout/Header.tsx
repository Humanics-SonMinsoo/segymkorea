'use client'

import { useState } from 'react'
import Link from 'next/link'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { OpenBrochureButton } from '@/components/brochure/OpenBrochureButton'
import { DEMO_EXPERIENCE_COPY } from '@/lib/demo-experience-copy'

type NavItem = {
  href: string
  label: string
  /** true면 링크 없이 준비 중 스타일만 표시 */
  comingSoon?: boolean
  /** true면 NEW 배지 표시 (최근 오픈 메뉴) */
  isNew?: boolean
}

const navItems: NavItem[] = [
  { href: '/product', label: '제품소개' },
  { href: '/pricing', label: '가격안내' },
  { href: '/installations', label: '설치사례' },
  { href: '/blog', label: '블로그' },
  { href: '/experience', label: DEMO_EXPERIENCE_COPY.navLabel, isNew: true },
]

const navComingSoonClass =
  'text-gray-400 opacity-55 cursor-not-allowed select-none pointer-events-none text-sm font-medium'

function NewBadge() {
  return (
    <span
      className="ml-1 inline-flex items-center rounded-full bg-red-500 px-1.5 py-px text-[9px] font-bold uppercase leading-tight tracking-wide text-white align-text-top"
      aria-label="새로 오픈"
    >
      N
    </span>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl text-gray-900 tracking-tight italic"
              style={{ fontFamily: 'var(--font-segym)', fontWeight: 'bold' }}
            >
              SEGYM
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) =>
              item.comingSoon ? (
                <span
                  key={item.href}
                  className={navComingSoonClass}
                  title="준비 중입니다"
                  aria-disabled="true"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
                >
                  {item.label}
                  {item.isNew ? <NewBadge /> : null}
                </Link>
              ),
            )}
            <OpenBrochureButton className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold">
              소개서 받기
            </OpenBrochureButton>
            <OpenInquiryButton className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all font-semibold">
              도입 문의하기
            </OpenInquiryButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navItems.map((item) =>
              item.comingSoon ? (
                <span
                  key={item.href}
                  className={`block ${navComingSoonClass}`}
                  title="준비 중입니다"
                  aria-disabled="true"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-700 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  {item.isNew ? <NewBadge /> : null}
                </Link>
              ),
            )}
            <OpenBrochureButton
              className="w-full px-4 py-2 bg-white border-2 border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              소개서 받기
            </OpenBrochureButton>
            <OpenInquiryButton
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              도입 문의하기
            </OpenInquiryButton>
          </div>
        )}
      </nav>
    </header>
  )
}
