import Link from 'next/link'
import { BODY_PERFORMANCE_IMAGES, BODY_PERFORMANCE_PATH } from '@/data/body-performance'

/** 홈 — 네거티브 홍보 띠를 대체하는 체성능 측정 소개 카드 */
export function BodyPerformanceHomeCard() {
  return (
    <section className="bg-primary-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-primary mb-3 ko-modal-copy">세짐 소프트웨어 업데이트</p>
            <h2 className="section-title ko-modal-copy">내 벤치프레스는 몇 점일까요?</h2>
            <p className="mt-5 section-body text-gray-700 ko-modal-copy">
              운동 수행능력을 세짐 점수로 확인해 보세요. 힘과 속도, 가동범위, 좌우 균형까지 살펴보고 회원의 다음
              운동 목표를 함께 정할 수 있어요.
            </p>
            <div className="mt-8">
              <Link
                href={BODY_PERFORMANCE_PATH}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
              >
                체성능 측정 더 보기
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <figure className="min-w-0">
            <img
              src={BODY_PERFORMANCE_IMAGES.scoreCard}
              alt="체성능 점수 예시. 어깨 세짐 점수 742점과 힘, 속도, 가동범위, 좌우균형 막대"
              className="w-full h-auto rounded-2xl"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
