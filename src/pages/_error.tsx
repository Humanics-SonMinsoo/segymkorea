import type { NextPageContext } from 'next'

type Props = {
  statusCode?: number
}

/**
 * Pages 라우터 커스텀 오류 페이지 — dev 서버가 `findPageComponents('/_error')` 할 때
 * 프로젝트 소스 기준으로 항상 컴파일, 해석 가능하게 함 (Turbopack 등에서 내장 경로만으로는 null 나는 경우 완화)
 */
export default function PagesError({ statusCode }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 text-gray-900">
      <div className="max-w-md w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold">{statusCode ? `오류 ${statusCode}` : '오류가 발생했습니다'}</h1>
        <p className="mt-3 text-sm text-gray-600 ko-modal-copy leading-relaxed">
          페이지를 불러오지 못했습니다.
          <br />
          잠시 후 새로고침하거나 홈으로 이동해 주세요.
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-xl bg-[#4B149B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3a0f78]"
        >
          홈으로
        </a>
      </div>
    </div>
  )
}

PagesError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err?.statusCode ?? 404
  return { statusCode }
}
