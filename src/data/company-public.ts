/**
 * 푸터, 개인정보처리방침, 이용약관 등에 노출되는 사업자 정보.
 * 수정 시 이 파일만 맞추면 표시가 일치합니다.
 */
export const COMPANY_PUBLIC = {
  name: '주식회사 휴머닉스',
  ceo: '최정수',
  bizNo: '839-87-02862',
  addressMain: '경상북도 경산시 대학로 280, 영남대학교 창업보육센터 205호',
  addressOffice: '경기도 광명시 일직로 43, GIDC B동 2412호',
  phone: '02-897-5250',
  email: 'humanics@humanics.kr',
} as const

/**
 * 개인정보 보호책임자 (방침 제10조).
 * 실제 성명, 직책, 연락처를 정하면 아래에 채우고, `null`이면 방침에 일반 연락처 안내만 둡니다.
 */
export const PRIVACY_DPO: {
  name: string
  title: string
  phone?: string
  email?: string
} | null = null

/** 이용약관 및 개인정보처리방침 시행일 문구. 실제 게시일에 맞게 수정하세요. */
export const LEGAL_DOCS_EFFECTIVE_DATE_KO = '2026년 2월 1일'

/**
 * 문의 등 개인정보 내부 보관 기간을 방침 제3조에 넣을 때 사용.
 * 예: '문의 목적 달성 후 3년 보관 후 파기'
 * `null`이면 ‘내부에서 확정 후 기재’ 안내만 표시합니다.
 */
export const PRIVACY_RETENTION_PERIOD_KO: string | null = null
