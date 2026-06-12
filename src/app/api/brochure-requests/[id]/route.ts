import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { updateBrochureRequest, type BrochureRequestPatch } from '@/lib/brochure-requests-store'
import { COOKIE_NAME, verifyAdminSession } from '@/lib/admin-auth'
import { LEAD_ASSIGNEES, type LeadAssignee } from '@/types/lead'

export const runtime = 'nodejs'

function isAdmin(): boolean {
  const c = cookies().get(COOKIE_NAME)?.value
  return verifyAdminSession(c)
}

function isAssignee(v: unknown): v is LeadAssignee {
  return v === '' || LEAD_ASSIGNEES.includes(v as (typeof LEAD_ASSIGNEES)[number])
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
    const { assignee, delivered } = body as Record<string, unknown>
    const patch: BrochureRequestPatch = {}
    if (assignee !== undefined) {
      if (!isAssignee(assignee)) {
        return NextResponse.json({ error: '잘못된 담당자 값' }, { status: 400 })
      }
      patch.assignee = assignee
    }
    if (delivered !== undefined) {
      if (typeof delivered !== 'boolean') {
        return NextResponse.json({ error: '잘못된 전달여부 값' }, { status: 400 })
      }
      patch.delivered = delivered
    }
    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: '변경할 항목이 없습니다.' }, { status: 400 })
    }
    const updated = await updateBrochureRequest(id, patch)
    if (!updated) {
      return NextResponse.json(
        { error: '해당 요청을 찾을 수 없습니다. 새로고침 후 다시 시도해 주세요.' },
        { status: 404 },
      )
    }
    return NextResponse.json({ request: updated })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[api/brochure-requests PATCH]', msg, e)
    return NextResponse.json(
      {
        error:
          '저장에 실패했습니다. Upstash Redis 연결, Vercel 환경 변수, Redeploy를 확인하거나, 잠시 후 다시 시도해 주세요.',
      },
      { status: 500 },
    )
  }
}
