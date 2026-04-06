export default function UseCases() {
  const useCases = [
    {
      title: '헬스장',
      description: '회원들에게 프리미엄 트레이닝 경험을 제공하세요',
      icon: '🏋️',
    },
    {
      title: '병원/재활시설',
      description: '안전하고 정밀한 재활 트레이닝이 가능합니다',
      icon: '🏥',
    },
    {
      title: '학교/공공기관',
      description: '체육 시설에 최적화된 스마트 운동 기구',
      icon: '🏫',
    },
    {
      title: '개인 공간',
      description: '집에서도 전문가 수준의 헬스 트레이닝',
      icon: '🏠',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            세짐이 필요한 곳
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            다양한 환경에서 세짐을 활용하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{useCase.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {useCase.title}
              </h3>
              <p className="text-gray-600">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
