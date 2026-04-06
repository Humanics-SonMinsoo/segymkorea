export default function SegymIntro() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* 위 섹션과 자연스럽게 연결되는 그라데이션 */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* 이미지 - 상단에 그라데이션 오버레이 */}
        <div className="relative mb-8 -mt-12">
          {/* 이미지 상단 그라데이션 오버레이 */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/50 to-transparent z-10 pointer-events-none rounded-t-lg"></div>
          <img
            src="/images/segym_new.png"
            alt="세짐 스미스 로봇 SR"
            className="w-full h-auto rounded-lg shadow-lg relative z-0"
          />
          <p className="mt-3 text-center section-caption">
            세짐 스미스 로봇 (SR)
          </p>
        </div>
        
        {/* 카피 */}
        <div className="text-center">
          <p className="section-body text-lg md:text-xl font-bold text-gray-700 max-w-3xl mx-auto">
            세짐은 AI 스마트 운동로봇으로 운동을<br />
            안전하고 편리하게 할 수 있도록 도와줍니다
          </p>
        </div>
      </div>
    </section>
  )
}
