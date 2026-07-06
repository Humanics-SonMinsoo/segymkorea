import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import type { SegymDayRequest } from '@/types/segym-day-request'
import { getUpstashRedis, redisGetJson, redisSetJson } from '@/lib/upstash-json'

const DATA_PATH = path.join(process.cwd(), 'data', 'segym-day-requests.json')
const REDIS_KEY = 'segym:segym-day-requests:v1'

async function ensureDataFile(): Promise<void> {
  const dir = path.dirname(DATA_PATH)
  await fs.mkdir(dir, { recursive: true })
  try {
    await fs.access(DATA_PATH)
  } catch {
    await fs.writeFile(DATA_PATH, '[]', 'utf-8')
  }
}

async function readFromFile(): Promise<SegymDayRequest[]> {
  try {
    await ensureDataFile()
    const raw = await fs.readFile(DATA_PATH, 'utf-8')
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as SegymDayRequest[]) : []
  } catch {
    return []
  }
}

async function writeToFile(rows: SegymDayRequest[]): Promise<void> {
  await ensureDataFile()
  await fs.writeFile(DATA_PATH, JSON.stringify(rows, null, 2), 'utf-8')
}

export async function readSegymDayRequests(): Promise<SegymDayRequest[]> {
  const redis = getUpstashRedis()
  if (redis) {
    const data = await redisGetJson<unknown>(redis, REDIS_KEY, [])
    return Array.isArray(data) ? (data as SegymDayRequest[]) : []
  }
  return readFromFile()
}

export async function writeSegymDayRequests(rows: SegymDayRequest[]): Promise<void> {
  const redis = getUpstashRedis()
  if (redis) {
    await redisSetJson(redis, REDIS_KEY, rows)
    return
  }
  await writeToFile(rows)
}

export type NewSegymDayRequestInput = {
  venueId: string
  venueLabel: string
  venueSchedule: string
  centerName: string
  name: string
  phone: string
  additionalNote: string
}

export async function addSegymDayRequest(input: NewSegymDayRequestInput): Promise<SegymDayRequest> {
  const rows = await readSegymDayRequests()
  const row: SegymDayRequest = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    venueId: input.venueId,
    venueLabel: input.venueLabel,
    venueSchedule: input.venueSchedule,
    centerName: input.centerName.trim(),
    name: input.name.trim(),
    phone: input.phone.trim(),
    additionalNote: input.additionalNote.trim(),
    assignee: '',
    quality: '',
  }
  rows.unshift(row)
  await writeSegymDayRequests(rows)
  return row
}

export type SegymDayRequestPatch = Partial<Pick<SegymDayRequest, 'assignee' | 'quality'>>

export async function updateSegymDayRequest(
  id: string,
  patch: SegymDayRequestPatch,
): Promise<SegymDayRequest | null> {
  const rows = await readSegymDayRequests()
  const idx = rows.findIndex((r) => r.id === id)
  if (idx === -1) return null
  const updated: SegymDayRequest = { ...rows[idx], ...patch }
  rows[idx] = updated
  await writeSegymDayRequests(rows)
  return updated
}
