import Link from 'next/link'
import { ProductComingSoonCard } from '@/components/product/ProductComingSoonCard'
import { PRICING_PRODUCTS } from '@/data/pricing-products'

export function PricingProductGallery() {
  return (
    <section aria-labelledby="pricing-gallery-title">
      <h2 id="pricing-gallery-title" className="section-title text-xl sm:text-2xl text-gray-900">
        제품별 가격 안내
      </h2>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-gray-600 ko-modal-copy">
        아래 카드를 누르면 해당 제품 가격 안내 페이지로 이동합니다.
      </p>

      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 list-none p-0 m-0">
        {PRICING_PRODUCTS.map((p) => (
          <li key={p.id} className="min-h-0">
            <Link
              href={`/pricing/${p.id}`}
              className="group flex h-full min-h-0 w-full flex-col text-left rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="aspect-[16/10] shrink-0 bg-gray-100 overflow-hidden">
                <img
                  src={p.imageSrc}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  role="presentation"
                />
              </div>
              <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
                <h3 className="card-title text-lg group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="mt-2 text-sm text-gray-600 ko-modal-copy leading-relaxed line-clamp-3 whitespace-pre-line">
                  {p.summary}
                </p>

                {p.galleryPriceMain ? (
                  <div className="mt-4 flex flex-wrap items-end gap-x-1.5 gap-y-0">
                    <span className="text-2xl sm:text-[1.75rem] font-extrabold text-gray-900 tracking-tight tabular-nums">
                      {p.galleryPriceMain}
                    </span>
                    {p.galleryPriceUnit ? (
                      <span className="text-sm font-semibold text-gray-500 pb-1">/ {p.galleryPriceUnit}</span>
                    ) : null}
                  </div>
                ) : (
                  <p className="mt-4 text-base font-semibold text-gray-700 ko-modal-copy">
                    {p.galleryPriceFallback ?? '문의 시 안내'}
                  </p>
                )}

                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary">
                  가격 안내 보기
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
        <li className="min-h-0">
          <ProductComingSoonCard layout="gallery" />
        </li>
      </ul>
    </section>
  )
}
