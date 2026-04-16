'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { trackMetaStandard } from '@/lib/meta-pixel'
import type { PricingProduct } from '@/data/pricing-products'
import { OpenInquiryButton } from '@/components/inquiry/OpenInquiryButton'
import { OpenBrochureButton } from '@/components/brochure/OpenBrochureButton'

type Props = {
  product: PricingProduct
}

export function PricingProductDetailContent({ product }: Props) {
  const isSmith = product.id === 'smith'

  useEffect(() => {
    trackMetaStandard('ViewContent', {
      content_ids: product.id,
      content_type: 'pricing',
      content_name: product.name,
    })
  }, [product.id, product.name])

  return (
    <div className="space-y-10 sm:space-y-12">
      <article className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
        <div className="aspect-[16/10] bg-gray-100">
          <img src={product.imageSrc} alt={product.imageAlt} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 sm:p-8">
          <h2 className="section-title text-xl sm:text-2xl text-gray-900">{product.name}</h2>
          <p className="mt-3 text-lg sm:text-xl font-bold text-primary ko-modal-copy leading-snug">
            {product.monthlyLine}
          </p>
          <div className="mt-5 space-y-4 max-w-2xl text-base text-gray-600 ko-modal-copy leading-relaxed">
            {product.details.map((para, i) => (
              <p key={i} className="whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <OpenInquiryButton
              className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-primary-dark sm:w-auto min-h-[48px]"
              aria-label={`${product.name} 도입 문의`}
            >
              도입 문의하기
            </OpenInquiryButton>
            <OpenBrochureButton className="inline-flex w-full items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-6 py-3.5 text-base font-semibold text-gray-900 transition hover:border-gray-300 hover:bg-gray-50 sm:w-auto min-h-[48px]">
              소개서 받기
            </OpenBrochureButton>
            {product.moreHref ? (
              <Link
                href={product.moreHref}
                className="inline-flex w-full items-center justify-center rounded-xl border-2 border-primary/30 bg-white px-6 py-3.5 text-base font-semibold text-primary transition hover:bg-primary-muted/50 sm:w-auto min-h-[48px]"
              >
                {product.moreLabel ?? '제품 상세 보기'}
              </Link>
            ) : null}
          </div>
          <p className="mt-5 text-xs text-gray-500 ko-modal-copy leading-relaxed border-t border-gray-100 pt-5">
            부가세, 옵션, 설치 비용은 견적에 따라 안내드립니다.
          </p>
        </div>
      </article>

      <section aria-labelledby="pricing-models-title">
        <h3 id="pricing-models-title" className="section-title text-xl sm:text-2xl text-gray-900">
          도입 방식에 따른 안내
        </h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-primary/25 hover:shadow-brand">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal">렌탈, 월 부담</p>
            <h4 className="card-title mt-2 text-lg">초기 부담을 나누어 시작</h4>
            <p className="mt-3 text-sm text-gray-600 ko-modal-copy leading-relaxed">
              월 정액 형태로 운영에 맞추실 수 있도록 상담해 드립니다.
              <br />
              약정과 유지 조건은 계약 형태에 맞게 안내드립니다.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-primary/25 hover:shadow-brand">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">구매, 일시불</p>
            <h4 className="card-title mt-2 text-lg">장기 운영에 맞춘 소유</h4>
            <p className="mt-3 text-sm text-gray-600 ko-modal-copy leading-relaxed">
              일시불, 분할 등 구매 조건도 함께 협의할 수 있습니다.
              <br />
              세무, 자산 처리는 사업자 상황에 맞게 별도로 살펴보시면 됩니다.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8" aria-labelledby="pricing-faq-title">
        <h3 id="pricing-faq-title" className="card-title text-lg sm:text-xl text-gray-900">
          자주 묻는 질문
        </h3>
        <dl className="mt-6 space-y-6">
          <div>
            <dt className="text-sm font-semibold text-gray-900">웹에는 단가표가 없나요?</dt>
            <dd className="mt-2 text-sm text-gray-600 ko-modal-copy leading-relaxed">
              옵션, 설치, 계약 방식에 따라 달라져 고정 표로 적기 어렵습니다.
              <br />
              원하시는 구성은 문의 주시면 견적으로 안내드립니다.
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-gray-900">월 30만원대는 고정 금액인가요?</dt>
            <dd className="mt-2 text-sm text-gray-600 ko-modal-copy leading-relaxed">
              월 30만원대는 모든 센터에 동일하게 적용되는 고정 금액은 아닙니다.
              <br />
              월 부담을 참고하실 수 있도록 적어 둔 안내이며, 센터 조건에 맞게 조율해 드립니다.
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-gray-900">견적은 얼마나 걸리나요?</dt>
            <dd className="mt-2 text-sm text-gray-600 ko-modal-copy leading-relaxed">
              접수 순서에 따라 순차적으로 안내드립니다.
              <br />
              최대한 빠르게 안내받으실 수 있도록 도와드리겠습니다.
            </dd>
          </div>
        </dl>
        {isSmith ? (
          <p className="mt-8 text-sm text-gray-500 ko-modal-copy">
            기본 사양은{' '}
            <Link href="/product/smith#specs" className="font-medium text-primary hover:underline">
              스펙시트
            </Link>
            에서 확인하실 수 있습니다.
          </p>
        ) : (
          <p className="mt-8 text-sm text-gray-500 ko-modal-copy">사양과 일정은 도입 문의 시 안내드립니다.</p>
        )}
      </section>

      <section className="rounded-2xl bg-gradient-to-r from-primary to-primary-dark p-8 text-center text-white shadow-brand-lg sm:p-10">
        <p className="text-sm font-medium text-white/90 ko-modal-copy">
          궁금하신 금액과 조건은 편하게 문의 주시면 안내드리겠습니다.
        </p>
        <OpenInquiryButton
          className="mt-5 inline-flex min-h-[48px] w-full max-w-md items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary shadow-md transition hover:bg-gray-50 sm:w-auto"
          aria-label={`${product.name} 도입 문의`}
        >
          도입 문의하기
        </OpenInquiryButton>
        <p className="mt-4 text-xs text-white/75 ko-modal-copy">
          <Link href="/pricing" className="font-medium underline underline-offset-2 hover:text-white">
            가격안내 목록
          </Link>
          으로 돌아가기
        </p>
      </section>
    </div>
  )
}
