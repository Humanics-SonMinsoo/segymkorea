import { SiteSubPage } from '@/components/layout/SiteSubPage'
import { DemoExperienceContent } from '@/components/experience/DemoExperienceContent'

export const metadata = {
  title: '세짐 체험신청 | 세짐 SEGYM',
  description:
    '세짐이 설치된 전국 시연 센터에서 직접 체험해 보세요. 원하시는 센터와 일정을 남겨 주시면 담당자가 연락드립니다.',
}

export default function ExperiencePage() {
  return (
    <SiteSubPage
      variant="light"
      contentMaxWidth="wide"
      title="세짐 체험신청"
      description={
        '세짐이 설치된 센터에서 직접 체험해 보실 수 있습니다.\n센터를 선택하고 희망 일정을 남겨 주시면 담당자가 확인 후 연락드립니다.'
      }
    >
      <DemoExperienceContent />
    </SiteSubPage>
  )
}
