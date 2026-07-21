import Link from 'next/link'

type Center = {
  name: string
  logo: string
}

/** 왼쪽부터 노출 순서: 올라잇짐 - 호크아이짐 - 트리트라움 - 올인짐 - 프렌드짐 - 건담짐 */
const CENTERS: Center[] = [
  { name: '수원 올라잇짐', logo: '/images/centers/logo-allright.png' },
  { name: '원주 호크아이짐', logo: '/images/centers/logo-hawkeye.png' },
  { name: '동해 트리트라움 피트니스', logo: '/images/centers/logo-treatraum.png' },
  { name: '의정부 올인짐', logo: '/images/centers/logo-allin.png' },
  { name: '시흥 프렌드짐', logo: '/images/centers/logo-friend.png' },
  { name: '부산 건담짐', logo: '/images/centers/logo-gundam.png' },
]

export default function BestFitnessCenters() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title mb-4">대한민국 최고의 피트니스 센터와 함께합니다</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            전국 프리미엄 피트니스 센터들이 세짐과 함께하고 있습니다
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
          {CENTERS.map((center) => (
            <Link
              key={center.name}
              href="/installations"
              className="group flex flex-col items-center text-center"
            >
              <div className="w-full aspect-square rounded-2xl border border-gray-200/70 shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <img
                  src={center.logo}
                  alt={`${center.name} 로고`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-sm sm:text-base font-semibold text-gray-800 ko-modal-copy transition-colors group-hover:text-primary">
                {center.name}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
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
