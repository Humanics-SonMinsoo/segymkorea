import Link from 'next/link'
import { ProductComingSoonCard } from '@/components/product/ProductComingSoonCard'

const SR_DESC_TAIL = '한 대에서.'

export default function ProductLineup() {
  const products = [
    {
      name: '스미스 로봇 (SR)',
      description: '세짐 카테고리의 대표 제품. AI 스마트 운동로봇으로 전신 운동을 한 대에서.',
      image: '/images/segym_new.png',
      category: '세짐',
      href: '/product/smith',
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title mb-2 text-center">
          SEGYM 제품 라인업
        </h2>
        <p className="section-subtitle text-center mb-10">
          AI 스마트 운동로봇 SEGYM의 제품을 만나보세요
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <Link
              key={index}
              href={product.href}
              className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-5">
                <span className="section-caption font-medium text-primary uppercase tracking-wide">
                  {product.category}
                </span>
                <h3 className="card-title font-bold mt-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="section-body text-sm md:text-base mt-2">
                  {product.description.endsWith(SR_DESC_TAIL) ? (
                    <>
                      {product.description.slice(0, -SR_DESC_TAIL.length)}
                      <span className="whitespace-nowrap">{SR_DESC_TAIL}</span>
                    </>
                  ) : (
                    product.description
                  )}
                </p>
              </div>
            </Link>
          ))}
          <ProductComingSoonCard layout="landing" />
        </div>
      </div>
    </section>
  )
}
