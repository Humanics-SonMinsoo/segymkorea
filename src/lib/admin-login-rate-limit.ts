/**
 * IP 기준 로그인 실패 누적 → 일시 잠금 (메모리 저장, 서버 인스턴스별)
 * 서버리스/다중 인스턴스에서는 인스턴스마다 별도 한도 — 완전 방어는 WAF/엣지 한도와 병행 권장
 */

type IpRecord = {
  failures: number
  /** 0이면 잠금 아님, 그 외 epoch ms까지 차단 */
  lockoutUntil: number
}

const store = new Map<string, IpRecord>()

const PRUNE_EVERY_MS = 60_000
let lastPrune = 0

function getMaxFailures(): number {
  const n = parseInt(process.env.ADMIN_LOGIN_MAX_FAILURES ?? '', 10)
  return Number.isFinite(n) && n >= 1 ? Math.min(n, 50) : 8
}

function getLockoutMs(): number {
  const n = parseInt(process.env.ADMIN_LOGIN_LOCKOUT_MS ?? '', 10)
  return Number.isFinite(n) && n >= 60_000 ? Math.min(n, 3_600_000) : 900_000
}

function pruneStale(now: number): void {
  if (now - lastPrune < PRUNE_EVERY_MS) return
  lastPrune = now
  const lockoutMs = getLockoutMs()
  for (const [ip, rec] of Array.from(store.entries())) {
    if (rec.lockoutUntil > 0 && now > rec.lockoutUntil + lockoutMs) {
      store.delete(ip)
    }
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first.slice(0, 128)
  }
  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp.slice(0, 128)
  return 'unknown'
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSec: number }

/** 로그인 시도 전 호출 — 차단 중이면 429 */
export function adminLoginRateLimitCheck(ip: string): RateLimitResult {
  const now = Date.now()
  pruneStale(now)
  const rec = store.get(ip)
  if (!rec) return { allowed: true }
  if (rec.lockoutUntil > now) {
    return { allowed: false, retryAfterSec: Math.ceil((rec.lockoutUntil - now) / 1000) }
  }
  return { allowed: true }
}

/** 비밀번호 틀림 */
export function adminLoginRecordFailure(ip: string): RateLimitResult {
  const now = Date.now()
  pruneStale(now)
  const maxFailures = getMaxFailures()
  const lockoutMs = getLockoutMs()
  let rec = store.get(ip)
  if (!rec || rec.lockoutUntil > 0 && now > rec.lockoutUntil) {
    rec = { failures: 0, lockoutUntil: 0 }
  }
  if (rec.lockoutUntil > now) {
    return { allowed: false, retryAfterSec: Math.ceil((rec.lockoutUntil - now) / 1000) }
  }
  rec.failures += 1
  if (rec.failures >= maxFailures) {
    rec.lockoutUntil = now + lockoutMs
    rec.failures = 0
  }
  store.set(ip, rec)
  if (rec.lockoutUntil > now) {
    return { allowed: false, retryAfterSec: Math.ceil(lockoutMs / 1000) }
  }
  return { allowed: true }
}

/** 로그인 성공 시 해당 IP 기록 제거 */
export function adminLoginRecordSuccess(ip: string): void {
  store.delete(ip)
}
