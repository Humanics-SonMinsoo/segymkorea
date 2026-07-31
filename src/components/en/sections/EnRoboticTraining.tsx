export function EnRoboticTraining() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title section-title-2line mb-6" style={{ lineHeight: 1.58 }}>
            Why SEGYM excels
            <br />
            for rehab training too
          </h2>
          <p className="section-body max-w-3xl mx-auto tracking-tight">
            SEGYM&apos;s <strong className="text-gray-800">robotic training</strong> analyzes strength in real time
            and generates proportional resistance —
            <br className="hidden md:block" />
            reducing joint stress without harsh rebound.
          </p>
        </div>

        <div className="mb-16 flex flex-col items-center">
          <img
            src="/images/robo.png"
            alt="SEGYM robotic training in action"
            className="w-full max-w-2xl rounded-xl shadow-lg object-cover"
          />
          <p className="mt-3 section-caption">SEGYM robotic training in a real session</p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="border border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-l-4 border-primary bg-gray-50/50 px-8 py-10 md:px-10 md:py-12">
              <p className="section-body text-gray-800 text-lg md:text-xl tracking-tight mb-6 font-normal">
                &ldquo;Because the robot absorbs joint load for me,
                <br />
                I can rehab with far more stability.&rdquo;
              </p>
              <footer className="flex flex-col gap-0.5">
                <span className="text-gray-900 font-semibold">Un-yong Shim</span>
                <span className="section-caption tracking-wide">
                  Director, Korea Sports Medicine Association · Physical therapist
                </span>
              </footer>
            </div>
          </div>
        </div>

        <p className="text-center section-body text-gray-700 text-lg md:text-xl font-medium">
          Bring isokinetic-level training —
          <br />
          once limited to premium rehab clinics — into your facility.
        </p>
      </div>
    </section>
  )
}
