import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/** 네이버 서치어드바이저 — HTML 파일 방식 (경로·본문은 콘솔과 동일해야 함) */
const VERIFICATION_PATH = '/naver603a069df921dcb5566c6df25e62567d.html'
const VERIFICATION_LINE = 'naver-site-verification: naver603a069df921dcb5566c6df25e62567d.html'

const HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>Naver site verification</title>
</head>
<body>${VERIFICATION_LINE}
</body>
</html>`

export function middleware(request: NextRequest) {
  let pathname = request.nextUrl.pathname
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1)
  }
  if (pathname !== VERIFICATION_PATH) {
    return NextResponse.next()
  }

  const headers = {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store, max-age=0, must-revalidate',
  } as const

  if (request.method === 'HEAD') {
    return new NextResponse(null, { status: 200, headers })
  }

  if (request.method === 'GET') {
    return new NextResponse(HTML, { status: 200, headers })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/naver603a069df921dcb5566c6df25e62567d.html'],
}
