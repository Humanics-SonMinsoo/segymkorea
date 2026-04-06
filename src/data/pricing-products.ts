export type PricingProduct = {
  id: string
  /** 카드, 모달 제목 */
  name: string
  /** 상세 페이지, 메타 등 한 줄 요약 (갤러리 이미지 위 오버레이에는 사용 안 함) */
  monthlyLine: string
  /** 갤러리 카드: 커머스형 큰 금액 느낌 (예: 30만원대) */
  galleryPriceMain?: string
  /** 갤러리 카드: 단위 (예: 월) — main 옆에 "/ 월" */
  galleryPriceUnit?: string
  /** galleryPriceMain 없을 때 카드용 보조 문구 */
  galleryPriceFallback?: string
  /** 카드 짧은 설명 */
  summary: string
  /** 모달 본문 (문단) */
  details: string[]
  imageSrc: string
  imageAlt: string
  /** 스펙 등 링크 (있을 때만) */
  moreHref?: string
  moreLabel?: string
}

/** 웹에 노출하는 제품만 포함 (비공개 라인은 추가하지 않음) */
export const PRICING_PRODUCTS: PricingProduct[] = [
  {
    id: 'smith',
    name: '세짐 스미스 로봇 (SR)',
    /** 상세 상단 한 줄 (부담 가능한 수준 안내) */
    monthlyLine: '월 30만원대로 도입하실 수 있습니다',
    galleryPriceMain: '30만원대',
    galleryPriceUnit: '월',
    summary: '전신 스미스형 AI 스마트 운동로봇.\n한 대로 스쿼트부터 랫풀다운까지.',
    /** 가격 안내 본문 (한 블록에만 사용) */
    details: [
      '렌탈, 구매, 월 납입 등 도입 형태는 센터 운영에 맞추어 함께 조율해 드립니다.\n초기 부담을 나누실 수 있도록 가능한 범위에서 맞춰 드립니다.',
      '옵션(측면 커버, 퍼포먼스 레벨 업그레이드, 자이언트 높이 등)이나 설치 환경에 따라 금액은 달라질 수 있으며,\n확정된 조건은 견적서로 차근차근 안내드립니다.',
    ],
    imageSrc: '/images/segym_new.png',
    imageAlt: '세짐 스미스 로봇 SR',
    moreHref: '/product/smith',
    moreLabel: '제품소개 / 스펙 보기',
  },
]

export function getPricingProductBySlug(slug: string): PricingProduct | undefined {
  return PRICING_PRODUCTS.find((p) => p.id === slug)
}
