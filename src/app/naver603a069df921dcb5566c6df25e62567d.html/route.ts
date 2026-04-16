import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const LINE = 'naver-site-verification: naver603a069df921dcb5566c6df25e62567d.html'

/** 네이버가 다운로드하는 HTML 파일과 동일하게: 한 줄 + 줄바꿈 (바이트 일치에 가깝게) */
const BODY = `${LINE}\n`

const headers = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'public, max-age=0, must-revalidate',
} as const

export async function HEAD() {
  return new NextResponse(null, { status: 200, headers })
}

export async function GET() {
  return new NextResponse(BODY, { status: 200, headers })
}
