export default function AIFeatures() {
  const features = [
    {
      title: 'AI 모션 트래킹',
      description: '운동 자세를 실시간으로 분석하고 피드백을 제공합니다.',
      image: '모션 트래킹 이미지',
    },
    {
      title: 'AI 무게 조절',
      description: '1kg 단위로 정밀한 무게 조절이 가능합니다.',
      image: '무게 조절 이미지',
    },
    {
      title: '데이터 기반 맞춤 운동',
      description: '운동 기록을 분석하여 개인 맞춤형 프로그램을 제안합니다.',
      image: '데이터 분석 이미지',
    },
    {
      title: '안전 잠금 시스템',
      description: '가상 랙과 낙하 방지 기능으로 안전하게 운동하세요.',
      image: '안전 시스템 이미지',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI 스마트 트레이닝
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            인공지능이 당신의 운동을 분석하고 최적화합니다
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                  <p className="text-gray-400">{feature.image}</p>
                </div>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
