import { DEMO_EXPERIENCE_COPY } from '@/lib/demo-experience-copy'

type Props = {
  variant?: 'page' | 'compact'
}

export function DemoExperienceGuide({ variant = 'page' }: Props) {
  const compact = variant === 'compact'

  return (
    <div
      className={`rounded-xl border border-primary/20 bg-primary-muted/40 ${
        compact ? 'px-4 py-3.5' : 'px-5 py-4 sm:px-6 sm:py-5'
      }`}
      role="note"
    >
      <div className={`flex gap-3 ${compact ? 'items-start' : 'items-start sm:items-center'}`}>
        <span
          className={`shrink-0 flex items-center justify-center rounded-full bg-primary text-white font-bold ${
            compact ? 'w-8 h-8 text-sm' : 'w-9 h-9 text-base'
          }`}
          aria-hidden
        >
          ✓
        </span>
        <div className="min-w-0">
          <p
            className={`font-semibold text-gray-900 ko-modal-copy ${
              compact ? 'text-sm' : 'text-sm sm:text-base'
            }`}
          >
            {DEMO_EXPERIENCE_COPY.guideTitle}
          </p>
          <p
            className={`mt-1 text-gray-600 ko-modal-copy leading-relaxed ${
              compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-[15px]'
            }`}
          >
            {DEMO_EXPERIENCE_COPY.guideBody}
          </p>
        </div>
      </div>
    </div>
  )
}
