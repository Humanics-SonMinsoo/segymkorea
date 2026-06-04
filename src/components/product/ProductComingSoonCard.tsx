type Layout = 'landing' | 'gallery'

type Props = {
  /** 메인 랜딩 카드 vs 제품소개 갤러리 카드 스타일 */
  layout: Layout
}

/**
 * 신규 유산소 로봇 라인업 — 커밍순 티저 카드 (비클릭)
 */
export function ProductComingSoonCard({ layout }: Props) {
  const isLanding = layout === 'landing'

  return (
    <article
      className={
        isLanding
          ? 'bg-white rounded-xl overflow-hidden shadow-md border-2 border-dashed border-gray-200'
          : 'h-full min-h-0 flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-dashed border-gray-200'
      }
      aria-label="신규 유산소 로봇, 26년 10월 출시 예정"
    >
      <div
        className={
          isLanding
            ? 'aspect-[4/3] shrink-0 bg-gradient-to-br from-gray-100 via-gray-50 to-primary-muted/30 flex flex-col items-center justify-center text-center px-5'
            : 'aspect-[16/10] shrink-0 bg-gradient-to-br from-gray-100 via-gray-50 to-primary-muted/30 flex flex-col items-center justify-center text-center px-5'
        }
      >
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-primary/55">
          Coming soon
        </span>
      </div>

      <div
        className={
          isLanding
            ? 'p-5 border-t border-gray-100 bg-gray-50/60'
            : 'flex-1 flex flex-col p-5 sm:p-6 border-t border-gray-100 bg-gray-50/40 min-h-0'
        }
      >
        <h3
          className={
            isLanding
              ? 'card-title font-bold text-gray-700'
              : 'card-title text-lg font-bold text-gray-700'
          }
        >
          새로운 유산소 로봇,
          <br className="sm:hidden" />{' '}
          <span className="whitespace-nowrap">26년 10월 출시 예정</span>
        </h3>
        {!isLanding ? <div className="flex-1 min-h-[1px]" aria-hidden /> : null}
      </div>
    </article>
  )
}
