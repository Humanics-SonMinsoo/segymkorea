import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { NegativeWeightDiagram } from '@/components/update/NegativeWeightDiagram'
import {
  UPDATE_2026_COPY,
  UPDATE_BODY_PERF,
  UPDATE_NEGATIVE,
} from '@/data/update-2026'

/** 하반기 업데이트 페이지 — 가을 톤 색조합 */
export function UpdatePageContent() {
  const C = UPDATE_2026_COPY
  const body = UPDATE_BODY_PERF
  const neg = UPDATE_NEGATIVE

  return (
    <div className="bg-[#1a120e] text-orange-50">
      {/* Hero + 기능 개요 */}
      <section className="relative overflow-hidden border-b border-amber-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700/25 via-[#1a120e] to-[#120c09]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a120e] to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-amber-400/90 mb-4">
              Autumn Update · 2026
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight ko-modal-copy text-orange-50">
              {C.heroTitle}
            </h1>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
            <a
              href={`#${neg.id}`}
              className="rounded-2xl border border-amber-600/40 bg-[#241811]/80 p-6 sm:p-7 text-left hover:border-amber-400/70 hover:bg-[#2a1c14] transition-colors"
            >
              <p className="text-xs font-semibold tracking-wider text-amber-400 mb-2">1</p>
              <h2 className="text-xl sm:text-2xl font-bold ko-modal-copy text-orange-50">{neg.overviewTitle}</h2>
              <p className="mt-3 text-sm sm:text-base text-orange-100/65 leading-relaxed ko-modal-copy">
                {neg.overviewBody}
              </p>
            </a>
            <a
              href={`#${body.id}`}
              className="rounded-2xl border border-orange-700/35 bg-[#241811]/80 p-6 sm:p-7 text-left hover:border-orange-400/60 hover:bg-[#2a1c14] transition-colors"
            >
              <p className="text-xs font-semibold tracking-wider text-orange-300 mb-2">2</p>
              <h2 className="text-xl sm:text-2xl font-bold ko-modal-copy text-orange-50">{body.overviewTitle}</h2>
              <p className="mt-3 text-sm sm:text-base text-orange-100/65 leading-relaxed ko-modal-copy">
                {body.overviewBody}
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* 네거티브 기능 업데이트 안내 */}
      <section id={neg.id} className="scroll-mt-28 border-b border-amber-900/40 py-16 md:py-24 bg-[#16100c]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight ko-modal-copy max-w-3xl text-orange-50">
            {neg.title}
          </h2>
          <p className="mt-4 text-lg sm:text-xl font-medium text-amber-300 ko-modal-copy max-w-3xl leading-snug">
            {neg.hook}
          </p>
          <p className="mt-2 text-sm text-orange-200/45">{neg.subtitle}</p>

          <div className="mt-10">
            <NegativeWeightDiagram />
          </div>

          <p className="mt-10 text-base sm:text-lg text-orange-100/75 leading-relaxed ko-modal-copy max-w-3xl">
            {neg.intro}
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {neg.points.map((item) => (
              <div key={item.title} className="rounded-2xl border border-amber-900/40 bg-[#1f1611] p-6">
                <h3 className="text-lg font-bold mb-3 ko-modal-copy text-amber-100">{item.title}</h3>
                <p className="text-sm text-orange-100/60 leading-relaxed ko-modal-copy">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 체성능 — 요약 */}
      <section id={body.id} className="scroll-mt-28 border-b border-amber-900/40 bg-[#1a120e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <p className="text-xs font-semibold tracking-[0.2em] text-orange-300 mb-3">{body.badge}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight ko-modal-copy text-orange-50">{body.title}</h2>
          <p className="mt-2 text-orange-200/45">{body.subtitle}</p>
          <p className="mt-5 text-xl sm:text-2xl font-medium text-amber-300 ko-modal-copy">{body.hook}</p>
          <p className="mt-4 text-orange-100/65 text-base sm:text-lg leading-relaxed ko-modal-copy max-w-3xl">
            {body.intro}
          </p>

          <div className="mt-10 rounded-2xl overflow-hidden border border-amber-900/40 bg-[#120c09] shadow-2xl shadow-amber-950/40">
            <img src={body.heroImage} alt="체성능 측정 기능 출시" className="w-full h-auto block" />
          </div>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {body.measures.map((item) => (
              <div key={item.title} className="rounded-2xl border border-amber-900/35 bg-[#241811]/70 p-4 sm:p-5">
                <p className="text-xl sm:text-2xl mb-1.5" aria-hidden>
                  {item.icon}
                </p>
                <h3 className="text-base sm:text-lg font-bold mb-1 text-amber-50">{item.title}</h3>
                <p className="text-xs sm:text-sm text-orange-100/55 leading-relaxed ko-modal-copy">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-amber-900/40 bg-[#241811]/60 p-6 sm:p-8">
            <p className="text-sm font-semibold tracking-wide text-amber-300 mb-4">이렇게 진행됩니다</p>
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {body.flowSummary.map((step, i) => (
                <li key={step} className="flex items-start gap-3 ko-modal-copy">
                  <span className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-orange-50">
                    {i + 1}
                  </span>
                  <span className="text-sm sm:text-base text-orange-50/90 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <ul className="mt-6 space-y-2 text-orange-100/60 text-sm sm:text-base">
              {body.resultPoints.map((line) => (
                <li key={line} className="flex gap-3 ko-modal-copy">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-700 via-orange-700 to-rose-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-100/85 mb-3">Before September Update</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-50 tracking-tight ko-modal-copy [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]">
            {C.priceTitle}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-orange-50/90 leading-relaxed ko-modal-copy [text-shadow:0_1px_6px_rgba(0,0,0,0.25)]">
            {C.priceBody}
          </p>
          <div className="mt-8 flex justify-center">
            <OpenInquiryButton className="inline-flex items-center justify-center rounded-xl bg-orange-50 px-7 py-3.5 text-sm font-bold text-amber-950 hover:bg-white transition-colors shadow-md">
              {C.priceCta}
            </OpenInquiryButton>
          </div>
        </div>
      </section>
    </div>
  )
}
