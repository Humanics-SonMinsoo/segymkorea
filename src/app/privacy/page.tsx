import { SiteSubPage } from '@/components/layout/SiteSubPage'
import {
  COMPANY_PUBLIC,
  LEGAL_DOCS_EFFECTIVE_DATE_KO,
  PRIVACY_DPO,
  PRIVACY_RETENTION_PERIOD_KO,
} from '@/data/company-public'

export const metadata = {
  title: '개인정보처리방침 | 세짐 SEGYM',
  description: '세짐(SEGYM) 개인정보처리방침',
}

export default function PrivacyPage() {
  const C = COMPANY_PUBLIC
  return (
    <SiteSubPage
      variant="docs"
      title="개인정보처리방침"
      description={`${C.name}(이하 "회사")는 「개인정보 보호법」 등 관계 법령을 준수하며, 세짐(SEGYM) 관련 온라인 문의 서비스 이용자의 개인정보를 보호하기 위해 다음과 같이 개인정보처리방침을 수립, 공개합니다.`}
      contentMaxWidth="wide"
    >
      <article className="text-gray-700 space-y-10 text-sm leading-relaxed">
        <section>
          <h2 className="card-title text-primary mb-3">제1조 (처리 목적)</h2>
          <p>
            회사는 수집한 개인정보를 다음의 목적 범위에서만 처리합니다. 목적이 변경되는 경우 사전에 고지하고 필요 시 별도 동의를 받습니다.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>도입 문의:</strong> 제품, 서비스 도입 상담, 연락 및 회신, 내부 영업, 고객관리 기록
            </li>
            <li>
              <strong>소개서 요청:</strong> 자료 발송(이메일 등), 문의 응대, 내부 마케팅, 통계(식별 가능한 형태로 한정)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제2조 (수집 항목 및 방법)</h2>
          <p className="mb-2">회사는 다음과 같은 개인정보를 수집할 수 있습니다.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>도입 문의(웹사이트 양식):</strong> 센터(또는 기관)명, 성명, 연락처(전화번호), 통화 가능 시간, 선택 입력 시 추가 문의
              내용
            </li>
            <li>
              <strong>소개서 요청(웹사이트 양식):</strong> 이메일 주소, 센터(또는 기관)명, 연락처(전화번호)
            </li>
          </ul>
          <p className="mt-3">
            수집 방법은 <strong>회사가 운영하는 웹사이트의 입력 양식</strong>, 이용자의 자발적 제공에 한합니다.
          </p>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제3조 (보유, 이용 기간 및 파기)</h2>
          <p>
            원칙적으로 개인정보는 <strong>수집, 이용 목적이 달성된 후 지체 없이 파기</strong>합니다. 다만 관계 법령에 따라 보존할 의무가 있는
            경우 해당 법령에서 정한 기간 동안 보관할 수 있습니다.
          </p>
          <p className="mt-2">
            파기는 복구, 재생이 곤란한 방법으로 진행하며, 전자적 파일은 복구가 불가능한 기술적 방법으로 삭제합니다.
          </p>
          {PRIVACY_RETENTION_PERIOD_KO ? (
            <p className="mt-2">
              <strong>내부 보관 기간:</strong> {PRIVACY_RETENTION_PERIOD_KO}
            </p>
          ) : (
            <p className="mt-2 text-gray-600">
              <strong>내부 보관 기간</strong>은 회사 정책(예: 문의 접수일 기준 보관 연수)에 따라 정해집니다. 확정된 기간은 본 조항에
              구체적으로 적는 것이 좋습니다.
            </p>
          )}
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제4조 (제3자 제공)</h2>
          <p>
            회사는 원칙적으로 이용자의 개인정보를 제1조의 목적 범위를 넘어 제3자에게 제공하지 않습니다. 다만 이용자의 동의가 있거나 법령에
            근거한 경우는 예외로 합니다.
          </p>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제5조 (처리 위탁)</h2>
          <p>
            현재 회사는 웹사이트 문의 데이터를 <strong>회사가 관리하는 서버, 저장소</strong>에 보관하는 형태로 운영할 수 있습니다. 향후
            호스팅, 이메일 발송, CRM 등 <strong>개인정보 처리를 제3자에게 위탁</strong>하는 경우, 위탁받는 자, 위탁 업무 내용, 위탁 기간을 본 방침에
            고지하고 관계 법령에 따른 조치를 하겠습니다.
          </p>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제6조 (국외 이전)</h2>
          <p>회사는 현재 이용자의 개인정보를 국외로 이전하지 않습니다. 이전하게 되는 경우 관계 법령에 따라 별도 고지, 동의 절차를 진행합니다.</p>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제7조 (쿠키 등 자동 수집)</h2>
          <p>
            본 사이트는 <strong>마케팅, 광고 목적의 행태정보 추적 쿠키를 사용하지 않습니다.</strong> 관리자 로그인 등 서비스 운영에 필요한 기술적
            저장 수단이 사용될 수 있으며, 이는 일반 방문자의 문의와 별도의 접근 통제 하에 적용됩니다.
          </p>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제8조 (정보주체의 권리)</h2>
          <p>이용자는 언제든지 다음 권리를 행사할 수 있습니다.</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>개인정보 열람, 정정, 삭제, 처리정지 요구</li>
          </ul>
          <p className="mt-2">
            권리 행사는 아래 연락처로 서면, 전자우편 등으로 요청할 수 있으며, 회사는 지체 없이 조치합니다. 다만 법령에서 열람이 제한되거나 정당한
            사유가 있는 경우 요청이 제한될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제9조 (개인정보의 안전성 확보 조치)</h2>
          <p>
            회사는 개인정보의 분실, 도난, 유출, 변조, 훼손을 방지하기 위해 접근 권한 관리, 저장소 보호, 전송 구간 보안(HTTPS 등) 등 합리적인 조치를
            취합니다.
          </p>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제10조 (개인정보 보호책임자)</h2>
          {PRIVACY_DPO ? (
            <>
              <p className="mb-2">회사는 개인정보 처리에 관한 업무를 총괄하는 개인정보 보호책임자를 다음과 같이 지정합니다.</p>
              <ul className="pl-0 list-none space-y-1 text-gray-800 mb-3">
                <li>
                  <span className="font-semibold text-gray-900">성명</span> {PRIVACY_DPO.name}
                </li>
                <li>
                  <span className="font-semibold text-gray-900">직책</span> {PRIVACY_DPO.title}
                </li>
                {PRIVACY_DPO.phone ? (
                  <li>
                    <span className="font-semibold text-gray-900">전화</span>{' '}
                    <a href={`tel:${PRIVACY_DPO.phone}`} className="text-primary font-medium hover:underline">
                      {PRIVACY_DPO.phone}
                    </a>
                  </li>
                ) : null}
                {PRIVACY_DPO.email ? (
                  <li>
                    <span className="font-semibold text-gray-900">이메일</span>{' '}
                    <a href={`mailto:${PRIVACY_DPO.email}`} className="text-primary font-medium hover:underline break-all">
                      {PRIVACY_DPO.email}
                    </a>
                  </li>
                ) : null}
              </ul>
            </>
          ) : (
            <p className="mb-2 text-gray-600">
              개인정보 보호책임자 성명, 직책, 연락처는 내부에서 지정한 뒤 본 조항에 직접 기재하는 것이 좋습니다. 아래는 당분간
              일반 연락처로 문의를 받는 안내입니다.
            </p>
          )}
          <p className="mb-2">문의는 아래 연락처로도 가능합니다.</p>
          <ul className="pl-0 list-none space-y-1 text-gray-800">
            <li>
              <span className="font-semibold text-gray-900">상호</span> {C.name}
            </li>
            <li>
              <span className="font-semibold text-gray-900">전화</span>{' '}
              <a href={`tel:${C.phone}`} className="text-primary font-medium hover:underline">
                {C.phone}
              </a>
            </li>
            <li>
              <span className="font-semibold text-gray-900">이메일</span>{' '}
              <a href={`mailto:${C.email}`} className="text-primary font-medium hover:underline break-all">
                {C.email}
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제11조 (권익침해 구제)</h2>
          <p className="mb-2">개인정보 침해에 대한 신고, 상담이 필요한 경우 아래 기관에 문의할 수 있습니다.</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>개인정보 침해신고센터 (국번없이) 118, privacy.kisa.or.kr</li>
            <li>개인정보 분쟁조정위원회 1833-6972, www.kopico.go.kr</li>
            <li>대검찰청 사이버수사과 1301, www.spo.go.kr</li>
            <li>경찰청 사이버수사국 182, ecrm.cyber.go.kr</li>
          </ul>
        </section>

        <section>
          <h2 className="card-title text-primary mb-3">제12조 (고지, 변경)</h2>
          <p>
            본 개인정보처리방침은 <strong>시행일자</strong>부터 적용됩니다. 내용 추가, 삭제, 수정이 있는 경우 시행 7일 전(중요한 변경은 30일
            전)부터 홈페이지 공지 등으로 사전 고지합니다.
          </p>
          <p className="mt-3 text-gray-600">
            시행일: <strong>{LEGAL_DOCS_EFFECTIVE_DATE_KO}</strong> (이용약관 시행일과 맞추는 것을 권장합니다.)
          </p>
        </section>

        <section className="pt-4 border-t border-gray-200 text-gray-600 text-xs leading-relaxed">
          <p className="font-semibold text-gray-800 mb-1">사업자 정보</p>
          <p>
            {C.name} | 대표이사 {C.ceo} | 사업자등록번호 {C.bizNo}
          </p>
          <p>본사, 연구소: {C.addressMain}</p>
          <p>영업 사무소: {C.addressOffice}</p>
        </section>
      </article>
    </SiteSubPage>
  )
}
