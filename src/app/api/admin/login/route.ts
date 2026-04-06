import { NextResponse } from 'next/server'
import { COOKIE_NAME, getAdminSessionToken, validateAdminCredentials } from '@/lib/admin-auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const userId = typeof body.userId === 'string' ? body.userId : ''
    const password = typeof body.password === 'string' ? body.password : ''
    if (!validateAdminCredentials(userId, password)) {
      return NextResponse.json(
        { error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      )
    }
    const token = getAdminSessionToken()
    const res = NextResponse.json({ ok: true })
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
    })
    return res
  } catch {
    return NextResponse.json({ error: '로그인 실패' }, { status: 500 })
  }
}
