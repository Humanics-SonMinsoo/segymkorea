import { SiteSubPage } from '@/components/layout/SiteSubPage'

export const metadata = {
  title: '블로그 | 세짐 SEGYM',
  description: '세짐(SEGYM) 소식, 헬스장 운영 인사이트',
}

export default function BlogPage() {
  return (
    <SiteSubPage variant="light" title="블로그">
      <p className="section-body text-gray-600">
        세짐 소식, 운동과 운영 관련 콘텐츠를 차례로 발행할 예정입니다.
        <br />
        첫 글은 준비 중입니다.
      </p>
    </SiteSubPage>
  )
}
