import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

/** 네이버 서치어드바이저 HTML 파일 방식 — 본문은 콘솔 안내와 동일해야 함 */
const NAVER_VERIFICATION_BODY = `naver-site-verification: naver603a069df921dcb5566c6df25e62567d.html`

const HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>Naver Search Advisor</title>
</head>
<body>
${NAVER_VERIFICATION_BODY}
</body>
</html>
`

export async function GET() {
  return new NextResponse(HTML, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
