import Link from 'next/link'
import { ProductSpecSheet } from '@/components/product/ProductSpecSheet'

/**
 * 스미스 로봇(SR) 제품 상세 본문 (스펙시트 포함)
 */
export function ProductSmithIntroContent() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <div
        id="smith"
        className="rounded-2xl border border-gray-100 overflow-hidden bg-gray-50 shadow-md hover:shadow-lg transition-shadow scroll-mt-24"
      >
        <div className="aspect-[16/10] bg-gray-200 relative">
          <img
            src="/images/segym_new.png"
            alt="세짐 스미스 로봇 SR"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 sm:p-8 bg-white border-t border-gray-100">
          {/* 페이지 히어로 h1과 제품명 중복 방지 — 스크린리더용 소제목만 유지 */}
          <h2 className="sr-only">제품 개요</h2>
          <p className="section-body text-gray-600">
            한 대로 스쿼트부터 랫풀다운까지 전신 운동이 가능한 AI 스마트 운동로봇입니다.
            <br />
            메인 페이지에서 소개하는 기능과 사례를 함께 참고해 주세요.
          </p>
        </div>
      </div>

      <section id="specs" className="scroll-mt-24">
        <h2 className="section-title text-gray-900 mb-2">스펙시트</h2>
        <ProductSpecSheet />
      </section>

      <p className="section-body text-gray-600">
        <Link href="/" className="text-primary font-semibold hover:underline">
          홈
        </Link>
        에서 세짐의 장점, 고객 사례, 도입 혜택도 함께 살펴보실 수 있습니다.
      </p>
    </div>
  )
}
