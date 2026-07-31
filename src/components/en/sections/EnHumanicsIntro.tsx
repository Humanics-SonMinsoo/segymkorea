/**
 * Top-of-page Humanics ? SEGYM relationship (EN site requirement)
 */
export function EnHumanicsIntro() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-4">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">About Humanics</p>
            <a
              href="https://www.humanics.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
              aria-label="Humanics Co., Ltd."
            >
              <img
                src="/images/brand/humanics-logo-h.jpg"
                alt="HUMANICS"
                className="h-20 sm:h-24 md:h-28 w-auto max-w-full object-contain"
              />
            </a>
            <p className="mt-4 text-base text-gray-500">Humanics Co., Ltd. · Korea</p>
          </div>
          <div className="lg:col-span-8 space-y-5">
            <p className="text-xl sm:text-2xl md:text-[1.65rem] font-semibold text-gray-900 leading-snug">
              SEGYM is the fitness robotics brand developed and operated by Humanics.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Humanics builds human?technology fusion robotics that elevate everyday life. From precision digital
              loading to AI-guided training insight, SEGYM brings that mission onto the gym floor ? for elite
              athletes, everyday members, and rehabilitation settings alike.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-1">
              <p className="text-sm sm:text-base text-gray-500">
                HQ &amp; R&amp;D in Gyeongsan · Sales office in Gwangmyeong
              </p>
              <a
                href="https://www.humanics.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 self-start rounded-lg border-2 border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Visit Humanics website
                <span aria-hidden className="text-base leading-none">
                  ?
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
