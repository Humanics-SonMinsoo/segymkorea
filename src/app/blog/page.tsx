import { SiteSubPage } from '@/components/layout/SiteSubPage'
import { BlogGallery } from '@/components/blog/BlogGallery'

export const metadata = {
  title: '블로그 | 세짐 SEGYM',
  description: '세짐(SEGYM) 도입 후기, 소식, 헬스장 운영 인사이트',
}

export default function BlogPage() {
  return (
    <SiteSubPage
      variant="light"
      title="블로그"
      description={'세짐을 도입한 센터들의 후기와 소식을 전합니다.'}
    >
      <BlogGallery />
    </SiteSubPage>
  )
}
