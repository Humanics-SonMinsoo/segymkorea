import Link from 'next/link'
import type { ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

/** 히어로 도트 패턴 */
const HERO_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h60v60H0z%22%20fill%3D%22none%22%2F%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%20fill%3D%22%23fff%22%20opacity%3D%22.1%22%2F%3E%3C%2Fsvg%3E\")"

type ContentMaxWidth = 'narrow' | 'default' | 'wide'

/**
 * gradient — 제품 랜딩형 풀 퍼플 히어로 (채널톡 메인 히어로에 가까움)
 * light — 밝은 상단 + 언더라인 강조 (블로그, 사례, 리소스 느낌)
 * bar — 상단 얇은 퍼플→틸 밴드 + 화이트 타이틀 (가격, 가이드형)
 * docs — 회색 배경 + 문서 카드 (약관, 개인정보)
 */
export type SubPageVariant = 'gradient' | 'light' | 'bar' | 'docs'

type Props = {
  title: string
  description?: string
  /** 설명 문단에 덧붙일 클래스 (예: 굵게) */
  descriptionClassName?: string
  children: ReactNode
  contentMaxWidth?: ContentMaxWidth
  variant?: SubPageVariant
  /** 있으면 상단 «홈으로» 대신 이 링크 표시 (예: 가격 상세 → 목록) */
  backLink?: { href: string; label: string }
  /**
   * variant `bar` 전용: 흰색 타이틀/설명 히어로 생략 → 그라데이션 띠 아래 곧바로 본문 카드.
   * 스크린리더용으로 `title`은 유지(아래에서 sr-only h1로 출력).
   */
  barSkipHero?: boolean
}

const maxWidthClass: Record<ContentMaxWidth, string> = {
  narrow: 'max-w-3xl',
  default: 'max-w-4xl',
  wide: 'max-w-5xl',
}

function HomeLink({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors group ${className}`}
    >
      <span className="group-hover:-translate-x-0.5 transition-transform" aria-hidden>
        ←
      </span>
      홈으로
    </Link>
  )
}

function BackLink({
  href,
  label,
  className = '',
}: {
  href: string
  label: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors group ${className}`}
    >
      <span className="group-hover:-translate-x-0.5 transition-transform" aria-hidden>
        ←
      </span>
      {label}
    </Link>
  )
}

export function SiteSubPage({
  title,
  description,
  descriptionClassName = '',
  children,
  contentMaxWidth = 'default',
  variant = 'gradient',
  backLink,
  barSkipHero = false,
}: Props) {
  const mw = maxWidthClass[contentMaxWidth]

  const topNav =
    backLink != null ? (
      <BackLink
        href={backLink.href}
        label={backLink.label}
        className={
          variant === 'docs'
            ? 'text-primary mb-8 hover:text-primary-dark'
            : variant === 'bar'
              ? 'text-gray-500 hover:text-primary mb-6'
              : variant === 'light'
                ? 'text-gray-500 hover:text-primary mb-8'
                : 'text-white/90 hover:text-white mb-8'
        }
      />
    ) : null

  if (variant === 'docs') {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-gray-100">
          <div className={`${mw} mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14`}>
            {topNav ?? <HomeLink className="text-primary mb-8 hover:text-primary-dark" />}
            <div className="rounded-xl border border-gray-200/80 bg-white shadow-sm p-6 sm:p-8 md:p-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight ko-modal-copy">{title}</h1>
              {description ? (
                <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed ko-modal-copy whitespace-pre-line">
                  {description}
                </p>
              ) : null}
              <div className="mt-8 border-t border-gray-100 pt-8">{children}</div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (variant === 'bar') {
    if (barSkipHero) {
      return (
        <>
          <Header />
          <main className="min-h-screen pt-16">
            <div
              className="h-1.5 w-full bg-gradient-to-r from-primary via-primary-dark to-brand-teal"
              aria-hidden
            />
            <section className="bg-gradient-to-b from-gray-50 via-white to-gray-50 py-10 sm:py-14">
              <div className={`${mw} mx-auto px-4 sm:px-6 lg:px-8`}>
                <h1 className="sr-only">{title}</h1>
                {topNav ?? <HomeLink className="text-gray-500 hover:text-primary mb-6" />}
                <div className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 md:p-10 shadow-brand">
                  {children}
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </>
      )
    }

    return (
      <>
        <Header />
        <main className="min-h-screen pt-16">
          <div
            className="h-1.5 w-full bg-gradient-to-r from-primary via-primary-dark to-brand-teal"
            aria-hidden
          />
          <section className="bg-white border-b border-gray-100">
            <div className={`${mw} mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12`}>
              {topNav ?? <HomeLink className="text-gray-500 hover:text-primary mb-6" />}
              <h1 className="section-title text-gray-900">{title}</h1>
              {description ? (
                <p className="section-subtitle mt-4 max-w-2xl whitespace-pre-line">{description}</p>
              ) : null}
            </div>
          </section>
          <section className="bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12 sm:py-16">
            <div className={`${mw} mx-auto px-4 sm:px-6 lg:px-8`}>
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 md:p-10 shadow-brand">
                {children}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  if (variant === 'light') {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-white">
          <div className={`${mw} mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-4`}>
            {topNav ?? <HomeLink className="text-gray-500 hover:text-primary mb-8" />}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12">
              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight ko-modal-copy">
                  {title}
                </h1>
                <div className="flex gap-2 mt-5">
                  <span className="w-14 h-1.5 rounded-full bg-primary" aria-hidden />
                  <span className="w-6 h-1.5 rounded-full bg-brand-teal/70" aria-hidden />
                </div>
                {description ? (
                  <p className={`section-subtitle mt-6 text-gray-600 max-w-xl whitespace-pre-line ${descriptionClassName}`}>
                    {description}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <section className="bg-slate-50 border-t border-slate-100/80 py-12 sm:py-16 mt-8">
            <div className={`${mw} mx-auto px-4 sm:px-6 lg:px-8`}>
              <div className="rounded-2xl bg-white border border-slate-200/60 p-6 sm:p-8 md:p-10 shadow-sm">
                {children}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  /* gradient (default) */
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-dark text-white">
          <div
            className="absolute inset-0 pointer-events-none opacity-90"
            style={{ backgroundImage: HERO_PATTERN }}
            aria-hidden
          />
          <div
            className="absolute top-0 right-0 w-1/2 max-w-md h-full opacity-20 pointer-events-none bg-gradient-to-l from-brand-teal to-transparent"
            aria-hidden
          />
          <div className={`relative ${mw} mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20`}>
            {topNav ?? <HomeLink className="text-white/90 hover:text-white mb-8" />}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight [text-shadow:0_2px_16px_rgba(0,0,0,0.2)] ko-modal-copy">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed font-medium [text-shadow:0_1px_8px_rgba(0,0,0,0.15)] ko-modal-copy whitespace-pre-line">
                {description}
              </p>
            ) : null}
          </div>
        </section>

        <section className="relative -mt-6 sm:-mt-8 pb-16 sm:pb-24 bg-gray-50">
          <div className={`${mw} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-brand-lg p-6 sm:p-8 md:p-10 lg:p-12">
              {children}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
