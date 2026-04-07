import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { updateLead } from '@/lib/leads-store'
import { COOKIE_NAME, verifyAdminSession } from '@/lib/admin-auth'
import { LEAD_ASSIGNEES, LEAD_QUALITIES, type LeadAssignee, type LeadQuality } from '@/types/lead'

function isAdmin(): boolean {
  const c = cookies().get(COOKIE_NAME)?.value
  return verifyAdminSession(c)
}

function isAssignee(v: unknown): v is LeadAssignee {
  return v === '' || LEAD_ASSIGNEES.includes(v as (typeof LEAD_ASSIGNEES)[number])
}

function isQuality(v: unknown): v is LeadQuality {
  return v === '' || LEAD_QUALITIES.includes(v as (typeof LEAD_QUALITIES)[number])
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const id = params.id
  if (!id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  try {
    const body = await request.json()
    const { assignee, quality } = body as Record<string, unknown>
    const patch: { assignee?: LeadAssignee; quality?: LeadQuality } = {}
    if (assignee !== undefined) {
      if (!isAssignee(assignee)) {
        return NextResponse.json({ error: '잘못된 담당자 값' }, { status: 400 })
      }
      patch.assignee = assignee
    }
    if (quality !== undefined) {
      if (!isQuality(quality)) {
        return NextResponse.json({ error: '잘못된 리드 품질 값' }, { status: 400 })
      }
      patch.quality = quality
    }
    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: '변경할 항목이 없습니다.' }, { status: 400 })
    }
    const updated = await updateLead(id, patch)
    if (!updated) {
      return NextResponse.json(
        { error: '해당 리드를 찾을 수 없습니다. 새로고침 후 다시 시도해 주세요.' },
        { status: 404 },
      )
    }
    return NextResponse.json({ lead: updated })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[api/leads PATCH]', msg, e)
    return NextResponse.json(
      {
        error:
          '리드 저장에 실패했습니다. Upstash Redis 연결·Vercel 환경 변수·Redeploy를 확인하거나, 잠시 후 다시 시도해 주세요.',
      },
      { status: 500 },
    )
  }
}
