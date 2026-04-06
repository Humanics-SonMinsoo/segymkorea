import { SiteSubPage } from '@/components/layout/SiteSubPage'
import { ProductIndexContent } from '@/components/product/ProductIndexContent'

export const metadata = {
  title: '제품소개 | 세짐 SEGYM',
  description: 'AI 스마트 운동로봇 세짐(SEGYM) 제품 라인업 및 상세 소개',
}

export default function ProductPage() {
  return (
    <SiteSubPage variant="bar" title="제품소개">
      <ProductIndexContent />
    </SiteSubPage>
  )
}
