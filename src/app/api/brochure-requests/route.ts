import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { addBrochureRequest, readBrochureRequests } from '@/lib/brochure-requests-store'
import { COOKIE_NAME, verifyAdminSession } from '@/lib/admin-auth'
import { hasUpstashCredentials, isVercelDeployment } from '@/lib/upstash-env'

export const runtime = 'nodejs'

function isAdmin(): boolean {
  const c = cookies().get(COOKIE_NAME)?.value
  return verifyAdminSession(c)
}

function persistenceReady(): boolean {
  if (hasUpstashCredentials()) return true
  if (isVercelDeployment()) return false
  return true
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
  if (!persistenceReady()) {
    return NextResponse.json(
      {
        error:
          '접수 저장소가 연결되지 않았습니다. (운영: Upstash Redis 환경 변수 설정 필요) 잠시 후 다시 시도하거나 전화로 문의해 주세요.',
      },
      { status: 503 },
    )
  }
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
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[api/brochure-requests POST]', msg, e)
    const debug =
      process.env.LEADS_API_DEBUG === '1' || process.env.LEADS_API_DEBUG === 'true'
    return NextResponse.json(
      {
        error:
          '저장에 실패했습니다. Upstash REST API의 읽기, 쓰기용 TOKEN(Read-Only 토큰이 아닌지) 확인, Vercel 환경 변수(따옴표 없이), Git 연동 시 최신 코드 push 후 Redeploy를 해 주세요.',
        ...(debug ? { debug: msg } : {}),
      },
      { status: 500 },
    )
  }
}
