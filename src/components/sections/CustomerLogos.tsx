'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CustomerLogos() {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})
  
  const customers = [
    {
      name: '수원 올라잇짐',
      description: '프리미엄 트레이닝 경험 제공',
      icon: '🏋️',
      image: '/images/customers/allright.png', // 이미지 경로 (선택사항)
    },
    {
      name: '진천국가대표선수촌',
      description: '국가대표 선수들의 훈련 지원',
      icon: '🏅',
      image: '/images/customers/jincheon.png', // 이미지 경로 (선택사항)
    },
    {
      name: '국민체육진흥공단',
      description: '공공 체육 시설 혁신',
      icon: '🏛️',
      image: '/images/customers/kspo.png', // 이미지 경로 (선택사항)
    },
    {
      name: 'SSG랜더스',
      description: '프로야구단 선수 트레이닝',
      icon: '⚾',
      image: '/images/customers/ssg.png', // 이미지 경로 (선택사항)
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title section-title-2line mb-4" style={{ lineHeight: 1.58 }}>
            <span className="md:hidden">
              헬스장을 넘어<br />
              세짐이 필요한 곳 어디든
            </span>
            <span className="hidden md:inline">
              헬스장을 넘어, 세짐이 필요한 곳 어디든
            </span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            다양한 곳에서 세짐이 사용되고 있습니다
          </p>
        </div>

        {/* 모바일: 가로 스크롤, 데스크톱: 그리드 */}
        <div className="mb-12">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            {customers.map((customer, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] md:w-auto md:flex-shrink bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group cursor-pointer"
              >
              {/* 이미지 영역 - 카드 상단을 꽉 채움 */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                {customer.image && !imageErrors[index] ? (
                  <img
                    src={customer.image}
                    alt={customer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={() => {
                      setImageErrors((prev) => ({ ...prev, [index]: true }))
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="text-6xl">{customer.icon}</div>
                  </div>
                )}
                {/* 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* 텍스트 영역 */}
              <div className="p-6">
                <h3 className="card-title font-bold mb-2 group-hover:text-primary transition-colors">
                  {customer.name}
                </h3>
                <p className="section-body text-sm md:text-base">
                  {customer.description}
                </p>
              </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/installations"
            className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg"
          >
            설치사례 더보기
          </Link>
        </div>
      </div>
    </section>
  )
}
