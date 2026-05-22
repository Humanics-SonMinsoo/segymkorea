/**
 * Vercel/복사 시 따옴표, 앞뒤 공백, BOM, CR이 섞이는 경우 제거
 */
export function normalizeEnvValue(s: string | undefined): string {
  let t = (s ?? '')
    .replace(/^\uFEFF/, '')
    .replace(/\r/g, '')
    .trim()
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    t = t.slice(1, -1).trim()
  }
  return t
}

export function getUpstashRestUrl(): string {
  return normalizeEnvValue(process.env.UPSTASH_REDIS_REST_URL).replace(/\/$/, '')
}

export function getUpstashRestToken(): string {
  return normalizeEnvValue(process.env.UPSTASH_REDIS_REST_TOKEN)
}

export function hasUpstashCredentials(): boolean {
  return !!(getUpstashRestUrl() && getUpstashRestToken())
}

/** Vercel 프로덕션/프리뷰 배포 여부 (파일 저장 불가) */
export function isVercelDeployment(): boolean {
  return process.env.VERCEL === '1'
}
