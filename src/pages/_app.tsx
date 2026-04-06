import type { AppProps } from 'next/app'
import '@/app/globals.css'

/**
 * Pages 라우터 최소 진입점 — 내장 /_error 번들이 항상 프로젝트에 포함되도록 함
 * (앱은 `src/app` 이 주이며, 이 파일은 오류 폴백 안정화용)
 */
export default function PagesApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
