import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { addLead, readLeads } from '@/lib/leads-store'
import { COOKIE_NAME, verifyAdminSession } from '@/lib/admin-auth'

function isAdmin(): boolean {
  const c = cookies().get(COOKIE_NAME)?.value
  return verifyAdminSession(c)
}

export async function GET() {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const leads = await readLeads()
  return NextResponse.json({ leads })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { centerName, name, phone, availableTime, additionalNote } = body as Record<
      string,
      unknown
    >
    if (
      typeof centerName !== 'string' ||
      typeof name !== 'string' ||
      typeof phone !== 'string' ||
      typeof availableTime !== 'string'
    ) {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
    }
    if (additionalNote !== undefined && typeof additionalNote !== 'string') {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
    }
    if (!centerName.trim() || !name.trim() || !phone.trim() || !availableTime.trim()) {
      return NextResponse.json({ error: '필수 항목을 입력해 주세요.' }, { status: 400 })
    }
    const lead = await addLead({
      centerName,
      name,
      phone,
      availableTime,
      additionalNote: typeof additionalNote === 'string' ? additionalNote : '',
    })
    return NextResponse.json({ ok: true, id: lead.id })
  } catch {
    return NextResponse.json({ error: '저장에 실패했습니다.' }, { status: 500 })
  }
}
