export function EnTrustHighlights() {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl text-gray-900">
            Why operators trust SEGYM
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <article className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6 sm:p-8 md:p-10 flex flex-col h-full">
            <span className="text-3xl mb-4" aria-hidden>
              📅
            </span>
            <h3 className="section-title text-xl sm:text-2xl text-gray-900 mb-3">
              From contract to install in about{' '}
              <span className="text-primary">one month</span>
            </h3>
            <p className="section-caption font-semibold text-primary/90 uppercase tracking-wide text-xs mb-4">
              Deployment timeline, planned with your center
            </p>
            <div className="space-y-4 section-body text-gray-600 leading-relaxed flex-1">
              <p>
                After contract, we typically complete installation and on-site training within{' '}
                <strong className="text-gray-900">about a month</strong>.
                Because SEGYM is <strong className="text-gray-900">manufactured in Korea</strong>, you avoid long
                import lead times — so you can move from decision to live operation on a reliable schedule.
              </p>
              <p>
                Every facility has a different opening timeline. We align the plan to your site conditions and
                options — and when schedules are tight, we coordinate to move as quickly as possible.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6 sm:p-8 md:p-10 flex flex-col h-full">
            <span className="text-3xl mb-4" aria-hidden>
              🇰🇷
            </span>
            <h3 className="section-title text-xl sm:text-2xl text-gray-900 mb-3">
              <span className="text-primary">Designed &amp; built in Korea</span>
            </h3>
            <p className="section-caption font-semibold text-primary/90 uppercase tracking-wide text-xs mb-4">
              Domestic engineering with accountable quality
            </p>
            <div className="space-y-4 section-body text-gray-600 leading-relaxed flex-1">
              <p>
                SEGYM is <strong className="text-gray-900">designed in Korea</strong>, assembled and inspected in our
                factory, then delivered to your floor. We pursue top-tier quality for real gym environments — and keep
                improving both product and service.
              </p>
              <p>
                After installation, the <strong className="text-gray-900">Humanics SEGYM team</strong> supports technical
                questions and operations directly. Design, manufacturing, and post-delivery care stay under one roof.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
