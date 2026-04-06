export type ProductGalleryItem = {
  id: string
  slug: string
  /** 카드, 상세 상단 제목 */
  name: string
  /** 갤러리 카드 설명 */
  summary: string
  imageSrc: string
  imageAlt: string
}

/** 제품소개 인덱스 갤러리에 노출할 라인업 */
export const PRODUCT_GALLERY_ITEMS: ProductGalleryItem[] = [
  {
    id: 'smith',
    slug: 'smith',
    name: '세짐 스미스 로봇 (SR)',
    summary:
      '전신 스미스형 AI 스마트 운동로봇.\n한 대로 스쿼트부터 랫풀다운까지.\n메인에서 소개하는 기능과 사례를 함께 참고해 주세요.',
    imageSrc: '/images/segym_new.png',
    imageAlt: '세짐 스미스 로봇 SR',
  },
]

export function getProductGalleryItemBySlug(slug: string): ProductGalleryItem | undefined {
  return PRODUCT_GALLERY_ITEMS.find((p) => p.slug === slug)
}
