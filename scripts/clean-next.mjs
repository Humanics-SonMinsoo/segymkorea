import { rmSync, existsSync } from 'fs'
import { join } from 'path'

const cwd = process.cwd()
const paths = [
  join(cwd, '.next'),
  join(cwd, 'node_modules', '.cache'),
]

let removed = 0
for (const p of paths) {
  if (existsSync(p)) {
    rmSync(p, { recursive: true, force: true })
    const rel = p.startsWith(cwd) ? p.slice(cwd.length + 1) : p
    console.log('Removed', rel)
    removed++
  }
}

if (removed === 0) {
  console.log('Nothing to clean (.next / node_modules/.cache already absent)')
}
