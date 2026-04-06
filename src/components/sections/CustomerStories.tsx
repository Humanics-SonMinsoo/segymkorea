'use client'

export default function CustomerStories() {
  const stories = [
    {
      name: '시흥 프렌드짐 공헌 트레이너',
      handle: '@friend.fit',
      summary: '수업 퀄리티가 확실히 높아졌습니다. 터치 한 번으로 세팅이 끝나 회원 운동 지도에만 집중할 수 있게 되었고, 세짐이 자동으로 운동을 기록해 주어 일지 작성 없이 수업에만 몰입할 수 있습니다. 도입을 정말 잘했다는 생각이 듭니다.',
    },
    {
      name: '청담동 JW짐 이정원 대표님',
      handle: '@jw_m.s.l',
      summary: '회원분들이 더욱 전문적으로 관리받는다는 느낌을 받고 계십니다. 직접 짠 루틴을 전송하고 수행 데이터를 받아볼 수 있어, PT 시간 외에도 회원 운동을 체계적으로 관리할 수 있습니다. 큰 힘 없이 수업 전문성이 자연스럽게 높아져 만족스럽습니다.',
    },
    {
      name: '의왕 우디핏 강지호 대표님',
      handle: '@woodyfit_lab',
      summary: '소형 PT샵이라 여러 대 기구 확보가 어려웠는데, 세짐 한 대로 프리웨이트, 랫풀다운, 유산소까지 가능합니다. 비용 절감과 공간 활용이 매우 효율적입니다. 1인 PT샵 운영자분들께 강력히 추천드립니다.',
    },
    {
      name: '역곡 트러스트짐 권석현 대표님',
      handle: '@trust__kwon',
      summary: '휴머닉스 케어로 2년간 무상 A/S와 모터 교체를 지원받아 유지보수 걱정이 없습니다. 소프트웨어가 꾸준히 업데이트되어 기구가 구식이 되지 않고 최신 상태를 유지합니다. 센터와 함께 진화하는 자산이라 운영 부담이 적습니다.',
    },
  ]

  // 무한 루프용으로 2세트 (회전초밥처럼 이어지게)
  const duplicatedStories = [...stories, ...stories]

  return (
    <section id="cases" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">
            세짐을 먼저 경험한 센터 대표님들의 이야기
          </h2>
        </div>

        {/* 회전초밥형: 옆으로 계속 흐르는 트랙 */}
        <div className="overflow-hidden -mx-4 md:mx-0">
          <div className="animate-scroll-track flex gap-6 w-max">
            {duplicatedStories.map((story, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px]"
              >
                <div className="p-6 md:p-8 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow h-full">
                  <p className="section-body text-gray-700 mb-6">
                    &ldquo;{story.summary}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="font-bold text-gray-900">{story.name}</p>
                    <p className="section-caption text-primary">{story.handle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
