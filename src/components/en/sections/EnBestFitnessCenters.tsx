import Link from 'next/link'

const CENTERS = [
  { name: 'Allright Gym (Suwon)', logo: '/images/centers/logo-allright.png' },
  { name: 'Hawk Eye Gym (Wonju)', logo: '/images/centers/logo-hawkeye.png' },
  { name: 'Treatraum Fitness (Donghae)', logo: '/images/centers/logo-treatraum.png' },
  { name: 'All-In Gym (Uijeongbu)', logo: '/images/centers/logo-allin.png' },
  { name: 'Friend Gym (Siheung)', logo: '/images/centers/logo-friend.png' },
  { name: 'Gundam Gym (Busan)', logo: '/images/centers/logo-gundam.png' },
]

export function EnBestFitnessCenters() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title mb-4">Trusted by Korea&apos;s leading fitness centers</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Premium gyms across the country train with SEGYM every day
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
          {CENTERS.map((center) => (
            <Link
              key={center.name}
              href="/en/installations"
              className="group flex flex-col items-center text-center"
            >
              <div className="w-full aspect-square rounded-2xl border border-gray-200/70 shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <img
                  src={center.logo}
                  alt={`${center.name} logo`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-sm sm:text-base font-semibold text-gray-800 transition-colors group-hover:text-primary">
                {center.name}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/en/installations"
            className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg"
          >
            View installations
          </Link>
        </div>
      </div>
    </section>
  )
}
