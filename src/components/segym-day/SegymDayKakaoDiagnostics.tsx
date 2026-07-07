'use client'

import { useMemo } from 'react'
import { getSegymDayOgImageUrl, getSegymDayPageUrl } from '@/lib/segym-day-share'
import { getKakaoJsKey } from '@/lib/kakao-share'

export function SegymDayKakaoDiagnostics() {
  const pageUrl = useMemo(() => getSegymDayPageUrl(), [])
  const imageUrl = useMemo(() => getSegymDayOgImageUrl(), [])
  const key = getKakaoJsKey()
  const keyHint = key ? `${key.slice(0, 8)}…${key.slice(-4)}` : '(Vercel에 NEXT_PUBLIC_KAKAO_JS_KEY 없음)'
  const host = typeof window !== 'undefined' ? window.location.hostname : ''

  return (
    <details className="mt-4 rounded-lg border border-slate-200 bg-slate-50/80 text-xs ko-modal-copy">
      <summary className="cursor-pointer px-3 py-2.5 font-semibold text-slate-700 hover:text-slate-900">
        카카오 공유 오류 확인 (진단 정보)
      </summary>
      <div className="px-3 pb-3 pt-1 space-y-3 text-slate-600 leading-relaxed border-t border-slate-200/80">
        <p className="text-slate-800 bg-white border border-slate-100 rounded-md px-2 py-1.5">
          <strong>4011</strong> = Vercel에 넣은 키가 잘못됨 (REST API 키·다른 앱 키·오타·삭제된 키)
          <br />
          <strong>4019</strong> = 도메인 미등록 (JavaScript SDK 도메인 + 제품 링크 웹 도메인)
        </p>
        <div className="space-y-1 font-mono text-[11px] break-all bg-white rounded-md p-2 border border-slate-100">
          <p>
            <span className="text-slate-500">현재 접속:</span> {host || '—'}
          </p>
          <p>
            <span className="text-slate-500">JS 키:</span> {keyHint}
          </p>
          <p>
            <span className="text-slate-500">공유 링크:</span> {pageUrl}
          </p>
          <p>
            <span className="text-slate-500">공유 이미지:</span> {imageUrl}
          </p>
        </div>
        <p className="font-semibold text-slate-800">4011일 때 (지금 이 오류)</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            developers.kakao.com → 세짐 앱 → <strong>플랫폼 키 → JavaScript 키</strong>에서 키 복사
            (REST API 키·Admin 키 아님)
          </li>
          <li>
            Vercel → 프로젝트 → Settings → Environment Variables →{' '}
            <code className="text-[11px]">NEXT_PUBLIC_KAKAO_JS_KEY</code> 값을 위 키로 <strong>전부 교체</strong>
          </li>
          <li>아래 JS 키 앞 8자리가 콘솔 JavaScript 키와 일치하는지 확인 후 <strong>재배포</strong></li>
        </ol>
        <p className="font-semibold text-slate-800">4019일 때 — 도메인은 아래 두 곳 모두</p>
        <ol className="list-decimal list-inside space-y-2" start={4}>
          <li>
            <strong>앱 → 플랫폼 키 → JavaScript 키</strong> 클릭 →{' '}
            <strong>JavaScript SDK 도메인</strong>에 추가:
            <br />
            <code className="text-[11px]">https://segymkorea.com</code>
            <br />
            <code className="text-[11px]">https://www.segymkorea.com</code>
          </li>
          <li>
            <strong>앱 → 제품 링크 관리 → 웹 도메인</strong>에 동일하게 추가
          </li>
          <li>
            Vercel <code className="text-[11px]">NEXT_PUBLIC_SITE_URL</code> ={' '}
            <code className="text-[11px]">https://segymkorea.com</code>
          </li>
        </ol>
        <p className="text-amber-800 bg-amber-50 border border-amber-100 rounded-md px-2 py-1.5">
          저장 후 5~10분 기다렸다가, 시크릿 창에서 다시 시도해 보세요.
        </p>
      </div>
    </details>
  )
}
