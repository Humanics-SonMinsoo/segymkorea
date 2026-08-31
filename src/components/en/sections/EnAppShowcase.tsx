const FEATURES = [
  {
    title: 'Send tailored routines',
    description: 'Push customized workout programs to members before they arrive.',
    icon: '📱',
  },
  {
    title: 'Receive session results',
    description: 'See how each member performed — automatically captured from SEGYM.',
    icon: '📊',
  },
  {
    title: 'Manage training continuity',
    description:
      'Keep individual progress organized so PT quality stays consistent —\neven on days without in-person sessions.',
    icon: '📈',
  },
]

export function EnAppShowcase() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center">
            <div className="aspect-[9/16] max-w-xs w-full mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-4 shadow-lg">
              <img
                src="/images/en/humania-app-no1.png"
                alt="HUMANIA app interface"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <p className="mt-3 section-caption text-center text-gray-600">SEGYM companion app · HUMANIA</p>
          </div>

          <div className="space-y-8">
            <h2 className="section-title section-title-2line mb-6" style={{ lineHeight: 1.58 }}>
              Even on days without sessions,
              <br />
              your PT keeps going
            </h2>
            <div className="space-y-6">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="card-title mb-1">{feature.title}</h3>
                    <p className="section-body text-base md:text-lg whitespace-pre-line">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
