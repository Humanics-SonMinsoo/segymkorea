import type { Metadata } from 'next'
import Link from 'next/link'
import { INSTALLATION_GALLERY } from '@/data/installation-gallery'

export const metadata: Metadata = {
  title: 'SEGYM Installations | Humanics',
  description: 'See SEGYM installations across premium fitness centers, PT studios, and facilities in Korea.',
}

export default function EnInstallationsPage() {
  const items = INSTALLATION_GALLERY

  return (
    <main className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Installations</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          SEGYM in the field
        </h1>
        <p className="mt-5 text-lg text-gray-600 max-w-2xl leading-relaxed">
          From premium gyms to PT studios, public facilities, and pro teams — SEGYM is already training members
          across Korea.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((photo) => (
            <article
              key={photo.id}
              className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  style={
                    photo.thumbnailObjectPosition
                      ? { objectPosition: photo.thumbnailObjectPosition }
                      : undefined
                  }
                />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-gray-900">{photo.title}</h2>
                <p className="mt-1 text-xs text-gray-500 uppercase tracking-wide">{photo.regionKey}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-gray-500">
          Korean gallery with filters:{' '}
          <Link href="/installations" className="text-primary font-medium underline-offset-2 hover:underline">
            segymkorea.com/installations
          </Link>
        </p>
      </section>
    </main>
  )
}
