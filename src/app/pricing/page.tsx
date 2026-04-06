import { SiteSubPage } from '@/components/layout/SiteSubPage'
import { PricingIndexContent } from '@/components/pricing/PricingIndexContent'

export const metadata = {
  title: '가격안내 | 세짐 SEGYM',
  description: '세짐(SEGYM) 스미스 로봇(SR) 가격 및 도입 안내.',
}

export default function PricingPage() {
  return (
    <SiteSubPage variant="bar" title="가격안내">
      <PricingIndexContent />
    </SiteSubPage>
  )
}
