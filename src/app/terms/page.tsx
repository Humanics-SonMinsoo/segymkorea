import Link from 'next/link'
import { SiteSubPage } from '@/components/layout/SiteSubPage'
import { COMPANY_PUBLIC, LEGAL_DOCS_EFFECTIVE_DATE_KO } from '@/data/company-public'

export const metadata = {
  title: '이용약관 | 세짐 SEGYM',
  description: '세짐(SEGYM) 웹사이트 이용약관',
}

export default function TermsPage() {
  const C = COMPANY_PUBLIC
  return (
    <SiteSubPage
      variant="docs"
      title="이용약관"
      description={`본 이용약관은 ${C.name}(이하 "회사")가 운영하는 세짐(SEGYM) 관련 웹사이트(이하 "사이트")의 이용 조건 및 절차, 회사와 이용자의 권리와 의무 및 책임 사항을 규정함을 목적으로 합니다.`}
      contentMaxWidth="wide"
    >
      <article className="text-gray-700 space-y-10 text-sm leading-relaxed">
        <section>
          <h2 className="card-title text-primary mb-3">제1조 (목적)</h2>
          <p>
            본 약관은 회사가 제공하는 사이트 및 이와 관련된 온라인 서비스(도입 문의, 자료 요청, 안내 콘텐츠 열람 등)의 이용과
            관련하여 회사와 이용자 간 권리와 의무 및 책임 사항, 기타 필요한 사항을 규정합니다.
          </p>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제2조 (정의)</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-gray-900">“사이트”</strong>란 회사가 세짐(SEGYM) 브랜드 및 제품과 서비스를 소개하고
              문의를 접수하기 위해 운영하는 웹사이트를 말합니다.
            </li>
            <li>
              <strong className="text-gray-900">“이용자”</strong>란 사이트에 접속하여 본 약관에 따라 사이트를 이용하는 모든
              자를 말합니다.
            </li>
            <li>
              <strong className="text-gray-900">“콘텐츠”</strong>란 사이트에 게시된 문자, 그림, 사진, 영상, 파일, 로고,
              디자인, 프로그램 등 일체의 정보를 말합니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제3조 (약관의 효력 및 변경)</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>본 약관은 사이트에 게시하거나 기타의 방법으로 이용자에게 고지함으로써 효력이 발생합니다.</li>
            <li>
              회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며, 개정 시 적용 일자 및 개정 사유를 명시하여
              사이트에 사전 고지합니다. 다만 이용자에게 불리한 변경인 경우에는 적용 일자 7일 전부터 공지하고, 중요한 사항은
              그 기간을 늘릴 수 있습니다.
            </li>
            <li>이용자가 개정 약관 시행 이후에도 사이트를 계속 이용하는 경우 개정 약관에 동의한 것으로 봅니다.</li>
          </ol>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제4조 (서비스의 제공 및 변경)</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              회사는 사이트를 통해 제품 및 서비스 소개, 도입 관련 안내, 문의 접수, 자료 제공 요청 처리 등 회사가 정한 서비스를
              제공합니다.
            </li>
            <li>
              회사는 운영상 및 기술상 필요에 따라 제공 서비스의 전부 또는 일부를 변경하거나 중단할 수 있으며, 사전에 사이트를
              통해 공지합니다. 다만 불가피한 긴급한 사유가 있는 경우 사후에 공지할 수 있습니다.
            </li>
            <li>사이트를 통한 문의 및 자료 요청에 대한 구체적인 처리 절차는 회사 정책 및 별도 안내에 따릅니다.</li>
          </ol>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제5조 (이용자의 의무)</h2>
          <p className="mb-2">이용자는 다음 행위를 하여서는 안 됩니다.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>허위 정보를 기재하거나 타인의 정보를 도용하는 행위</li>
            <li>회사 또는 제3자의 저작권, 상표권 등 지식재산권을 침해하는 행위</li>
            <li>회사 또는 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
            <li>악성 프로그램 유포, 시스템 해킹, 과부하 유발 등 사이트의 안정적 운영을 방해하는 행위</li>
            <li>관계 법령 및 본 약관이 금지하거나 공서양속에 반하는 행위</li>
          </ul>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제6조 (개인정보의 보호)</h2>
          <p>
            회사는 이용자의 개인정보를 중요시하며, 관련 법령이 정하는 바에 따라 개인정보를 보호하기 위해 노력합니다. 개인정보의
            수집, 이용, 제공, 파기 등에 관한 사항은{' '}
            <Link href="/privacy" className="font-medium text-primary hover:underline">
              개인정보처리방침
            </Link>
            에 따릅니다.
          </p>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제7조 (저작권 및 지식재산권)</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>사이트에 게재된 콘텐츠에 대한 저작권 및 기타 지식재산권은 회사에 귀속됩니다.</li>
            <li>
              이용자는 회사의 사전 서면 동의 없이 콘텐츠를 복제, 배포, 전송, 전시, 2차적 저작물 작성 등의 방법으로
              이용하거나 제3자에게 이용하게 할 수 없습니다. 다만, 개인적이고 비영리적인 열람을 위한 범위는 예외로 할 수 있습니다.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제8조 (면책)</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              회사는 천재지변, 전쟁, 기간통신사업자의 회선 장애, 불가항력적 시스템 장애 등 회사의 합리적 통제 범위를 벗어난
              사유로 인하여 서비스를 제공할 수 없는 경우에는 책임이 면제됩니다.
            </li>
            <li>
              사이트에 게시된 제품 사양, 가격, 일정 등은 참고용 안내일 수 있으며, 실제 계약 및 견적은 별도 협의에 따릅니다.
            </li>
            <li>이용자가 사이트를 이용하여 기대하는 수익을 얻지 못하거나 자료 이용으로 인한 손해에 대하여 회사는 책임을 지지 않습니다.</li>
            <li>회사는 이용자가 게시하거나 전송한 정보 및 자료의 신뢰성과 정확성 등 내용에 대하여 책임을 지지 않습니다.</li>
          </ol>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제9조 (준거법 및 관할)</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>본 약관의 해석 및 회사와 이용자 간 분쟁에는 대한민국 법령을 준거법으로 합니다.</li>
            <li>
              사이트 이용과 관련하여 회사와 이용자 간에 소송이 제기되는 경우, 관련 법령에 따른 관할 법원을 관할 법원으로 합니다.
              거래 형태에 따라 전속 관할을 특정 법원으로 정하려면 법률 자문 후 본 항을 수정하는 것이 좋습니다.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제10조 (문의)</h2>
          <p className="mb-3">본 약관에 관한 문의는 아래 연락처로 하실 수 있습니다.</p>
          <ul className="list-none space-y-1 text-gray-600">
            <li>
              <strong className="text-gray-900">상호:</strong> {C.name}
            </li>
            <li>
              <strong className="text-gray-900">대표이사:</strong> {C.ceo}
            </li>
            <li>
              <strong className="text-gray-900">사업자등록번호:</strong> {C.bizNo}
            </li>
            <li>
              <strong className="text-gray-900">주소:</strong> {C.addressMain}
            </li>
            <li>
              <strong className="text-gray-900">사무소:</strong> {C.addressOffice}
            </li>
            <li>
              <strong className="text-gray-900">전화:</strong> {C.phone}
            </li>
            <li>
              <strong className="text-gray-900">이메일:</strong>{' '}
              <a href={`mailto:${C.email}`} className="text-primary hover:underline">
                {C.email}
              </a>
            </li>
          </ul>
        </section>

        <p className="text-xs text-gray-500 pt-4 border-t border-gray-200">시행일: {LEGAL_DOCS_EFFECTIVE_DATE_KO}</p>
      </article>
    </SiteSubPage>
  )
}
