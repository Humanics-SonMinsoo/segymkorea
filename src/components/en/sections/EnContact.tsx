import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { COMPANY_PUBLIC_EN, EN_NAV } from '@/data/en/site'

export function EnContact() {
  const C = COMPANY_PUBLIC_EN

  return (
    <section id="contact-info" className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Contact</p>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3">
            Get in touch with Humanics
          </h2>
          <p className="section-subtitle">
            Product inquiries, demos, partnerships, and Scan &amp; Score launch updates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          <a
            href={`mailto:${C.email}`}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-primary mb-2">Email</p>
            <p className="text-lg font-semibold text-gray-900 break-all">{C.email}</p>
            <p className="mt-2 text-sm text-gray-500">Best for product &amp; partnership inquiries</p>
          </a>

          <a
            href={`tel:${C.phone}`}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-primary mb-2">Phone</p>
            <p className="text-lg font-semibold text-gray-900">{C.phone}</p>
            <p className="mt-2 text-sm text-gray-500">Korea · business hours (KST)</p>
          </a>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-primary mb-2">Offices</p>
            <p className="text-sm font-semibold text-gray-900 mb-1">HQ &amp; R&amp;D</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">Gyeongsan, Korea</p>
            <p className="text-sm font-semibold text-gray-900 mb-1">Sales office</p>
            <p className="text-sm text-gray-600 leading-relaxed">Gwangmyeong, Korea</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <OpenInquiryButton className="inline-flex justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark">
            {EN_NAV.inquire}
          </OpenInquiryButton>
          <a
            href={`mailto:${C.email}`}
            className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Email {C.email}
          </a>
        </div>
      </div>
    </section>
  )
}
