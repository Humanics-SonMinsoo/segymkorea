import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { addLead, readLeads } from '@/lib/leads-store'
import { COOKIE_NAME, verifyAdminSession } from '@/lib/admin-auth'
import { hasUpstashCredentials, isVercelDeployment } from '@/lib/upstash-env'
import { getDemoCenterById, isDemoCenterSelectable } from '@/data/demo-centers'
import type { DemoScheduleEntry, LeadInquiryType } from '@/types/lead'

/** 서버리스에서 fetch/Redis 클라이언트 안정화 (Edge 미사용) */
export const runtime = 'nodejs'

function isAdmin(): boolean {
  const c = cookies().get(COOKIE_NAME)?.value
  return verifyAdminSession(c)
}

/**
 * Redis URL과 토큰이 있으면 어디서든 Redis 사용.
 * Vercel인데 Redis 없으면 파일 쓰기 불가 → 거부.
 */
function persistenceReady(): boolean {
  if (hasUpstashCredentials()) return true
  if (isVercelDeployment()) return false
  return true
}

function parseInquiryType(value: unknown): LeadInquiryType {
  return value === 'demo' ? 'demo' : 'general'
}

export async function GET() {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const leads = await readLeads()
  return NextResponse.json({ leads })
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
    const {
      inquiryType: inquiryTypeRaw,
      centerName,
      name,
      phone,
      availableTime,
      additionalNote,
      demoCenterId,
      demoSchedules: demoSchedulesRaw,
    } = body as Record<string, unknown>

    const inquiryType = parseInquiryType(inquiryTypeRaw)

    if (typeof name !== 'string' || typeof phone !== 'string') {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
    }
    if (additionalNote !== undefined && typeof additionalNote !== 'string') {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
    }
    if (!name.trim() || !phone.trim()) {
      return NextResponse.json({ error: '필수 항목을 입력해 주세요.' }, { status: 400 })
    }

    if (inquiryType === 'demo') {
      if (typeof demoCenterId !== 'string') {
        return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
      }
      const center = getDemoCenterById(demoCenterId.trim())
      if (!center || !isDemoCenterSelectable(center)) {
        return NextResponse.json({ error: '시연 센터를 선택해 주세요.' }, { status: 400 })
      }
      if (!Array.isArray(demoSchedulesRaw) || demoSchedulesRaw.length === 0) {
        return NextResponse.json({ error: '시연 희망 일정을 입력해 주세요.' }, { status: 400 })
      }
      const demoSchedules: DemoScheduleEntry[] = []
      for (const item of demoSchedulesRaw) {
        if (!item || typeof item !== 'object') continue
        const { date, timeSlot } = item as Record<string, unknown>
        if (typeof date !== 'string' || typeof timeSlot !== 'string') continue
        if (!date.trim() || !timeSlot.trim()) continue
        demoSchedules.push({ date: date.trim(), timeSlot: timeSlot.trim() })
      }
      if (demoSchedules.length === 0) {
        return NextResponse.json({ error: '시연 희망 일정을 입력해 주세요.' }, { status: 400 })
      }
      const visitorCenter = typeof centerName === 'string' ? centerName.trim() : ''
      const lead = await addLead({
        inquiryType: 'demo',
        centerName: visitorCenter,
        name,
        phone,
        availableTime: '',
        additionalNote: typeof additionalNote === 'string' ? additionalNote : '',
        demoCenter: center.name,
        demoSchedules,
      })
      return NextResponse.json({ ok: true, id: lead.id })
    }

    if (
      typeof centerName !== 'string' ||
      typeof availableTime !== 'string'
    ) {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
    }
    if (!centerName.trim() || !availableTime.trim()) {
      return NextResponse.json({ error: '필수 항목을 입력해 주세요.' }, { status: 400 })
    }
    const lead = await addLead({
      inquiryType: 'general',
      centerName,
      name,
      phone,
      availableTime,
      additionalNote: typeof additionalNote === 'string' ? additionalNote : '',
    })
    return NextResponse.json({ ok: true, id: lead.id })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[api/leads POST]', msg, e)
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
