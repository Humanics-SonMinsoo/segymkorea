export default function AmbassadorReason() {
  return (
    <section className="py-20 md:py-24 bg-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 왼쪽: 박재훈 이미지 */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <img
                src="/images/park.png"
                alt="올라잇 박재훈"
                className="w-full h-auto rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none" />
            </div>
          </div>

          {/* 오른쪽: 후기 텍스트 */}
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 section-title-2line ko-modal-copy" style={{ lineHeight: 1.58 }}>
              대한민국 1등 보디빌더
              <br />
              박재훈이 세짐을 선택한 이유
            </h2>

            <div className="space-y-5 text-gray-300 leading-relaxed text-base md:text-lg ko-modal-copy">
              <p>
                스포엑스에서 세짐을 처음 만났을 때 정말 놀랐습니다. 일반적인 운동기구가 아닌, AI 기술이 접목된 완전히 새로운 분야였거든요.
              </p>
              <p>
                원판을 갈아끼울 필요 없이 터치 한 번으로 고중량 세팅이 끝나니 오직 운동강도에만 모든 정신을 쏟을 수 있어 저 같은 프로 선수들의 실전 하드코어 훈련에서 빛을 발휘하는 것 같습니다.
              </p>
              <p>
                2026년 시즌 루틴에도 적극 활용해 더 완벽한 몸을 만들 계획입니다. 설레는 보디빌딩 여정, 세짐과 함께 돌격하겠습니다. <span className="text-white font-semibold">올라잇!</span>
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-6 text-sm text-gray-400">
              <span>2025년 MR. Olympia 클래식 피지크 15위</span>
              <span>2024년 MONSTERZYM 클래식 피지크 PRO 1위</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
