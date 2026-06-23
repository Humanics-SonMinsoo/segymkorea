import { SiteSubPage } from '@/components/layout/SiteSubPage'
import { DemoExperienceContent } from '@/components/experience/DemoExperienceContent'
import { DEMO_EXPERIENCE_COPY } from '@/lib/demo-experience-copy'

export const metadata = {
  title: `${DEMO_EXPERIENCE_COPY.pageTitle} | 세짐 SEGYM`,
  description: DEMO_EXPERIENCE_COPY.pageDescription,
}

export default function ExperiencePage() {
  return (
    <SiteSubPage
      variant="light"
      contentMaxWidth="wide"
      title={DEMO_EXPERIENCE_COPY.pageTitle}
      description={DEMO_EXPERIENCE_COPY.pageDescription}
    >
      <DemoExperienceContent />
    </SiteSubPage>
  )
}
