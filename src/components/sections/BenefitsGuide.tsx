export default function BenefitsGuide() {
  const benefits = [
    { text: '24개월 후 모터 무상 교체', icon: '🔧' },
    { text: '24개월 무상 A/S 및 주기적인 방문 점검', icon: '✓' },
    { text: '센터 이전 시 1회 무상 이전', icon: '🚚' },
    { text: '트레이너 무상 교육 프로그램', icon: '📚' },
    { text: '시승 체험 공간 제공 시 판매 성과 커미션', icon: '💼' },
    { text: '센터 홍보 및 SNS 콘텐츠 무상 지원', icon: '📱' },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title text-primary mb-3">
            월 30만원대로 세짐 운동로봇을 도입해보세요.
          </h2>
          <p className="section-subtitle">
            <span className="bg-primary/20 px-1.5 py-0.5 rounded">+다양한 혜택 HUMANICS CARE</span>
          </p>
        </div>

        <p className="text-center section-body text-gray-700 mb-8 max-w-2xl mx-auto">
          지금 도입하시면 아래 6가지 혜택이 모두 포함됩니다.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {benefits.map((item, index) => (
            <li key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <span className="text-2xl">{item.icon}</span>
              <span className="section-body text-gray-800 font-medium">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
