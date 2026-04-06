import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { addBrochureRequest, readBrochureRequests } from '@/lib/brochure-requests-store'
import { COOKIE_NAME, verifyAdminSession } from '@/lib/admin-auth'

function isAdmin(): boolean {
  const c = cookies().get(COOKIE_NAME)?.value
  return verifyAdminSession(c)
}

function isValidEmail(s: string): boolean {
  const t = s.trim()
  if (t.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)
}

export async function GET() {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const requests = await readBrochureRequests()
  return NextResponse.json({ requests })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, centerName, phone } = body as Record<string, unknown>
    if (
      typeof email !== 'string' ||
      typeof centerName !== 'string' ||
      typeof phone !== 'string'
    ) {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
    }
    if (!email.trim() || !centerName.trim() || !phone.trim()) {
      return NextResponse.json({ error: '필수 항목을 모두 입력해 주세요.' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: '올바른 이메일 주소를 입력해 주세요.' }, { status: 400 })
    }
    const row = await addBrochureRequest({ email, centerName, phone })
    return NextResponse.json({ ok: true, id: row.id })
  } catch {
    return NextResponse.json({ error: '저장에 실패했습니다.' }, { status: 500 })
  }
}
