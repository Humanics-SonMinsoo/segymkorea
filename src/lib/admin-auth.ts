import { createHmac, timingSafeEqual } from 'crypto'

/** 쿠키 이름(로그인 ID와 무관). HttpOnly, SameSite로 전송 */
export const COOKIE_NAME = 'segym_admin'

/** 아이디 최소 길이 (추측 난이도) */
const MIN_ADMIN_ID_LENGTH = 8

/** 비밀번호 최소 길이 */
const MIN_ADMIN_PASSWORD_LENGTH = 16

/** 세션 HMAC 시크릿 최소 길이 */
const MIN_SESSION_SECRET_LENGTH = 32

function safeStringEqual(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, 'utf8')
    const bb = Buffer.from(b, 'utf8')
    if (ba.length !== bb.length) return false
    return timingSafeEqual(ba, bb)
  } catch {
    return false
  }
}

function readAdminIdFromEnv(): string {
  return (process.env.LEADS_ADMIN_ID ?? '').trim()
}

function readAdminPasswordFromEnv(): string {
  // 비밀번호는 앞뒤 공백만 제거(의도적 공백 포함 가능하도록 중간은 유지하지 않음 — env에서는 보통 trim)
  return (process.env.LEADS_ADMIN_PASSWORD ?? '').trim()
}

function readSessionSecretFromEnv(): string {
  return (process.env.ADMIN_SESSION_SECRET ?? '').trim()
}

/**
 * 어드민 로그인에 필요한 환경 변수가 모두 있고 정책을 만족하는지
 * (코드/저장소에 기본 비밀번호 없음 — 반드시 .env.local 등에만 보관)
 */
export function isAdminAuthFullyConfigured(): boolean {
  const id = readAdminIdFromEnv()
  const pw = readAdminPasswordFromEnv()
  const secret = readSessionSecretFromEnv()
  return (
    id.length >= MIN_ADMIN_ID_LENGTH &&
    pw.length >= MIN_ADMIN_PASSWORD_LENGTH &&
    secret.length >= MIN_SESSION_SECRET_LENGTH
  )
}

export function getExpectedAdminId(): string {
  return readAdminIdFromEnv()
}

export function getExpectedAdminPassword(): string {
  return readAdminPasswordFromEnv()
}

/**
 * 로그인 검증 (ID, 비밀번호 모두 일치)
 * 환경 변수 미설정 시 항상 false (정보 유출 없음)
 */
export function validateAdminCredentials(userId: string, password: string): boolean {
  if (!isAdminAuthFullyConfigured()) return false
  const id = userId.trim()
  const pw = password
  if (!id || !pw) return false
  const expectedId = getExpectedAdminId()
  const expectedPw = getExpectedAdminPassword()
  return safeStringEqual(id, expectedId) && safeStringEqual(pw, expectedPw)
}

export function getAdminSessionToken(): string {
  if (!isAdminAuthFullyConfigured()) {
    throw new Error('ADMIN_SESSION_SECRET is not configured')
  }
  const secret = readSessionSecretFromEnv()
  return createHmac('sha256', secret).update('segym-admin-session-v1').digest('hex')
}

export function verifyAdminSession(value: string | undefined): boolean {
  if (!isAdminAuthFullyConfigured()) return false
  if (!value) return false
  let expected: string
  try {
    expected = getAdminSessionToken()
  } catch {
    return false
  }
  try {
    if (value.length !== expected.length) return false
    return timingSafeEqual(Buffer.from(value, 'utf8'), Buffer.from(expected, 'utf8'))
  } catch {
    return false
  }
}
