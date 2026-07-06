import { SEGYM_DAY_COPY } from '@/data/segym-day'

export function SegymDayUrgencyBanner({ variant = 'page' }: { variant?: 'page' | 'compact' }) {
  const compact = variant === 'compact'

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-red-200 bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 ${
        compact ? 'px-4 py-3.5' : 'px-5 py-4 sm:px-6 sm:py-5'
      }`}
      role="status"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-red-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" aria-hidden />
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center rounded-md bg-red-500 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white animate-pulse">
              마감 임박
            </span>
            <span className="inline-flex items-center rounded-md bg-primary px-2 py-0.5 text-[11px] font-bold text-white">
              {SEGYM_DAY_COPY.urgencyLimited}
            </span>
          </div>
          <p className={`font-bold text-gray-900 ko-modal-copy ${compact ? 'text-sm' : 'text-base sm:text-lg'}`}>
            {SEGYM_DAY_COPY.urgencyHeadline}
          </p>
          <p className={`mt-1 text-gray-600 ko-modal-copy leading-relaxed ${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-[15px]'}`}>
            {SEGYM_DAY_COPY.urgencySubline}
          </p>
        </div>
        <div
          className={`shrink-0 rounded-lg border border-red-200/80 bg-white/90 px-3 py-2 text-center shadow-sm ${
            compact ? 'sm:min-w-[140px]' : 'sm:min-w-[160px]'
          }`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wide text-red-600">신청 마감</p>
          <p className="text-sm font-bold text-gray-900 ko-modal-copy">{SEGYM_DAY_COPY.deadlineLabel}</p>
        </div>
      </div>
    </div>
  )
}
