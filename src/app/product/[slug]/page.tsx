import { notFound } from 'next/navigation'
import { MetaProductViewBeacon } from '@/components/analytics/MetaProductViewBeacon'
import { SiteSubPage } from '@/components/layout/SiteSubPage'
import { ProductSmithIntroContent } from '@/components/product/ProductSmithIntroContent'
import { PRODUCT_GALLERY_ITEMS, getProductGalleryItemBySlug } from '@/data/product-gallery'

type PageProps = { params: { slug: string } }

export function generateStaticParams() {
  return PRODUCT_GALLERY_ITEMS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: PageProps) {
  const item = getProductGalleryItemBySlug(params.slug)
  if (!item) {
    return { title: '제품소개 | 세짐 SEGYM' }
  }
  return {
    title: `${item.name} | 제품소개 | 세짐 SEGYM`,
    description: `${item.name} — 전신 스미스형 AI 스마트 운동로봇. 기본 사양, 선택 옵션, 스펙시트 안내.`,
  }
}

export default function ProductDetailPage({ params }: PageProps) {
  const item = getProductGalleryItemBySlug(params.slug)
  if (!item) {
    notFound()
  }

  if (item.slug !== 'smith') {
    notFound()
  }

  return (
    <SiteSubPage
      variant="gradient"
      title={`${item.name}`}
      backLink={{ href: '/product', label: '제품소개 목록' }}
    >
      <MetaProductViewBeacon />
      <ProductSmithIntroContent />
    </SiteSubPage>
  )
}
