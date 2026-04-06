/**
 * Windows: 3000~3010 LISTENING 프로세스 종료 (남은 next/node dev 서버 정리)
 * 사용: npm run ports:free
 */
import { execSync } from 'child_process'

const TARGET_PORTS = new Set(
  Array.from({ length: 11 }, (_, i) => 3000 + i)
)

function parseLocalPort(localField) {
  if (!localField) return null
  const idx = localField.lastIndexOf(':')
  if (idx === -1) return null
  const p = parseInt(localField.slice(idx + 1), 10)
  return Number.isFinite(p) ? p : null
}

function main() {
  let output
  try {
    output = execSync('netstat -ano', { encoding: 'utf8', windowsHide: true })
  } catch (e) {
    console.error('netstat 실행 실패:', e.message)
    process.exit(1)
  }

  const pids = new Set()
  for (const line of output.split(/\r?\n/)) {
    if (!/LISTENING/i.test(line)) continue
    const parts = line.trim().split(/\s+/)
    if (parts.length < 5) continue
    const localField = parts[1]
    const pid = parts[parts.length - 1]
    const port = parseLocalPort(localField)
    if (port != null && TARGET_PORTS.has(port) && /^\d+$/.test(pid)) {
      pids.add(pid)
      console.log(`port ${port} → PID ${pid}`)
    }
  }

  if (pids.size === 0) {
    console.log('3000~3010에서 LISTENING 중인 프로세스가 없습니다.')
    return
  }

  for (const pid of pids) {
    try {
      console.log(`종료 중: PID ${pid}`)
      execSync(`taskkill /PID ${pid} /F`, { stdio: 'inherit', windowsHide: true })
    } catch {
      console.warn(`PID ${pid} 종료 실패(권한 또는 이미 종료됨)`)
    }
  }
}

main()
