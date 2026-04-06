export default function AppShowcase() {
  const appFeatures = [
    {
      title: '맞춤형 루틴 전송',
      description: '회원들에게 미리 만들어 둔 맞춤형 운동 루틴을 보낼 수 있습니다.',
      icon: '📱',
    },
    {
      title: '운동 수행 결과 수신',
      description: '회원들의 운동 수행 결과를 받아보실 수 있습니다.',
      icon: '📊',
    },
    {
      title: '개인 운동 관리',
      description: '회원들의 개인 운동까지 체계적으로 관리하여,\nPT의 전문성과 연속성을 높여보세요.',
      icon: '📈',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: App Preview */}
          <div className="flex flex-col items-center">
            <div className="aspect-[9/16] max-w-xs w-full mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-4 shadow-lg">
              <img
                src="/images/home.png"
                alt="휴머니아 앱 인터페이스"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <p className="mt-3 section-caption text-center text-gray-600">
              세짐 전용 앱 &lsquo;휴머니아&rsquo;
            </p>
          </div>

          {/* Right: Features */}
          <div className="space-y-8">
            <div>
              <h2 className="section-title section-title-2line mb-6" style={{ lineHeight: 1.58 }}>
                수업이 없는 날에도
                <br />
                당신의 PT는 계속됩니다
              </h2>
            </div>

            <div className="space-y-6">
              {appFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="card-title mb-1">
                      {feature.title}
                    </h3>
                    <p className="section-body text-base md:text-lg whitespace-pre-line">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
