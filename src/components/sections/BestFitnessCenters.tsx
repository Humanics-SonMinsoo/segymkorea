import Link from 'next/link'

type Center = {
  name: string
  image: string
}

/** 이미지는 설치사례 갤러리 이미지를 사용 (건담짐은 실제 사진 확보 시 교체 예정) */
const CENTERS: Center[] = [
  { name: '원주 호크아이짐', image: '/images/installations/install-24.jpg' },
  { name: '수원 올라잇짐', image: '/images/installations/install-18.png' },
  { name: '동해 트리트라움 피트니스', image: '/images/installations/install-25.jpg' },
  { name: '부산 건담짐', image: '/images/installations/install-04.jpg' },
  { name: '의정부 올인짐', image: '/images/installations/install-23.jpg' },
  { name: '시흥 프렌드짐', image: '/images/installations/install-10.jpg' },
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {CENTERS.map((center) => (
            <div
              key={center.name}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 bg-gray-100"
            >
              <img
                src={center.image}
                alt={`${center.name} 세짐 설치 현장`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" aria-hidden />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="text-white text-base sm:text-lg font-bold ko-modal-copy [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]">
                  {center.name}
                </p>
              </div>
            </div>
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
