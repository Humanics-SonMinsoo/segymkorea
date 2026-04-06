import { notFound } from 'next/navigation'
import { SiteSubPage } from '@/components/layout/SiteSubPage'
import { PricingProductDetailContent } from '@/components/pricing/PricingProductDetailContent'
import { PRICING_PRODUCTS, getPricingProductBySlug } from '@/data/pricing-products'

type PageProps = { params: { slug: string } }

export function generateStaticParams() {
  return PRICING_PRODUCTS.map((p) => ({ slug: p.id }))
}

export function generateMetadata({ params }: PageProps) {
  const product = getPricingProductBySlug(params.slug)
  if (!product) {
    return { title: '가격안내 | 세짐 SEGYM' }
  }
  return {
    title: `${product.name} 가격안내 | 세짐 SEGYM`,
    description: `${product.name} 도입, 월 부담 안내. ${product.summary}`,
  }
}

export default function PricingProductPage({ params }: PageProps) {
  const product = getPricingProductBySlug(params.slug)
  if (!product) {
    notFound()
  }

  return (
    <SiteSubPage
      variant="bar"
      barSkipHero
      title={`${product.name} | 가격안내`}
      backLink={{ href: '/pricing', label: '가격안내 목록' }}
    >
      <PricingProductDetailContent product={product} />
    </SiteSubPage>
  )
}
