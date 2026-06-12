import Link from 'next/link'
import { COMPANY_PUBLIC } from '@/data/company-public'
import { FooterAdminLinks } from './FooterAdminLinks'
import { ScrollToTopButton } from './ScrollToTopButton'

export default function Footer() {
  const C = COMPANY_PUBLIC
  return (
    <>
      <footer className="bg-black text-gray-400 text-sm leading-relaxed">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          {/* 브랜드 (세짐 사이트) */}
          <div className="mb-8 pb-8 border-b border-gray-800">
            <p
              className="text-xl text-white font-bold italic tracking-tight"
              style={{ fontFamily: 'var(--font-segym)' }}
            >
              SEGYM
            </p>
            <p className="mt-2 text-gray-500 ko-modal-copy">
              AI 스마트 운동로봇 세짐(SEGYM)은 주식회사 휴머닉스의 제품과 서비스입니다.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
              <li>
                <Link href="/product" className="hover:text-gray-300 underline-offset-2 hover:underline">
                  제품소개
                </Link>
              </li>
              <li>
                <Link href="/product/smith#specs" className="hover:text-gray-300 underline-offset-2 hover:underline">
                  스펙시트
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-gray-300 underline-offset-2 hover:underline">
                  가격안내
                </Link>
              </li>
              <li>
                <Link href="/installations" className="hover:text-gray-300 underline-offset-2 hover:underline">
                  설치사례
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-300 underline-offset-2 hover:underline">
                  블로그
                </Link>
              </li>
              <li>
                <span
                  className="text-gray-600 opacity-50 cursor-default select-none pointer-events-none"
                  title="준비 중입니다"
                  aria-disabled="true"
                >
                  사용 가이드
                </span>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-300 underline-offset-2 hover:underline">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-300 underline-offset-2 hover:underline">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>

          {/* 전자상거래법상 사업자 정보 (통신판매, 사업자 홈페이지 표시 의무) */}
          <div className="space-y-3 ko-modal-copy">
            <p>
              <span className="font-semibold text-gray-200">{C.name}</span>
              <span className="mx-2 text-gray-700 hidden sm:inline">|</span>
              <span className="block sm:inline mt-1 sm:mt-0">
                <span className="font-semibold text-gray-200">대표이사</span> {C.ceo}
              </span>
              <span className="mx-2 text-gray-700 hidden sm:inline">|</span>
              <span className="block sm:inline mt-1 sm:mt-0">
                <span className="font-semibold text-gray-200">사업자등록번호</span> {C.bizNo}
              </span>
            </p>
            <p>
              <span className="font-semibold text-gray-200">본사 &amp; 연구소</span> {C.addressMain}
            </p>
            <p>
              <span className="font-semibold text-gray-200">영업 사무소</span> {C.addressOffice}
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-1 ko-modal-copy">
              <p>
                <span className="font-semibold text-gray-200">전화번호</span>{' '}
                <a href={`tel:${C.phone}`} className="hover:text-white transition-colors">
                  {C.phone}
                </a>
              </p>
              <p>
                <span className="font-semibold text-gray-200">이메일</span>{' '}
                <a
                  href={`mailto:${C.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {C.email}
                </a>
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-3">
              <FooterAdminLinks />
              <p className="text-xs text-gray-600 text-left lg:text-right ko-modal-copy">
                © 2026 Humanics Co., Ltd. ({C.name}) All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
      <ScrollToTopButton />
    </>
  )
}
