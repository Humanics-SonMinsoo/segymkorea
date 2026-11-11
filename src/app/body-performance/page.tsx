import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { BodyPerformancePage } from '@/components/body-performance/BodyPerformancePage'
import { KO_HEADER_OFFSET_CLASS } from '@/data/update-2026'

export const metadata: Metadata = {
  title: '체성능 측정 | 세짐 SEGYM',
  description:
    '측정할 부위를 고르고 화면 안내에 따라 운동해 보세요. 세짐 점수와 상세 분석으로 힘, 속도, 가동범위, 좌우 균형을 확인합니다.',
  openGraph: {
    title: '내 벤치프레스는 몇 점일까요? | 세짐 체성능 측정',
    description:
      '세짐 점수와 상세 분석으로 오늘의 운동을 돌아보고, 다음에 보완할 점을 확인할 수 있어요.',
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
