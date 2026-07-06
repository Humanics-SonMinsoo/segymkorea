import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { updateSegymDayRequest, type SegymDayRequestPatch } from '@/lib/segym-day-requests-store'
import { COOKIE_NAME, verifyAdminSession } from '@/lib/admin-auth'
import { LEAD_ASSIGNEES, LEAD_QUALITIES, type LeadAssignee, type LeadQuality } from '@/types/lead'

export const runtime = 'nodejs'

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

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
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
    const patch: SegymDayRequestPatch = {}
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
    const updated = await updateSegymDayRequest(id, patch)
    if (!updated) {
      return NextResponse.json({ error: '해당 요청을 찾을 수 없습니다.' }, { status: 404 })
    }
    return NextResponse.json({ request: updated })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[api/segym-day-requests PATCH]', msg, e)
    return NextResponse.json({ error: '저장에 실패했습니다.' }, { status: 500 })
  }
}
