import Link from 'next/link'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import {
  UPDATE_2026_COPY,
  UPDATE_BODY_PERF,
  UPDATE_NEGATIVE,
} from '@/data/update-2026'

function PhoneShot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white aspect-[9/16] max-h-[520px] mx-auto w-full max-w-[300px] sm:max-w-[340px]">
      <img src={src} alt={alt} className="h-full w-full object-contain object-top" />
    </div>
  )
}

export function UpdatePageContent() {
  const C = UPDATE_2026_COPY
  const body = UPDATE_BODY_PERF
  const neg = UPDATE_NEGATIVE

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-black to-black" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-brand-teal mb-4">
              {C.heroEyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight ko-modal-copy">
              {C.heroTitle}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-neutral-300 leading-relaxed ko-modal-copy">
              {C.heroBody}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`#${body.id}`}
                className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-3 text-sm font-bold text-white hover:bg-brand-teal-dark transition-colors"
              >
                체성능 측정 보기
              </a>
              <a
                href={`#${neg.id}`}
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                네거티브 트레이닝 보기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview cards */}
      <section className="border-b border-white/10 py-14 md:py-16 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold tracking-[0.18em] text-primary mb-3">{C.overviewTitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <a
              href={`#${body.id}`}
              className="rounded-2xl border border-brand-teal/40 bg-black/50 p-6 sm:p-8 hover:border-brand-teal transition-colors"
            >
              <p className="text-xs font-bold text-brand-teal tracking-wider mb-2">{body.badge}</p>
              <h2 className="text-2xl font-bold ko-modal-copy">{body.title}</h2>
              <p className="mt-1 text-sm text-neutral-500">{body.subtitle}</p>
              <p className="mt-4 text-neutral-400 leading-relaxed ko-modal-copy text-sm sm:text-base">
                {body.quote}
              </p>
            </a>
            <a
              href={`#${neg.id}`}
              className="rounded-2xl border border-primary/40 bg-black/50 p-6 sm:p-8 hover:border-primary-light transition-colors"
            >
              <p className="text-xs font-bold text-primary-light tracking-wider mb-2">{neg.badge}</p>
              <h2 className="text-2xl font-bold ko-modal-copy">{neg.title}</h2>
              <p className="mt-1 text-sm text-neutral-500">{neg.subtitle}</p>
              <p className="mt-4 text-neutral-400 leading-relaxed ko-modal-copy text-sm sm:text-base">
                {neg.quote}
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Body performance */}
      <section id={body.id} className="scroll-mt-28 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.2em] text-brand-teal mb-3">{body.badge}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight ko-modal-copy">{body.title}</h2>
          <p className="mt-2 text-neutral-500">{body.subtitle}</p>
          <p className="mt-5 text-lg text-primary-light font-semibold ko-modal-copy leading-relaxed">
            “{body.quote}”
          </p>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg leading-relaxed ko-modal-copy max-w-3xl">
            {body.intro}
          </p>

          <div className="mt-10 rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 shadow-2xl shadow-primary/15">
            <img src={body.heroImage} alt="체성능 측정 기능 출시" className="w-full h-auto block" />
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {body.measures.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-neutral-950/80 p-5">
                <p className="text-2xl mb-2" aria-hidden>
                  {item.icon}
                </p>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed ko-modal-copy">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight ko-modal-copy">
              측정 선택부터 점수까지 — 세 단계
            </h3>
          </div>
          {body.flow.map((item, i) => (
            <div
              key={item.step}
              className={`border-t border-white/10 ${i % 2 === 0 ? 'bg-neutral-950' : 'bg-black'}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className={i % 2 === 1 ? 'lg:order-2' : undefined}>
                  <p className="text-sm font-bold tracking-[0.2em] text-brand-teal mb-3">{item.step}</p>
                  <h4 className="text-2xl sm:text-3xl font-bold tracking-tight ko-modal-copy">{item.title}</h4>
                  <p className="mt-4 text-neutral-400 text-base sm:text-lg leading-relaxed ko-modal-copy max-w-xl">
                    {item.body}
                  </p>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : undefined}>
                  <PhoneShot src={item.image} alt={item.title} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 bg-neutral-950 py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight ko-modal-copy">{body.resultTitle}</h3>
            <p className="mt-4 text-neutral-400 text-base sm:text-lg leading-relaxed ko-modal-copy">
              {body.resultBody}
            </p>
            <ul className="mt-8 space-y-3 text-neutral-300">
              {body.resultPoints.map((line) => (
                <li key={line} className="flex gap-3 ko-modal-copy">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Negative */}
      <section id={neg.id} className="scroll-mt-28 border-b border-white/10 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] text-primary-light mb-3">{neg.badge}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight ko-modal-copy max-w-3xl">
            {neg.title}
          </h2>
          <p className="mt-2 text-neutral-500">{neg.subtitle}</p>
          <p className="mt-5 text-lg text-primary-light font-semibold ko-modal-copy leading-relaxed max-w-3xl">
            “{neg.quote}”
          </p>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg leading-relaxed ko-modal-copy max-w-3xl">
            {neg.intro}
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {neg.points.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-neutral-950 p-6">
                <h3 className="text-lg font-bold mb-3 ko-modal-copy">{item.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed ko-modal-copy">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-primary/30 bg-primary/10 p-6 sm:p-8">
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed ko-modal-copy">
              SEGYM DAY에서 최초로 예고한 메인 기능입니다. 하반기 정식 출시 로드맵에 포함되며, 기존 도입
              센터에도 <strong className="text-white">추가 비용 없이 업데이트</strong>로 제공될 예정입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Price promo CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-3">Limited window</p>
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
            <Link
              href="/segym-day"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              SEGYM DAY 신청
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
