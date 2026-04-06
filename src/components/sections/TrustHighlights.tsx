/**
 * 도입 일정(설치), 국내 생산 강점 — 앰배서더 섹션 직후
 */
export default function TrustHighlights() {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl text-gray-900">
            세짐을 믿고 사용할 수 있는 이유
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <article className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6 sm:p-8 md:p-10 flex flex-col h-full">
            <span className="text-3xl mb-4" aria-hidden>
              📅
            </span>
            <h3 className="section-title text-xl sm:text-2xl text-gray-900 mb-3">
              계약부터 설치까지,{' '}
              <span className="text-primary">한 달 안팎</span>의 스피드
            </h3>
            <p className="section-caption font-semibold text-primary/90 uppercase tracking-wide text-xs mb-4">
              도입 일정, 센터와 함께
            </p>
            <div className="space-y-4 section-body text-gray-600 leading-relaxed flex-1 ko-modal-copy">
              <p>
                계약 이후에는 보통 <strong className="text-gray-900">한 달 전후</strong>에 설치와 현장 교육까지 마치는 일정을
                기준으로 안내드립니다.
                <br />
                장비를 <strong className="text-gray-900">국내에서 생산</strong>하기 때문에, 해외 수입처럼 오래 기다리지 않으셔도 되고{' '}
                <strong className="text-gray-900">오픈 일정에 맞춰 도입부터 가동까지 빠르게 진행</strong>하실 수 있도록 준비하고 있습니다.
              </p>
              <p>
                센터마다 오픈 준비 상황이 다르기 때문에, 현장 조건과 옵션을 함께 살핀 뒤 일정을 맞춰 드립니다.
                <br />
                일정이 촉박하시더라도 가능한 범위에서 <strong className="text-gray-900">최대한 빠르게</strong> 진행할 수 있도록
                조율해 드리고 있습니다.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6 sm:p-8 md:p-10 flex flex-col h-full">
            <span className="text-3xl mb-4" aria-hidden>
              🇰🇷
            </span>
            <h3 className="section-title text-xl sm:text-2xl text-gray-900 mb-3">
              <span className="text-primary">국내 설계와 생산</span>으로 완성한 기술력
            </h3>
            <p className="section-caption font-semibold text-primary/90 uppercase tracking-wide text-xs mb-4">
              국내 설계와 생산, 책임 있는 품질
            </p>
            <div className="space-y-4 section-body text-gray-600 leading-relaxed flex-1 ko-modal-copy">
              <p>
                세짐은 <strong className="text-gray-900">국내에서 설계하고</strong>, 공장에서{' '}
                <strong className="text-gray-900">조립과 검수</strong>를 마친 뒤 현장에 전달합니다.
                <br />
                국내 체육관과 센터 현장에서 쓰이는 장비로서 <strong className="text-gray-900">최고 수준의 퀄리티</strong>를
                지향하며, 품질과 서비스를 멈추지 않고 개선하고 있습니다.
              </p>
              <p>
                도입 이후 사용과 관련한 궁금한 점이나 점검 문의가 필요하실 때 언제든 문의 주시면{' '}
                <strong className="text-gray-900">실시간으로 최대한 빠르게</strong> 응대드리고 있습니다.
                <br />
                <strong className="text-gray-900">휴머닉스 세짐 팀</strong>이 설계와 제조, 출고 이후 기술 문의와 운영 지원까지
                국내에서 전 과정을 직접 총괄합니다.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
