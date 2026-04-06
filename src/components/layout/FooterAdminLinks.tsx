'use client'

import Link from 'next/link'

export function FooterAdminLinks() {
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' })
    } catch {
      /* ignore */
    }
    window.location.href = '/'
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-x-2 text-xs text-gray-500">
      <Link href="/admin/login" className="hover:text-gray-300 transition-colors uppercase tracking-wide">
        Admin
      </Link>
      <span className="text-gray-600" aria-hidden>
        |
      </span>
      <button
        type="button"
        onClick={handleLogout}
        className="hover:text-gray-300 transition-colors uppercase tracking-wide"
      >
        Logout
      </button>
    </div>
  )
}
