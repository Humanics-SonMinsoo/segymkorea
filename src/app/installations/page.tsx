import { SiteSubPage } from '@/components/layout/SiteSubPage'
import { InstallationGallery } from '@/components/installations/InstallationGallery'

export const metadata = {
  title: '설치사례 | 세짐 SEGYM',
  description: '세짐(SEGYM) 전국 설치 및 도입 현장 사진 갤러리',
}

export default function InstallationsPage() {
  return (
    <SiteSubPage
      variant="light"
      title="설치사례"
      description={
        '세짐이 함께한 현장을 사진으로 만나보실 수 있습니다.\n썸네일을 누르면 크게 볼 수 있습니다.'
      }
    >
      <InstallationGallery />
    </SiteSubPage>
  )
}
