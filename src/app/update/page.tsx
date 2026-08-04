import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { UpdatePageContent } from '@/components/update/UpdatePageContent'
import { UPDATE_2026_COPY } from '@/data/update-2026'

export const metadata: Metadata = {
  title: `${UPDATE_2026_COPY.pageTitle} | 세짐 SEGYM`,
  description: UPDATE_2026_COPY.pageDescription,
  openGraph: {
    title: UPDATE_2026_COPY.pageTitle,
    description: UPDATE_2026_COPY.pageDescription,
    type: 'website',
    locale: 'ko_KR',
  },
}

/** 띠배너(~40px) + 네비(64px) */
const HEADER_OFFSET = 'pt-[6.5rem] sm:pt-[6.25rem]'

export default function UpdatePage() {
  return (
    <>
      <Header />
      <main className={`min-h-screen ${HEADER_OFFSET}`}>
        <UpdatePageContent />
      </main>
      <Footer />
    </>
  )
}
