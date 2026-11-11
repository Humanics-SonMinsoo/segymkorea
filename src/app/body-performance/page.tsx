import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { BodyPerformancePage } from '@/components/body-performance/BodyPerformancePage'
import { KO_HEADER_OFFSET_CLASS } from '@/data/update-2026'

export const metadata: Metadata = {
  title: '체성능 측정 | 세짐 SEGYM',
  description:
    '회원들의 운동 수행능력을 데이터로 관리해 보세요. 세짐 점수와 상세 데이터로 현재 상태와 다음 운동 목표를 함께 볼 수 있어요.',
  openGraph: {
    title: '회원들의 운동 수행능력을 데이터로 관리해 보세요 | 세짐 체성능 측정',
    description:
      '세짐 점수와 상세 데이터로 회원의 현재 상태를 보고, 다음 운동 목표까지 함께 관리할 수 있어요.',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function Page() {
  return (
    <>
      <Header />
      <main className={`min-h-screen ${KO_HEADER_OFFSET_CLASS}`}>
        <BodyPerformancePage />
      </main>
      <Footer />
    </>
  )
}
