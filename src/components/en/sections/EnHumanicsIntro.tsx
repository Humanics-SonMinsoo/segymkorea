/**
 * Top-of-page Humanics ↔ SEGYM relationship (EN site requirement)
 */
export function EnHumanicsIntro() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">About Humanics</p>
            <a
              href="https://www.humanics.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-2xl bg-black p-5 sm:p-6 shadow-sm ring-1 ring-black/10 hover:ring-primary/40 transition-shadow"
              aria-label="Humanics Co., Ltd."
            >
              <img
                src="/images/brand/humanics-logo.png"
                alt="HUMANICS"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </a>
            <p className="mt-3 text-sm text-gray-500">Humanics Co., Ltd. · Korea</p>
          </div>
          <div className="lg:col-span-8 space-y-4">
            <p className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug">
              SEGYM is the fitness robotics brand developed and operated by Humanics.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Humanics builds human–technology fusion robotics that elevate everyday life. From precision digital
              loading to AI-guided training insight, SEGYM brings that mission onto the gym floor — for elite
              athletes, everyday members, and rehabilitation settings alike.
            </p>
            <p className="text-sm text-gray-500">
              HQ &amp; R&amp;D in Gyeongsan · Sales office in Gwangmyeong ·{' '}
              <a
                href="https://www.humanics.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium underline-offset-2 hover:underline"
              >
                humanics.kr
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
