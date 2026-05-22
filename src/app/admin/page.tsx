import nextDynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_NAME, verifyAdminSession } from '@/lib/admin-auth'

/** 어드민은 브라우저에서만 마운트 — RSC/SSR 경로에서의 예외, 청크 이슈 완화 */
const AdminLeadsClient = nextDynamic(() => import('./AdminLeadsClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-4 text-slate-500">
      <div
        className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin"
        aria-hidden
      />
      <p className="text-sm font-medium">관리자 화면을 불러오는 중입니다…</p>
    </div>
  ),
})

export const dynamic = 'force-dynamic'

export default function AdminPage() {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!verifyAdminSession(token)) {
    redirect('/admin/login')
  }
  return <AdminLeadsClient />
}
