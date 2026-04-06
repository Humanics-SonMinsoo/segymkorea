'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { useModalEnterAnimation } from '@/hooks/useModalEnterAnimation'

const CHAT_PANEL_ID = '__chat__'

const kakaoChannelUrl = (process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ?? '').trim()

type FaqItem = {
  id: string
  question: string
  /** 말풍선 본문 (문의 버튼은 공통으로 아래에 붙음) */
  body: ReactNode
}

function bubbleShellClass(entered: boolean) {
  return `relative w-[min(calc(100vw-1.5rem),20rem)] md:w-[min(22rem,calc(100vw-6rem))] max-h-[min(65vh,30rem)] md:max-h-[min(72vh,34rem)] flex flex-col rounded-2xl border border-gray-200 bg-white ring-1 ring-black/[0.04] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:duration-200 motion-reduce:transition-opacity motion-reduce:translate-y-0 motion-reduce:scale-100 ${
    entered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-[0.97]'
  }`
}

function FaqAnswerBubble({ item, onClose }: { item: FaqItem; onClose: () => void }) {
  const entered = useModalEnterAnimation()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="faq-bubble-title"
      style={{ transformOrigin: 'bottom right' }}
      className={bubbleShellClass(entered)}
    >
      <div
        className="pointer-events-none absolute right-8 sm:right-9 -bottom-[6px] h-3 w-3 rotate-45 border-r border-b border-gray-200 bg-white"
        aria-hidden
      />

      <div className="flex shrink-0 items-start justify-between gap-2 border-b border-gray-100 px-3.5 py-2.5 sm:px-4 sm:py-3">
        <h2 id="faq-bubble-title" className="text-sm sm:text-[0.9375rem] font-bold text-gray-900 ko-modal-copy leading-snug pr-1">
          {item.question}
        </h2>
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
        <div className="space-y-4">
          {item.body}
          <OpenInquiryButton
            onClick={onClose}
            className="w-full px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            도입 문의하기
          </OpenInquiryButton>
        </div>
      </div>
    </div>
  )
}

function ChatEntryBubble({ onClose }: { onClose: () => void }) {
  const entered = useModalEnterAnimation()
  const hasKakao = kakaoChannelUrl.length > 0

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="chat-entry-bubble-title"
      style={{ transformOrigin: 'bottom right' }}
      className={bubbleShellClass(entered)}
    >
      <div
        className="pointer-events-none absolute right-8 sm:right-9 -bottom-[6px] h-3 w-3 rotate-45 border-r border-b border-gray-200 bg-white"
        aria-hidden
      />

      <div className="flex shrink-0 items-start justify-between gap-2 border-b border-gray-100 px-3.5 py-2.5 sm:px-4 sm:py-3">
        <h2 id="chat-entry-bubble-title" className="text-sm sm:text-[0.9375rem] font-bold text-gray-900 ko-modal-copy leading-snug pr-1">
          실시간 채팅 필요하신가요?
        </h2>
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
        <div className="space-y-3">
          <p className="ko-modal-copy text-gray-700">
            궁금하신 점은 <strong className="text-gray-900">도입 문의</strong>로 남겨 주시면 담당자가 빠르게 연락드립니다.
          </p>
          <OpenInquiryButton
            onClick={onClose}
            className="w-full px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            도입 문의하기
          </OpenInquiryButton>
          {hasKakao ? (
            <a
              href={kakaoChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-xl border-2 border-[#FEE500] bg-[#FEE500] px-4 py-2.5 text-sm font-semibold text-[#191919] transition hover:bg-[#fdd835]"
            >
              카카오톡 채팅상담
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export function FloatingFaqWidget() {
  const pathname = usePathname()
  const [openId, setOpenId] = useState<string | null>(null)
  const close = useCallback(() => setOpenId(null), [])
  const clusterRef = useRef<HTMLDivElement>(null)

  const hideOnAdmin = pathname?.startsWith('/admin') ?? false

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

  const activeFaq = openId && openId !== CHAT_PANEL_ID ? faqItems.find((f) => f.id === openId) : null
  const chatOpen = openId === CHAT_PANEL_ID

  useEffect(() => {
    if (!openId) return
    const onDocDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (clusterRef.current?.contains(t)) return
      close()
    }
    document.addEventListener('mousedown', onDocDown)
    return () => document.removeEventListener('mousedown', onDocDown)
  }, [openId, close])

  if (hideOnAdmin) {
    return null
  }

  return (
    <div
      ref={clusterRef}
      className="fixed bottom-24 right-6 z-[85] flex flex-col items-end gap-2"
      aria-label="자주 묻는 질문 및 상담"
    >
      {activeFaq ? <FaqAnswerBubble item={activeFaq} onClose={close} /> : null}
      {chatOpen ? <ChatEntryBubble onClose={close} /> : null}

      <div className="flex max-w-[min(100vw-1.5rem,16rem)] sm:max-w-[17rem] flex-col items-end gap-1 sm:gap-1.5 shrink-0">
        {faqItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              setOpenId((prev) => {
                if (prev === item.id) return null
                return item.id
              })
            }
            className="w-full text-left rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200/90 shadow-md hover:shadow-lg hover:border-primary/25 transition-all duration-200 px-2.5 py-1.5 sm:px-3 sm:py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span className="text-[11px] sm:text-[13px] leading-snug text-gray-800 font-medium ko-modal-copy line-clamp-2">
              {item.question}
            </span>
          </button>
        ))}

        <button
          type="button"
          onClick={() => setOpenId((prev) => (prev === CHAT_PANEL_ID ? null : CHAT_PANEL_ID))}
          className="mt-0.5 flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="실시간 상담, 채팅 안내 열기"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
