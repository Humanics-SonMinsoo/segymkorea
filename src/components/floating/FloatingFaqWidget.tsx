'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { useModalEnterAnimation } from '@/hooks/useModalEnterAnimation'

const kakaoChannelUrl = (process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ?? '').trim()

type FaqItem = {
  id: string
  question: string
  body: ReactNode
}

type PanelView = 'list' | { answerId: string }

function bubbleShellClass(entered: boolean) {
  return `relative w-[min(calc(100vw-1.5rem),20rem)] md:w-[min(22rem,calc(100vw-6rem))] max-h-[min(65vh,30rem)] md:max-h-[min(72vh,34rem)] flex flex-col rounded-2xl border border-gray-200 bg-white shadow-xl ring-1 ring-black/[0.04] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:duration-200 motion-reduce:transition-opacity motion-reduce:translate-y-0 motion-reduce:scale-100 ${
    entered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-[0.97]'
  }`
}

function FaqPanel({
  view,
  items,
  onClose,
  onSelectQuestion,
  onBackToList,
}: {
  view: PanelView
  items: FaqItem[]
  onClose: () => void
  onSelectQuestion: (id: string) => void
  onBackToList: () => void
}) {
  const entered = useModalEnterAnimation()
  const active = typeof view === 'object' ? items.find((f) => f.id === view.answerId) : null

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (active) onBackToList()
        else onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active, onBackToList, onClose])

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="faq-panel-title"
      style={{ transformOrigin: 'bottom right' }}
      className={bubbleShellClass(entered)}
    >
      <div
        className="pointer-events-none absolute right-5 -bottom-[6px] h-3 w-3 rotate-45 border-r border-b border-gray-200 bg-white"
        aria-hidden
      />

      <div className="flex shrink-0 items-start justify-between gap-2 border-b border-gray-100 px-3.5 py-2.5 sm:px-4 sm:py-3">
        <div className="min-w-0 flex items-start gap-2 pr-1">
          {active ? (
            <button
              type="button"
              onClick={onBackToList}
              className="mt-0.5 shrink-0 rounded-lg p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              aria-label="목록으로"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : null}
          <h2 id="faq-panel-title" className="text-sm sm:text-[0.9375rem] font-bold text-gray-900 ko-modal-copy leading-snug">
            {active ? active.question : '자주 묻는 질문'}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          aria-label="닫기"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3.5 py-3 sm:px-4 sm:py-4 text-sm sm:text-[0.9375rem] text-gray-700 leading-relaxed">
        {active ? (
          <div className="space-y-4">
            {active.body}
            <OpenInquiryButton
              onClick={onClose}
              className="w-full px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              도입 문의하기
            </OpenInquiryButton>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-gray-500 ko-modal-copy mb-3">궁금한 질문을 선택해 주세요.</p>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectQuestion(item.id)}
                className="w-full text-left rounded-xl border border-gray-200 bg-gray-50/80 hover:bg-primary-muted/40 hover:border-primary/25 transition-colors px-3 py-2.5 sm:px-3.5 sm:py-3"
              >
                <span className="text-[13px] sm:text-sm font-medium text-gray-800 ko-modal-copy leading-snug">
                  {item.question}
                </span>
              </button>
            ))}
            <OpenInquiryButton
              onClick={onClose}
              className="mt-3 w-full px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              도입 문의하기
            </OpenInquiryButton>
          </div>
        )}
      </div>
    </div>
  )
}

export function FloatingFaqWidget() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<PanelView>('list')
  const clusterRef = useRef<HTMLDivElement>(null)

  const hideOnAdmin = pathname?.startsWith('/admin') ?? false
  const hideOnEnglish = pathname === '/en' || (pathname?.startsWith('/en/') ?? false)
  const hideOnSegymDay = pathname === '/segym-day' || (pathname?.startsWith('/segym-day/') ?? false)
  const hideOnUpdate = pathname === '/update' || (pathname?.startsWith('/update/') ?? false)

  const faqItems: FaqItem[] = useMemo(
    () => [
      {
        id: 'rental',
        question: '렌탈이나 월 납입으로도 도입할 수 있나요?',
        body: (
          <div className="space-y-3 ko-modal-copy text-gray-700">
            <p>
              네, 가능합니다.
              <br />
              세짐은 구매뿐 아니라 <strong className="text-gray-900">렌탈, 월 납입</strong> 등 센터 상황에 맞는 도입 형태를 함께
              조율해 드리고 있습니다.
            </p>
            <p>
              부담 수준은 도입 조건에 따라 달라질 수 있으며, <strong className="text-gray-900">월 30만원대로</strong> 부담 없이
              도입하실 수 있도록 도와드리고 있습니다.
              <br />
              정확한 조건은 간단한 문의만 주셔도 견적에 맞춰 차근차근 설명드리겠습니다.
            </p>
          </div>
        ),
      },
      {
        id: 'install',
        question: '계약 후 설치까지 얼마나 걸리나요?',
        body: (
          <div className="space-y-3 ko-modal-copy text-gray-700">
            <p>
              통상적으로는 <strong className="text-gray-900">약 1개월 전후</strong>를 기준으로 안내를 드리고 있습니다.
              <br />
              다만 현장 환경, 옵션 구성, 일정 협의에 따라 다소 전후할 수 있는 점은 너그럽게 양해 부탁드립니다.
            </p>
            <p>급하신 일정이 있으시면 말씀해 주시면 가능한 범위에서 맞춰 도와드리겠습니다.</p>
          </div>
        ),
      },
      {
        id: 'consult',
        question: '도입 전에 상담만 받아볼 수 있나요?',
        body: (
          <div className="space-y-3 ko-modal-copy text-gray-700">
            <p>
              물론입니다.
              <br />
              아직 결정 전이시더라도 스펙, 비용, 설치 일정 등 궁금하신 점을 편하게 나눠 주시면, 저희가 성심껏 안내해 드리겠습니다.
              <br />
              직접 써 보고 싶으시면 <strong className="text-gray-900">체험</strong> 가능 여부도 함께 안내해 드립니다.
            </p>
            <p className="text-sm text-gray-600">
              구체적인 조건은 문의를 남겨 주시면 담당자가 확인 후 연락드립니다.
            </p>
          </div>
        ),
      },
    ],
    [],
  )

  const close = useCallback(() => {
    setOpen(false)
    setView('list')
  }, [])

  useEffect(() => {
    if (!open) return
    const onDocDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (clusterRef.current?.contains(t)) return
      close()
    }
    document.addEventListener('mousedown', onDocDown)
    return () => document.removeEventListener('mousedown', onDocDown)
  }, [open, close])

  if (hideOnAdmin || hideOnEnglish || hideOnSegymDay || hideOnUpdate) {
    return null
  }

  return (
    <div
      ref={clusterRef}
      className="fixed bottom-24 right-6 z-[85] flex flex-col items-end gap-2"
      aria-label="자주 묻는 질문 및 상담"
    >
      {open ? (
        <FaqPanel
          view={view}
          items={faqItems}
          onClose={close}
          onSelectQuestion={(id) => setView({ answerId: id })}
          onBackToList={() => setView('list')}
        />
      ) : null}

      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() =>
            setOpen((prev) => {
              if (prev) {
                setView('list')
                return false
              }
              setView('list')
              return true
            })
          }
          className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={open ? '자주 묻는 질문 닫기' : '자주 묻는 질문 열기'}
          aria-expanded={open}
        >
          {open ? (
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          )}
        </button>

        {kakaoChannelUrl ? (
          <a
            href={kakaoChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="카카오톡 실시간 상담 (새 창)"
            className="flex items-center gap-1.5 rounded-full bg-[#FEE500] px-3.5 py-2.5 sm:px-4 text-xs sm:text-sm font-bold text-[#191919] shadow-lg shadow-black/15 transition hover:bg-[#fdd835] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FEE500] focus-visible:ring-offset-2"
          >
            <svg className="h-4 w-4 sm:h-[18px] sm:w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.85 5.33 4.64 6.75-.15.55-.55 2.01-.63 2.32-.1.4.15.39.31.29.13-.09 2.05-1.4 2.88-1.97.9.13 1.84.21 2.8.21 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
            </svg>
            실시간 상담
          </a>
        ) : null}
      </div>
    </div>
  )
}
