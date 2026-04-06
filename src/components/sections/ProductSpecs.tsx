export default function ProductSpecs() {
  const models = [
    {
      name: '스탠다드',
      maxWeight: '170kg',
      maxWeightUp: '120kg',
      size: '핏 / 와이드',
    },
    {
      name: '퍼포먼스',
      maxWeight: '260kg',
      maxWeightUp: '210kg',
      size: '와이드 / 자이언트',
    },
    {
      name: '슈퍼스트롱',
      maxWeight: '260kg',
      maxWeightUp: '330kg',
      size: '와이드 / 자이언트',
    },
  ]

  return (
    <section id="specs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            제품 스펙
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto mb-2">
            목적에 맞는 모델을 선택하세요
          </p>
          <p className="section-caption">(이미지 준비 중)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <div
              key={index}
              className="p-8 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-primary transition-colors"
            >
              <h3 className="card-title font-bold mb-6">
                {model.name}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="section-caption text-gray-600 mb-1">최대 하중</p>
                  <p className="section-body font-semibold text-gray-900 text-lg md:text-xl">
                    {model.maxWeight}
                  </p>
                  <p className="section-caption">
                    (상향 {model.maxWeightUp})
                  </p>
                </div>
                <div>
                  <p className="section-caption text-gray-600 mb-1">제품 크기</p>
                  <p className="section-body font-semibold text-gray-900">
                    {model.size}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            커스터마이징 옵션 보기
          </a>
        </div>
      </div>
    </section>
  )
}
