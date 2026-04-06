import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import type { BrochureRequest } from '@/types/brochure-request'

const DATA_PATH = path.join(process.cwd(), 'data', 'brochure-requests.json')

async function ensureDataFile(): Promise<void> {
  const dir = path.dirname(DATA_PATH)
  await fs.mkdir(dir, { recursive: true })
  try {
    await fs.access(DATA_PATH)
  } catch {
    await fs.writeFile(DATA_PATH, '[]', 'utf-8')
  }
}

export async function readBrochureRequests(): Promise<BrochureRequest[]> {
  await ensureDataFile()
  const raw = await fs.readFile(DATA_PATH, 'utf-8')
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as BrochureRequest[]) : []
  } catch {
    return []
  }
}

export async function writeBrochureRequests(rows: BrochureRequest[]): Promise<void> {
  await ensureDataFile()
  await fs.writeFile(DATA_PATH, JSON.stringify(rows, null, 2), 'utf-8')
}

export type NewBrochureRequestInput = {
  email: string
  centerName: string
  phone: string
}

export async function addBrochureRequest(input: NewBrochureRequestInput): Promise<BrochureRequest> {
  const rows = await readBrochureRequests()
  const row: BrochureRequest = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    email: input.email.trim(),
    centerName: input.centerName.trim(),
    phone: input.phone.trim(),
  }
  rows.unshift(row)
  await writeBrochureRequests(rows)
  return row
}
