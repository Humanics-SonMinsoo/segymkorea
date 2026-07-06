import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { addSegymDayRequest, readSegymDayRequests } from '@/lib/segym-day-requests-store'
import { COOKIE_NAME, verifyAdminSession } from '@/lib/admin-auth'
import { hasUpstashCredentials, isVercelDeployment } from '@/lib/upstash-env'
import { getSegymDayVenueById, isSegymDayVenueSelectable } from '@/data/segym-day'

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

export async function GET() {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const requests = await readSegymDayRequests()
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
    const { venueId, centerName, name, phone, additionalNote } = body as Record<string, unknown>
    if (
      typeof venueId !== 'string' ||
      typeof centerName !== 'string' ||
      typeof name !== 'string' ||
      typeof phone !== 'string' ||
      typeof additionalNote !== 'string'
    ) {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
    }
    if (!venueId.trim() || !name.trim() || !phone.trim()) {
      return NextResponse.json({ error: '필수 항목을 모두 입력해 주세요.' }, { status: 400 })
    }
    const venue = getSegymDayVenueById(venueId.trim())
    if (!venue || !isSegymDayVenueSelectable(venue)) {
      return NextResponse.json({ error: '참여 장소를 선택해 주세요.' }, { status: 400 })
    }
    const row = await addSegymDayRequest({
      venueId: venue.id,
      venueLabel: venue.title,
      venueSchedule: venue.schedule,
      centerName,
      name,
      phone,
      additionalNote,
    })
    return NextResponse.json({ ok: true, id: row.id })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[api/segym-day-requests POST]', msg, e)
    return NextResponse.json({ error: '저장에 실패했습니다. 잠시 후 다시 시도해 주세요.' }, { status: 500 })
  }
}
