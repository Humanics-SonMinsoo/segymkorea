'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Lead, LeadAssignee, LeadInquiryType, LeadQuality } from '@/types/lead'
import { LEAD_ASSIGNEES, LEAD_QUALITIES } from '@/types/lead'
import type { BrochureRequest } from '@/types/brochure-request'
import { DEMO_CENTERS, getDemoCenterById } from '@/data/demo-centers'
import { DEMO_EXPERIENCE_COPY } from '@/lib/demo-experience-copy'

function formatDateTimeKST(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

function dateKeyKST(iso: string): string {
  return new Date(iso).toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
}

function leadTypeLabel(lead: Lead): string {
  return lead.inquiryType === 'demo' ? DEMO_EXPERIENCE_COPY.adminLabel : '도입 문의'
}

function demoCenterAddress(lead: Lead): string | undefined {
  if (lead.demoCenterId) return getDemoCenterById(lead.demoCenterId)?.address
  if (lead.demoCenter) return DEMO_CENTERS.find((c) => c.name === lead.demoCenter)?.address
  return undefined
}

function leadCenterCell(lead: Lead): string {
  if (lead.inquiryType === 'demo') {
    const parts = [lead.demoCenter ? `체험: ${lead.demoCenter}` : '체험 센터 미기록']
    const address = demoCenterAddress(lead)
    if (address) parts.push(`주소: ${address}`)
    if (lead.centerName.trim()) parts.push(`운영: ${lead.centerName}`)
    return parts.join('\n')
  }
  return lead.centerName
}

function leadScheduleCell(lead: Lead): string {
  if (lead.inquiryType === 'demo') {
    const schedules = lead.demoSchedules?.length
      ? lead.demoSchedules
      : lead.demoDate && lead.demoTimeSlot
        ? [{ date: lead.demoDate, timeSlot: lead.demoTimeSlot }]
        : []
    if (schedules.length > 0) {
      return schedules.map((s) => `${s.date}  ${s.timeSlot}`).join('\n')
    }
    return '—'
  }
  return lead.availableTime || '—'
}

export default function AdminLeadsClient() {
  const router = useRouter()
  const [tab, setTab] = useState<'leads' | 'brochure'>('leads')
  const [leadFilter, setLeadFilter] = useState<'all' | LeadInquiryType>('all')
  const [leads, setLeads] = useState<Lead[]>([])
  const [brochures, setBrochures] = useState<BrochureRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savingId, setSavingId] = useState<string | null>(null)

  const loadAll = useCallback(async () => {
    setError(null)
    const [lr, br] = await Promise.all([
      fetch('/api/leads', { credentials: 'include' }),
      fetch('/api/brochure-requests', { credentials: 'include' }),
    ])
    if (lr.status === 401 || br.status === 401) {
      router.push('/admin/login')
      return
    }
    if (!lr.ok) {
      setError('리드를 불러오지 못했습니다.')
      setLoading(false)
      return
    }
    if (!br.ok) {
      setError('소개서 요청을 불러오지 못했습니다.')
      setLoading(false)
      return
    }
    const leadData = await lr.json()
    const brochureData = await br.json()
    setLeads(Array.isArray(leadData.leads) ? leadData.leads : [])
    setBrochures(Array.isArray(brochureData.requests) ? brochureData.requests : [])
    setLoading(false)
  }, [router])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  const stats = useMemo(() => {
    const total = leads.length
    const demoTotal = leads.filter((l) => l.inquiryType === 'demo').length
    const todayKST = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
    const todayCount = leads.filter((l) => dateKeyKST(l.createdAt) === todayKST).length
    const unassigned = leads.filter((l) => !l.assignee).length
    return { total, demoTotal, todayCount, unassigned }
  }, [leads])

  const filteredLeads = useMemo(() => {
    if (leadFilter === 'all') return leads
    return leads.filter((l) => l.inquiryType === leadFilter)
  }, [leads, leadFilter])

  const brochureStats = useMemo(() => {
    const total = brochures.length
    const todayKST = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
    const todayCount = brochures.filter((b) => dateKeyKST(b.createdAt) === todayKST).length
    const undelivered = brochures.filter((b) => !b.delivered).length
    return { total, todayCount, undelivered }
  }, [brochures])

  const patchLead = async (id: string, body: { assignee?: LeadAssignee; quality?: LeadQuality }) => {
    setSavingId(id)
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      })
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const msg =
          typeof data.error === 'string' && data.error.trim()
            ? data.error
            : `저장에 실패했습니다. (${res.status})`
        setError(msg)
        return
      }
      if (data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === id ? data.lead : l)))
      }
    } catch {
      setError('저장에 실패했습니다. (네트워크 오류)')
    } finally {
      setSavingId(null)
    }
  }

  const patchBrochure = async (id: string, body: { assignee?: LeadAssignee; delivered?: boolean }) => {
    setSavingId(id)
    try {
      const res = await fetch(`/api/brochure-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      })
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const msg =
          typeof data.error === 'string' && data.error.trim()
            ? data.error
            : `저장에 실패했습니다. (${res.status})`
        setError(msg)
        return
      }
      if (data.request) {
        setBrochures((prev) => prev.map((b) => (b.id === id ? data.request : b)))
      }
    } catch {
      setError('저장에 실패했습니다. (네트워크 오류)')
    } finally {
      setSavingId(null)
    }
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' })
    router.push('/admin/login')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-4 text-slate-500">
        <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" aria-hidden />
        <p className="text-sm font-medium">데이터를 불러오는 중입니다…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-20 bg-gradient-to-r from-slate-900 via-primary-dark to-slate-900 text-white shadow-lg shadow-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <p
                  className="text-xl font-bold italic text-white"
                  style={{ fontFamily: 'var(--font-segym)' }}
                >
                  SEGYM
                </p>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/80 bg-white/10 px-2 py-0.5 rounded">
                  Admin
                </span>
              </div>
              <h1 className="text-lg font-semibold text-white mt-1">리드 / 소개서 관리</h1>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setTab('leads')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    tab === 'leads'
                      ? 'bg-white text-primary-dark shadow-md'
                      : 'bg-white/10 text-white/90 hover:bg-white/15'
                  }`}
                >
                  도입 문의
                </button>
                <button
                  type="button"
                  onClick={() => setTab('brochure')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    tab === 'brochure'
                      ? 'bg-white text-primary-dark shadow-md'
                      : 'bg-white/10 text-white/90 hover:bg-white/15'
                  }`}
                >
                  소개서 요청
                </button>
              </div>
              <p className="text-xs text-white/70 mt-2 max-w-xl">
                {tab === 'leads'
                  ? `도입 문의·${DEMO_EXPERIENCE_COPY.adminLabel} 리드입니다. 담당자와 유효/무효를 기록할 수 있습니다.`
                  : '이메일로 소개서(PDF) 발송 전에 아래 목록을 확인하세요.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => loadAll()}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/15 transition-colors"
              >
                새로고침
              </button>
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/15 transition-colors"
              >
                사이트 보기
              </Link>
              <button
                type="button"
                onClick={logout}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500/20 text-red-100 border border-red-400/40 hover:bg-red-500/30 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 text-red-800 text-sm px-4 py-3 border border-red-100 flex flex-wrap items-center justify-between gap-2">
            <span>{error}</span>
            <button type="button" className="text-red-600 font-medium underline text-xs" onClick={() => setError(null)}>
              닫기
            </button>
          </div>
        )}

        {tab === 'leads' ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm shadow-slate-200/50">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">총 리드 수</p>
                <p className="text-3xl font-bold text-slate-900 mt-1 tabular-nums">{stats.total}</p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm shadow-slate-200/50 ring-1 ring-violet-200/60">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{DEMO_EXPERIENCE_COPY.adminLabel}</p>
                <p className="text-3xl font-bold text-violet-700 mt-1 tabular-nums">{stats.demoTotal}</p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm shadow-slate-200/50 ring-1 ring-primary/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">오늘 접수 (KST)</p>
                <p className="text-3xl font-bold text-primary mt-1 tabular-nums">{stats.todayCount}</p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm shadow-slate-200/50">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">담당자 미지정</p>
                <p className="text-3xl font-bold text-amber-600 mt-1 tabular-nums">{stats.unassigned}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {(
                [
                  ['all', '전체'],
                  ['general', '도입 문의'],
                  ['demo', DEMO_EXPERIENCE_COPY.adminLabel],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setLeadFilter(id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    leadFilter === id
                      ? 'border-primary bg-primary text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left text-slate-600 border-b border-slate-200">
                      <th className="px-3 py-3 font-semibold whitespace-nowrap">접수일시 (KST)</th>
                      <th className="px-3 py-3 font-semibold whitespace-nowrap">유형</th>
                      <th className="px-3 py-3 font-semibold whitespace-nowrap">센터</th>
                      <th className="px-3 py-3 font-semibold whitespace-nowrap">성함</th>
                      <th className="px-3 py-3 font-semibold whitespace-nowrap">연락처</th>
                      <th className="px-3 py-3 font-semibold min-w-[140px]">일정 / 상담 시간</th>
                      <th className="px-3 py-3 font-semibold min-w-[160px]">추가 문의</th>
                      <th className="px-3 py-3 font-semibold whitespace-nowrap">리드 담당자</th>
                      <th className="px-3 py-3 font-semibold whitespace-nowrap">리드 품질</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-4 py-12 text-center text-gray-500">
                          {leads.length === 0 ? '아직 접수된 리드가 없습니다.' : '해당 유형의 리드가 없습니다.'}
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="border-b border-slate-100 hover:bg-primary-muted/50 align-top transition-colors">
                          <td className="px-3 py-3 text-gray-800 whitespace-nowrap">
                            {formatDateTimeKST(lead.createdAt)}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap">
                            <span
                              className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                                lead.inquiryType === 'demo'
                                  ? 'bg-violet-100 text-violet-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {leadTypeLabel(lead)}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-gray-900 font-medium whitespace-pre-wrap max-w-[180px]">
                            {leadCenterCell(lead)}
                          </td>
                          <td className="px-3 py-3 text-gray-800">{lead.name}</td>
                          <td className="px-3 py-3 text-gray-800 whitespace-nowrap">{lead.phone}</td>
                          <td className="px-3 py-3 text-gray-700 whitespace-pre-wrap max-w-xs">
                            {leadScheduleCell(lead)}
                          </td>
                          <td className="px-3 py-3 text-gray-600 whitespace-pre-wrap max-w-[220px] text-xs">
                            {lead.additionalNote ? lead.additionalNote : '—'}
                          </td>
                          <td className="px-3 py-3">
                            <select
                              className="w-full min-w-[120px] rounded-lg border border-gray-300 px-2 py-1.5 text-gray-900 bg-white"
                              value={lead.assignee}
                              disabled={savingId === lead.id}
                              onChange={(e) => {
                                const v = e.target.value as LeadAssignee
                                patchLead(lead.id, { assignee: v })
                              }}
                            >
                              <option value="">미지정</option>
                              {LEAD_ASSIGNEES.map((a) => (
                                <option key={a} value={a}>
                                  {a}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-3 py-3">
                            <select
                              className="w-full min-w-[120px] rounded-lg border border-gray-300 px-2 py-1.5 text-gray-900 bg-white"
                              value={lead.quality}
                              disabled={savingId === lead.id}
                              onChange={(e) => {
                                const v = e.target.value as LeadQuality
                                patchLead(lead.id, { quality: v })
                              }}
                            >
                              <option value="">미선택</option>
                              {LEAD_QUALITIES.map((q) => (
                                <option key={q} value={q}>
                                  {q}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm shadow-slate-200/50">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">총 소개서 요청</p>
                <p className="text-3xl font-bold text-slate-900 mt-1 tabular-nums">{brochureStats.total}</p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm shadow-slate-200/50 ring-1 ring-primary/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">오늘 접수 (KST)</p>
                <p className="text-3xl font-bold text-primary mt-1 tabular-nums">{brochureStats.todayCount}</p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm shadow-slate-200/50">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">전달 대기</p>
                <p className="text-3xl font-bold text-amber-600 mt-1 tabular-nums">{brochureStats.undelivered}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left text-slate-600 border-b border-slate-200">
                      <th className="px-3 py-3 font-semibold whitespace-nowrap">접수일시 (KST)</th>
                      <th className="px-3 py-3 font-semibold whitespace-nowrap">이메일</th>
                      <th className="px-3 py-3 font-semibold whitespace-nowrap">센터명</th>
                      <th className="px-3 py-3 font-semibold whitespace-nowrap">연락처</th>
                      <th className="px-3 py-3 font-semibold whitespace-nowrap">리드 관리자</th>
                      <th className="px-3 py-3 font-semibold whitespace-nowrap text-center">소개서 전달</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brochures.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                          아직 소개서 요청이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      brochures.map((row) => (
                        <tr key={row.id} className="border-b border-slate-100 hover:bg-primary-muted/50 align-top transition-colors">
                          <td className="px-3 py-3 text-gray-800 whitespace-nowrap">
                            {formatDateTimeKST(row.createdAt)}
                          </td>
                          <td className="px-3 py-3">
                            <a
                              href={`mailto:${encodeURIComponent(row.email)}`}
                              className="text-primary font-medium hover:underline break-all"
                            >
                              {row.email}
                            </a>
                          </td>
                          <td className="px-3 py-3 text-gray-900 font-medium">{row.centerName}</td>
                          <td className="px-3 py-3 text-gray-800 whitespace-nowrap">{row.phone}</td>
                          <td className="px-3 py-3">
                            <select
                              className="w-full min-w-[120px] rounded-lg border border-gray-300 px-2 py-1.5 text-gray-900 bg-white"
                              value={row.assignee ?? ''}
                              disabled={savingId === row.id}
                              onChange={(e) => {
                                const v = e.target.value as LeadAssignee
                                patchBrochure(row.id, { assignee: v })
                              }}
                            >
                              <option value="">미지정</option>
                              {LEAD_ASSIGNEES.map((a) => (
                                <option key={a} value={a}>
                                  {a}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-3 py-3 text-center">
                            <label className="inline-flex items-center justify-center gap-1.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                checked={row.delivered ?? false}
                                disabled={savingId === row.id}
                                onChange={(e) => patchBrochure(row.id, { delivered: e.target.checked })}
                              />
                              <span className={`text-xs font-medium ${row.delivered ? 'text-green-600' : 'text-gray-400'}`}>
                                {row.delivered ? '전달 완료' : '대기'}
                              </span>
                            </label>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
