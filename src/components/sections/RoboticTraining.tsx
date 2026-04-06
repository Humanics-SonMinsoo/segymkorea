export default function RoboticTraining() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title section-title-2line mb-6" style={{ lineHeight: 1.58 }}>
            재활 운동에도
            <br />
            세짐이 최고인 이유
          </h2>
          <p className="section-body max-w-3xl mx-auto tracking-tight">
            세짐의 <strong className="text-gray-800">로보틱 트레이닝</strong>은 사용자의 근력 상태를 AI로 실시간 분석하고,
            <br />
            그에 비례한 저항을 생성해 무리한 반동 없이 관절 부담을 최소화합니다.
          </p>
        </div>

        <div className="mb-16 flex flex-col items-center">
          <img
            src="/images/robo.png"
            alt="실제 세짐 로보틱 트레이닝 운동 모습"
            className="w-full max-w-2xl rounded-xl shadow-lg object-cover"
          />
          <p className="mt-3 section-caption">
            실제 세짐 로보틱 트레이닝 운동 모습
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="border border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-l-4 border-primary bg-gray-50/50 px-8 py-10 md:px-10 md:py-12">
              <p className="section-body text-gray-800 text-lg md:text-xl tracking-tight mb-6 font-normal">
                &ldquo;관절에 가해지는 부담을 로봇이 잡아주니,
                <br />
                더 안정적으로 재활 트레이닝을 하고 있어요!&rdquo;
              </p>
              <footer className="flex flex-col gap-0.5 ko-modal-copy">
                <span className="text-gray-900 font-semibold">심운용</span>
                <span className="section-caption tracking-wide">
                  한국스포츠의학협회 이사 겸 물리치료사
                </span>
              </footer>
            </div>
          </div>
        </div>

        <p className="text-center section-body text-gray-700 text-lg md:text-xl font-medium">
          고가의 재활 병원에만 있던 등속성 운동 장비를
          <br />
          이제 센터에서 제공하세요.
        </p>
      </div>
    </section>
  )
}
