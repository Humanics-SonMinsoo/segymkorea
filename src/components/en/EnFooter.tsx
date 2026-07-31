import Link from 'next/link'
import { COMPANY_PUBLIC_EN, EN_NAV } from '@/data/en/site'
import { FooterAdminLinks } from '@/components/layout/FooterAdminLinks'
import { ScrollToTopButton } from '@/components/layout/ScrollToTopButton'

export function EnFooter() {
  const C = COMPANY_PUBLIC_EN
  return (
    <>
      <footer className="bg-black text-gray-400 text-sm leading-relaxed">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="mb-8 pb-8 border-b border-gray-800">
            <p
              className="text-xl text-white font-bold italic tracking-tight"
              style={{ fontFamily: 'var(--font-segym)' }}
            >
              SEGYM
            </p>
            <p className="mt-2 text-gray-500">
              SEGYM is a product and service of Humanics Co., Ltd. — an AI healthcare robotics company based in Korea.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
              <li>
                <Link href="/en" className="hover:text-gray-300 underline-offset-2 hover:underline">
                  {EN_NAV.home}
                </Link>
              </li>
              <li>
                <Link href="/en/product" className="hover:text-gray-300 underline-offset-2 hover:underline">
                  {EN_NAV.product}
                </Link>
              </li>
              <li>
                <Link href="/en/installations" className="hover:text-gray-300 underline-offset-2 hover:underline">
                  {EN_NAV.installations}
                </Link>
              </li>
              <li>
                <Link href="/en/scan-and-score" className="hover:text-gray-300 underline-offset-2 hover:underline">
                  {EN_NAV.scanAndScore}
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gray-300 underline-offset-2 hover:underline">
                  Korean site
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p>
              <span className="font-semibold text-gray-200">{C.legalName}</span>
              <span className="mx-2 text-gray-700 hidden sm:inline">|</span>
              <span className="block sm:inline mt-1 sm:mt-0">
                <span className="font-semibold text-gray-200">CEO</span> {C.ceo}
              </span>
              <span className="mx-2 text-gray-700 hidden sm:inline">|</span>
              <span className="block sm:inline mt-1 sm:mt-0">
                <span className="font-semibold text-gray-200">Business Reg. No.</span> {C.bizNo}
              </span>
            </p>
            <p>
              <span className="font-semibold text-gray-200">HQ &amp; R&amp;D</span> {C.addressMain}
            </p>
            <p>
              <span className="font-semibold text-gray-200">Sales office</span> {C.addressOffice}
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-1">
              <p>
                <span className="font-semibold text-gray-200">Phone</span>{' '}
                <a href={`tel:${C.phone}`} className="hover:text-white transition-colors">
                  {C.phone}
                </a>
              </p>
              <p>
                <span className="font-semibold text-gray-200">Email</span>{' '}
                <a href={`mailto:${C.email}`} className="hover:text-white transition-colors break-all">
                  {C.email}
                </a>
              </p>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-3">
              <FooterAdminLinks />
              <p className="text-xs text-gray-600 text-left lg:text-right">
                © 2026 {C.legalName} ({C.legalNameKo}) All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
      <ScrollToTopButton />
    </>
  )
}
