export default function PTSales() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title mb-6" style={{ lineHeight: 1.58 }}>
            체성분 분석의 시대를 지나
            <br />
            체성능 분석의 시대가 다가옵니다.
          </h2>
          <p className="section-body max-w-3xl mx-auto">
            체중과 근육량만으로는 설명할 수 없었던 실질적인 운동 퍼포먼스의 변화와 성장을 확인하세요.
          </p>
        </div>

        {/* 리포트 이미지 - 휴머니아 앱과 동일한 폰 틀 */}
        <div className="flex flex-col items-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto w-full">
            <div className="aspect-[9/16] max-w-xs w-full mx-auto bg-[#333333] rounded-3xl p-4 shadow-lg overflow-hidden">
              <img
                src="/images/report1.png"
                alt="SEGYM 소프트웨어 디스플레이"
                className="w-full h-full object-cover object-center rounded-2xl"
              />
            </div>
            <div className="aspect-[9/16] max-w-xs w-full mx-auto bg-[#333333] rounded-3xl p-4 shadow-lg overflow-hidden">
              <img
                src="/images/report2.png"
                alt="SEGYM 소프트웨어 디스플레이"
                className="w-full h-full object-cover object-center rounded-2xl"
              />
            </div>
          </div>
          <p className="mt-3 section-caption text-center text-gray-600">
            SEGYM 소프트웨어 디스플레이
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <p className="section-body text-gray-700 text-center whitespace-pre-line">
            SEGYM이 제시하는 체성능 지표는 단순히 살이 빠졌는지가 아니라
            {'\n'}
            운동을 통해 실제 체력이 얼마나 좋아졌는지,
            {'\n'}
            회원들의 운동 성취감을 극대화하고, 다음 운동을 기대하게 만듭니다.
          </p>
        </div>
      </div>
    </section>
  )
}
