import { useEffect, useState } from 'react'

/**
 * 모달 마운트 직후 한 프레임 뒤 true → CSS transition으로 스르르나오게
 */
export function useModalEnterAnimation(): boolean {
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    let cancelled = false
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) setEntered(true)
      })
    })
    return () => {
      cancelled = true
    }
  }, [])
  return entered
}
