import { COMPANY_PUBLIC_EN } from '@/data/en/site'

export function EnContact() {
  const C = COMPANY_PUBLIC_EN

  return (
    <section id="contact-info" className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Contact</p>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3">
            Get in touch with Humanics
          </h2>
          <p className="section-subtitle mb-8">
            Product inquiries, demos, partnerships, and Scan &amp; Score launch updates
          </p>
          <a
            href={`mailto:${C.email}`}
            className="inline-flex flex-col items-center rounded-2xl border border-gray-200 bg-white px-8 py-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-primary mb-2">Email</p>
            <p className="text-lg sm:text-xl font-semibold text-gray-900 break-all">{C.email}</p>
          </a>
        </div>
      </div>
    </section>
  )
}
