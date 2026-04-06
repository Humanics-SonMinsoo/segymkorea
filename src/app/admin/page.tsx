import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_NAME, verifyAdminSession } from '@/lib/admin-auth'
import AdminLeadsClient from './AdminLeadsClient'

export default function AdminPage() {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!verifyAdminSession(token)) {
    redirect('/admin/login')
  }
  return <AdminLeadsClient />
}
