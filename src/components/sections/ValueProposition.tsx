export default function ValueProposition() {
  const values = [
    {
      title: '원판 없는 구조',
      description: '터치 한 번으로 최대 260kg까지 무게 설정이 가능합니다.',
      icon: '⚡',
    },
    {
      title: '모든 운동을 하나로',
      description: '데드리프트, 벤치프레스, 스쿼트, 풀다운 등 모든 운동을 한 대에서.',
      icon: '💪',
    },
    {
      title: '공간과 비용 절약',
      description: '여러 기구가 필요 없어 공간 활용도와 운영 효율성이 극대화됩니다.',
      icon: '📐',
    },
    {
      title: 'AI 맞춤 트레이닝',
      description: '실시간 데이터 분석으로 개인 맞춤형 운동 프로그램을 제공합니다.',
      icon: '🤖',
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ONE MACHINE, ALL SOLUTION
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            세짐 한 대로 모든 헬스 운동을 해결하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
