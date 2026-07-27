import { SEGYM_DAY_EVENT_IMAGE } from '@/data/segym-day'
import { SegymDayEventIntro } from '@/components/segym-day/SegymDayEventIntro'

export function SegymDayEventSection() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="border-b border-gray-100 px-4 sm:px-6 py-3.5">
        <h2 className="text-lg font-bold text-gray-900">SEGYM DAY 이벤트 안내</h2>
      </div>

      <div className="relative w-full aspect-[3/4] sm:aspect-[16/10] bg-gray-900 overflow-hidden">
        <img
          src={SEGYM_DAY_EVENT_IMAGE}
          alt="대전 원퍼센트피트니스 SEGYM DAY"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>

      <div className="px-4 sm:px-6 py-5 sm:py-6">
        <SegymDayEventIntro />
      </div>
    </section>
  )
}
