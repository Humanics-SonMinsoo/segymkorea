import Link from 'next/link'
import { UPDATE_2026_COPY, UPDATE_2026_PATH } from '@/data/update-2026'

/** 홈 랜딩 — 편의성 섹션과 재활 섹션 사이 네거티브 홍보 띠 */
export function UpdateHomePromoBand() {
  const C = UPDATE_2026_COPY

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-primary to-primary-dark text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.18), transparent 45%), radial-gradient(circle at 80% 30%, rgba(45,212,191,0.25), transparent 40%)',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          <div className="min-w-0 max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal mb-3">
              {C.homeBandEyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight ko-modal-copy">
              {C.homeBandTitle}
            </h2>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90 leading-relaxed ko-modal-copy">
              {C.homeBandBody}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={UPDATE_2026_PATH}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-lg hover:bg-neutral-100 transition-colors"
            >
              {C.homeBandCta}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
