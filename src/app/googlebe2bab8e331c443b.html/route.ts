import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const LINE = 'google-site-verification: googlebe2bab8e331c443b.html'

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
