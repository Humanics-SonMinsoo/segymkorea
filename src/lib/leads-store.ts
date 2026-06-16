import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import type { Lead, LeadAssignee, LeadInquiryType, LeadQuality } from '@/types/lead'
import { getUpstashRedis, redisGetJson, redisSetJson } from '@/lib/upstash-json'

const DATA_PATH = path.join(process.cwd(), 'data', 'leads.json')
const REDIS_KEY = 'segym:leads:v1'

function normalizeLead(row: Partial<Lead>): Lead {
  const inquiryType: LeadInquiryType = row.inquiryType === 'demo' ? 'demo' : 'general'
  return {
    id: String(row.id ?? ''),
    createdAt: String(row.createdAt ?? ''),
    inquiryType,
    centerName: typeof row.centerName === 'string' ? row.centerName : '',
    name: typeof row.name === 'string' ? row.name : '',
    phone: typeof row.phone === 'string' ? row.phone : '',
    availableTime: typeof row.availableTime === 'string' ? row.availableTime : '',
    additionalNote: typeof row.additionalNote === 'string' ? row.additionalNote : '',
    demoCenter: typeof row.demoCenter === 'string' ? row.demoCenter : undefined,
    demoDate: typeof row.demoDate === 'string' ? row.demoDate : undefined,
    demoTimeSlot: typeof row.demoTimeSlot === 'string' ? row.demoTimeSlot : undefined,
    assignee: row.assignee === '홍창용' || row.assignee === '윤경준' ? row.assignee : '',
    quality: row.quality === '유효리드' || row.quality === '무효리드' ? row.quality : '',
  }
}

async function ensureDataFile(): Promise<void> {
  const dir = path.dirname(DATA_PATH)
  await fs.mkdir(dir, { recursive: true })
  try {
    await fs.access(DATA_PATH)
  } catch {
    await fs.writeFile(DATA_PATH, '[]', 'utf-8')
  }
}

async function readLeadsFromFile(): Promise<Lead[]> {
  try {
    await ensureDataFile()
    const raw = await fs.readFile(DATA_PATH, 'utf-8')
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return (parsed as Partial<Lead>[]).map((row) => normalizeLead(row))
  } catch {
    return []
  }
}

async function writeLeadsToFile(leads: Lead[]): Promise<void> {
  await ensureDataFile()
  await fs.writeFile(DATA_PATH, JSON.stringify(leads, null, 2), 'utf-8')
}

export async function readLeads(): Promise<Lead[]> {
  const redis = getUpstashRedis()
  if (redis) {
    const data = await redisGetJson<unknown>(redis, REDIS_KEY, [])
    if (!Array.isArray(data)) return []
    return (data as Partial<Lead>[]).map((row) => normalizeLead(row))
  }
  return readLeadsFromFile()
}

export async function writeLeads(leads: Lead[]): Promise<void> {
  const redis = getUpstashRedis()
  if (redis) {
    await redisSetJson(redis, REDIS_KEY, leads)
    return
  }
  await writeLeadsToFile(leads)
}

export type NewLeadInput = {
  inquiryType?: LeadInquiryType
  centerName: string
  name: string
  phone: string
  availableTime?: string
  additionalNote?: string
  demoCenter?: string
  demoDate?: string
  demoTimeSlot?: string
}

export async function addLead(input: NewLeadInput): Promise<Lead> {
  const leads = await readLeads()
  const note = (input.additionalNote ?? '').trim().slice(0, 2000)
  const inquiryType: LeadInquiryType = input.inquiryType === 'demo' ? 'demo' : 'general'
  const lead: Lead = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    inquiryType,
    centerName: input.centerName.trim(),
    name: input.name.trim(),
    phone: input.phone.trim(),
    availableTime: (input.availableTime ?? '').trim(),
    additionalNote: note,
    assignee: '',
    quality: '',
  }
  if (inquiryType === 'demo') {
    lead.demoCenter = (input.demoCenter ?? '').trim()
    lead.demoDate = (input.demoDate ?? '').trim()
    lead.demoTimeSlot = (input.demoTimeSlot ?? '').trim()
  }
  leads.unshift(lead)
  await writeLeads(leads)
  return lead
}

export async function updateLead(
  id: string,
  patch: { assignee?: LeadAssignee; quality?: LeadQuality }
): Promise<Lead | null> {
  const leads = await readLeads()
  const i = leads.findIndex((l) => l.id === id)
  if (i === -1) return null
  const next = { ...leads[i] }
  if (patch.assignee !== undefined) next.assignee = patch.assignee
  if (patch.quality !== undefined) next.quality = patch.quality
  leads[i] = next
  await writeLeads(leads)
  return next
}

/** KST 기준 YYYY-MM-DD */
export function dateKeyKST(iso: string): string {
  return new Date(iso).toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
}

export function isTodayKST(iso: string): boolean {
  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
  return dateKeyKST(iso) === today
}
