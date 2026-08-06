import Link from 'next/link'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import {
  UPDATE_2026_COPY,
  UPDATE_BODY_PERF,
  UPDATE_NEGATIVE,
} from '@/data/update-2026'

export function UpdatePageContent() {
  const C = UPDATE_2026_COPY
  const body = UPDATE_BODY_PERF
  const neg = UPDATE_NEGATIVE

  return (
    <div className="bg-black text-white">
      {/* Hero + 기능 개요 */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-black to-black" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight ko-modal-copy">
              {C.heroTitle}
            </h1>
            <p className="mt-8 text-sm font-semibold tracking-[0.18em] text-primary-light">
              {C.overviewTitle}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
            <a
              href={`#${neg.id}`}
              className="rounded-2xl border border-primary/40 bg-black/50 p-6 sm:p-7 text-left hover:border-primary-light transition-colors"
            >
              <p className="text-xs font-semibold tracking-wider text-primary-light mb-2">1</p>
              <h2 className="text-xl sm:text-2xl font-bold ko-modal-copy">{neg.overviewTitle}</h2>
              <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed ko-modal-copy">
                {neg.overviewBody}
              </p>
            </a>
            <a
              href={`#${body.id}`}
              className="rounded-2xl border border-brand-teal/40 bg-black/50 p-6 sm:p-7 text-left hover:border-brand-teal transition-colors"
            >
              <p className="text-xs font-semibold tracking-wider text-brand-teal mb-2">2</p>
              <h2 className="text-xl sm:text-2xl font-bold ko-modal-copy">{body.overviewTitle}</h2>
              <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed ko-modal-copy">
                {body.overviewBody}
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* 네거티브 기능 업데이트 안내 */}
      <section id={neg.id} className="scroll-mt-28 border-b border-white/10 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary-light mb-3">{neg.badge}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight ko-modal-copy max-w-3xl">
            {neg.title}
          </h2>
          <p className="mt-4 text-xl sm:text-2xl font-medium text-primary-light ko-modal-copy">
            {neg.hook}
          </p>
          <p className="mt-2 text-sm text-neutral-500">{neg.subtitle}</p>

          <p className="mt-8 text-base sm:text-lg text-neutral-300 leading-relaxed ko-modal-copy max-w-3xl">
            {neg.intro}
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {neg.points.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-neutral-950 p-6">
                <h3 className="text-lg font-bold mb-3 ko-modal-copy">{item.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed ko-modal-copy">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 체성능 — 요약 */}
      <section id={body.id} className="scroll-mt-28 border-b border-white/10 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-teal mb-3">{body.badge}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight ko-modal-copy">{body.title}</h2>
          <p className="mt-2 text-neutral-500">{body.subtitle}</p>
          <p className="mt-5 text-xl sm:text-2xl font-medium text-brand-teal ko-modal-copy">{body.hook}</p>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg leading-relaxed ko-modal-copy max-w-3xl">
            {body.intro}
          </p>

          <div className="mt-10 rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-primary/10">
            <img src={body.heroImage} alt="체성능 측정 기능 출시" className="w-full h-auto block" />
          </div>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {body.measures.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-black/60 p-4 sm:p-5">
                <p className="text-xl sm:text-2xl mb-1.5" aria-hidden>
                  {item.icon}
                </p>
                <h3 className="text-base sm:text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed ko-modal-copy">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-black/50 p-6 sm:p-8">
            <p className="text-sm font-semibold tracking-wide text-brand-teal mb-4">이렇게 진행됩니다</p>
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {body.flowSummary.map((step, i) => (
                <li key={step} className="flex items-start gap-3 ko-modal-copy">
                  <span className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-teal text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm sm:text-base text-neutral-200 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <ul className="mt-6 space-y-2 text-neutral-400 text-sm sm:text-base">
              {body.resultPoints.map((line) => (
                <li key={line} className="flex gap-3 ko-modal-copy">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-3">2026 H2 Update</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight ko-modal-copy [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]">
            {C.priceTitle}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/90 leading-relaxed ko-modal-copy [text-shadow:0_1px_6px_rgba(0,0,0,0.25)]">
            {C.priceBody}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <OpenInquiryButton className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-primary hover:bg-neutral-100 transition-colors shadow-md">
              {C.priceCta}
            </OpenInquiryButton>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/90 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
            >
              {C.pricePricing}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
