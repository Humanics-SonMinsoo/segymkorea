export function EnSegymIntro() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="relative mb-8 -mt-12">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/50 to-transparent z-10 pointer-events-none rounded-t-lg" />
          <img
            src="/images/segym_new.png"
            alt="SEGYM Smith Robot SR"
            className="w-full h-auto rounded-lg shadow-lg relative z-0"
          />
          <p className="mt-3 text-center section-caption">SEGYM Smith Robot (SR)</p>
        </div>
        <div className="text-center">
          <p className="section-body text-lg md:text-xl font-bold text-gray-700 max-w-3xl mx-auto">
            SEGYM is an AI smart fitness robot that makes
            <br className="hidden sm:block" />
            strength training safer, smarter, and effortless
          </p>
        </div>
      </div>
    </section>
  )
}
