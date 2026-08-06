/** 네거티브 — 방향별 무게 자동변환 다이어그램 (가을 톤) */
export function NegativeWeightDiagram() {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-amber-900/45 bg-[#120c09] shadow-2xl shadow-amber-950/50"
      role="img"
      aria-label="내릴 때 100kg, 올릴 때 60kg 방향에 따른 무게 자동변환 다이어그램"
    >
      <div className="relative px-5 sm:px-10 py-10 sm:py-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 40%, rgba(217,119,6,0.28), transparent 55%), radial-gradient(circle at 80% 70%, rgba(234,88,12,0.18), transparent 45%)',
          }}
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-6 items-center max-w-4xl mx-auto">
          {/* 내릴 때 */}
          <div className="order-2 md:order-1 text-center md:text-right">
            <p className="inline-flex items-center gap-2 text-amber-300 font-semibold text-sm sm:text-base">
              <span aria-hidden className="text-xl leading-none">↓</span>
              내릴 때
            </p>
            <p className="mt-2 text-4xl sm:text-5xl font-bold tabular-nums tracking-tight text-orange-50">
              100<span className="text-2xl sm:text-3xl font-semibold text-amber-300 ml-1">kg</span>
            </p>
            <p className="mt-2 text-sm text-orange-100/55 ko-modal-copy">네거티브 · 신장성 수축</p>
          </div>

          {/* 중앙 바벨 그래픽 */}
          <div className="order-1 md:order-2 flex flex-col items-center justify-center py-2">
            <div className="relative flex flex-col items-center">
              <div className="w-16 h-3 rounded-sm bg-amber-100/80 shadow-[0_0_20px_rgba(251,191,36,0.2)]" />
              <div className="relative w-2.5 h-36 sm:h-44 rounded-full bg-gradient-to-b from-amber-500 via-orange-500 to-rose-700 shadow-[0_0_28px_rgba(217,119,6,0.55)]">
                <span className="absolute left-1/2 top-[28%] -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-orange-50" />
                <span className="absolute left-1/2 top-[68%] -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-orange-50" />
              </div>
              <div className="w-16 h-3 rounded-sm bg-amber-100/80 shadow-[0_0_20px_rgba(251,191,36,0.2)]" />
            </div>
            <p className="mt-5 text-center text-xs sm:text-sm font-semibold text-orange-50/90 ko-modal-copy px-2">
              방향에 따른 무게 자동변환
            </p>
          </div>

          {/* 올릴 때 */}
          <div className="order-3 text-center md:text-left">
            <p className="inline-flex items-center gap-2 text-orange-300 font-semibold text-sm sm:text-base">
              <span aria-hidden className="text-xl leading-none">↑</span>
              올릴 때
            </p>
            <p className="mt-2 text-4xl sm:text-5xl font-bold tabular-nums tracking-tight text-orange-50">
              60<span className="text-2xl sm:text-3xl font-semibold text-orange-300 ml-1">kg</span>
            </p>
            <p className="mt-2 text-sm text-orange-100/55 ko-modal-copy">컨센트릭 · 수축</p>
          </div>
        </div>
      </div>
    </div>
  )
}
