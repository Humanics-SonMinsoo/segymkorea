import { SiteSubPage } from '@/components/layout/SiteSubPage'
import { SegymDayApplyContent } from '@/components/segym-day/SegymDayApplyContent'
import { SEGYM_DAY_COPY, SEGYM_DAY_HERO_IMAGE } from '@/data/segym-day'

export const metadata = {
  title: `${SEGYM_DAY_COPY.pageTitle} | 세짐 SEGYM`,
  description: SEGYM_DAY_COPY.pageDescription,
}

export default function SegymDayPage() {
  return (
    <SiteSubPage
      variant="light"
      contentMaxWidth="wide"
      title={SEGYM_DAY_COPY.pageTitle}
      description={SEGYM_DAY_COPY.pageDescription}
    >
      <div className="mb-8 -mt-2 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <img src={SEGYM_DAY_HERO_IMAGE} alt="SEGYM DAY" className="w-full h-auto block" />
      </div>
      <SegymDayApplyContent />
    </SiteSubPage>
  )
}
