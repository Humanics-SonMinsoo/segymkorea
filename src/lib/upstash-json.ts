import { Redis } from '@upstash/redis'
import { getUpstashRestToken, getUpstashRestUrl } from '@/lib/upstash-env'

/** Upstash 환경 변수가 있으면 Redis 클라이언트, 없으면 null (로컬 파일 저장 사용) */
export function getUpstashRedis(): Redis | null {
  const url = getUpstashRestUrl()
  const token = getUpstashRestToken()
  if (!url || !token) return null
  return new Redis({ url, token })
}

export async function redisGetJson<T>(redis: Redis, key: string, fallback: T): Promise<T> {
  const raw = await redis.get<string>(key)
  if (raw == null || raw === '') return fallback
  const str = typeof raw === 'string' ? raw : JSON.stringify(raw)
  try {
    const parsed = JSON.parse(str) as unknown
    return parsed as T
  } catch {
    return fallback
  }
}

export async function redisSetJson(redis: Redis, key: string, value: unknown): Promise<void> {
  await redis.set(key, JSON.stringify(value))
}
