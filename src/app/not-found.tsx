import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-2 ko-modal-copy">페이지를 찾을 수 없습니다</h1>
      <p className="text-gray-600 mb-8">요청하신 주소가 없거나 이동되었을 수 있습니다.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
