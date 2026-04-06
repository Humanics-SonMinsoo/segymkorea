'use client'

import { useState, useRef, useEffect } from 'react'

export default function SegymStrengths() {
  const [activeStrength, setActiveStrength] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageLoadFailed, setImageLoadFailed] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // 탭 전환 시: 활성 이미지 로드 실패 플래그만 초기화 (다시 시도)
  useEffect(() => {
    setImageLoadFailed(false)
  }, [activeStrength])
  
  // 첫 번째 카테고리만 사용 (나중에 두 번째도 추가 가능)
  const activeCategory = 0

  const categories = [
    {
      title: '운동할 때 편리한 부분',
      strengths: [
        {
          name: '원판 없이, 터치로 무게변경',
          description: '터치 한 번으로 최대 260kg까지 무게를 설정할 수 있습니다.\n원판을 따로 갈아끼울 필요 없이 간편하게 운동하세요.',
          image: '/images/strengths/touch.png',
          icon: '⚖️',
        },
        {
          name: '자동 드롭세트, 피라미드세트',
          description: '세팅 없이 자동으로 무게가 바뀌는 드롭세트와 피라미드세트로 고강도 훈련이 가능합니다.\n운동 중간에 멈출 필요 없이 세짐이 세트별 무게를 알아서 조절해 드립니다.',
          image: '/images/strengths/drop2.png',
          icon: '📉',
        },
        {
          name: '세짐으로 느껴보는 황제헬스',
          description: '무게 변경에 힘을 쓸 필요가 없고, 깔릴 걱정도 없기에\n운동 강도를 극대화하는 것에만 집중하실 수 있습니다.',
          image: '/images/strengths/king_spot3.png',
          icon: '👑',
        },
        {
          name: '불균형 체크, 운동 자동기록',
          description: 'AI가 운동 자세를 실시간으로 분석하고 기록합니다.\n좌우 불균형을 체크하여 안전하고 효과적인 운동을 도와드립니다.',
          image: '/images/strengths/tracking2.png',
          icon: '📊',
        },
        {
          name: '스쿼트와 랫풀다운을 동시에',
          description: '중력의 방향을 반전시키는 디지털 하중 출력 기술로\n스쿼트부터 랫풀다운까지, 전신의 모든 운동이 가능합니다.',
          image: '/images/strengths/squat_pulldown.png',
          icon: '🏋️',
        },
      ],
    },
    {
      title: '운동기록, 측정',
      strengths: [
        {
          name: '장점 1',
          description: '설명을 입력하세요',
          image: '/images/strengths/placeholder.png',
          icon: '✨',
        },
        {
          name: '장점 2',
          description: '설명을 입력하세요',
          image: '/images/strengths/placeholder.png',
          icon: '✨',
        },
        {
          name: '장점 3',
          description: '설명을 입력하세요',
          image: '/images/strengths/placeholder.png',
          icon: '✨',
        },
        {
          name: '장점 4',
          description: '설명을 입력하세요',
          image: '/images/strengths/placeholder.png',
          icon: '✨',
        },
      ],
    },
  ]

  const currentStrengths = categories[activeCategory].strengths
  const currentContent = currentStrengths[activeStrength]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 메인 카피 & 서브 카피 */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            세짐으로 운동이 더욱 편해집니다
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            세짐의 장점을 한 눈에 확인하세요
          </p>
        </div>

        {/* 데스크톱: 채널톡 스타일 레이아웃 */}
        <div className="hidden lg:flex gap-8">
          {/* 왼쪽: 큰 콘텐츠 영역 */}
          <div className="flex-1 bg-gray-50 rounded-xl p-8 min-h-[500px]">
            <div className="w-full h-72 bg-white rounded-lg mb-6 overflow-hidden shadow-sm">
              {imageLoadFailed ? (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  이미지 준비 중
                </div>
              ) : (
                <div className="relative w-full h-full bg-gray-100">
                  {currentStrengths.map((strength, index) => (
                    <img
                      key={strength.image}
                      src={strength.image}
                      alt={activeStrength === index ? strength.name : ''}
                      loading={index === activeStrength ? 'eager' : 'lazy'}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${
                        activeStrength === index
                          ? 'z-[1] opacity-100'
                          : 'z-0 opacity-0 pointer-events-none'
                      }`}
                      onError={() => {
                        if (index === activeStrength) setImageLoadFailed(true)
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <h3 className="card-title text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-xl md:text-2xl">{currentContent.icon}</span>
              {currentContent.name}
            </h3>
            <p className="section-body lg:whitespace-pre-line">
              {currentContent.description}
            </p>
          </div>

          {/* 오른쪽: 채널톡 스타일 버튼 (흰색 배경, 호버 시 파란글자+그림자, 테두리 없음) */}
          <div className="w-80 space-y-3">
            {currentStrengths.map((strength, index) => (
              <button
                key={index}
                onClick={() => setActiveStrength(index)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 border-0 ${
                  activeStrength === index
                    ? 'bg-primary-muted text-primary shadow-md'
                    : 'bg-white text-gray-700 hover:bg-primary-muted/70 hover:text-primary hover:shadow-md active:bg-primary-muted active:text-primary active:shadow-md'
                }`}
              >
                <div className="card-title font-semibold flex items-center gap-2">
                  <span className="text-lg">{strength.icon}</span>
                  {strength.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 모바일/태블릿: 가로 스크롤 (카드 크게, 옆 카드 살짝 보이게) */}
        <div className="lg:hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 pl-4 pr-2 mb-6"
            style={{ scrollSnapType: 'x mandatory' }}
            onScroll={(e) => {
              const container = e.currentTarget
              const first = container.firstElementChild as HTMLElement
              const cardWidth = first ? first.offsetWidth : 320
              const gap = 16
              const slide = Math.round(container.scrollLeft / (cardWidth + gap))
              setCurrentSlide(Math.min(slide, currentStrengths.length - 1))
            }}
          >
            {currentStrengths.map((strength, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[calc(100vw-56px)] max-w-[380px] bg-gray-50 rounded-xl p-6"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="w-full h-52 bg-white rounded-lg mb-4 overflow-hidden shadow-sm">
                  <img
                    src={strength.image}
                    alt={strength.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                </div>
                <h3 className="card-title font-bold mb-2 flex items-center gap-2">
                  <span>{strength.icon}</span>
                  {strength.name}
                </h3>
                <p className="section-body text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {strength.description}
                </p>
              </div>
            ))}
          </div>

          {/* 점 표시 (페이지네이션) */}
          <div className="flex justify-center gap-2">
            {currentStrengths.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const first = scrollContainerRef.current.firstElementChild as HTMLElement
                    const cardWidth = first ? first.offsetWidth : 320
                    const gap = 16
                    scrollContainerRef.current.scrollTo({
                      left: index * (cardWidth + gap),
                      behavior: 'smooth',
                    })
                    setCurrentSlide(index)
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentSlide === index
                    ? 'bg-primary w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`슬라이드 ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
