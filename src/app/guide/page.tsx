import Link from 'next/link'
import { SiteSubPage } from '@/components/layout/SiteSubPage'

export const metadata = {
  title: '사용 가이드 | 세짐 SEGYM',
  description: '세짐(SEGYM) 기기 사용 및 유지보수 안내',
}

export default function GuidePage() {
  return (
    <SiteSubPage
      variant="bar"
      title="사용 가이드"
      description="전원, 터치 패널, 기본 운동 시작 방법 등 운영자와 회원용 안내를 정리합니다."
    >
      <div className="section-body text-gray-600 space-y-4">
        <p>세부 가이드 문서와 영상은 순차적으로 추가 예정입니다.</p>
        <p>
          제품 사양과 모델 비교는{' '}
          <Link href="/product/smith#specs" className="text-primary font-medium hover:underline">
            스펙시트
          </Link>
          를 참고해 주세요. (사용 방법이 아니라 기술 제원 중심입니다.)
        </p>
      </div>
    </SiteSubPage>
  )
}
