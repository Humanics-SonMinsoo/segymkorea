'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  BLOG_CATEGORIES,
  BLOG_NAVER_URL,
  BLOG_POSTS,
  blogCategoryLabel,
  isExternalPost,
  type BlogCategoryId,
  type BlogPost,
} from '@/data/blog-posts'

type TabId = 'all' | BlogCategoryId

function PostLink({
  post,
  className,
  children,
}: {
  post: BlogPost
  className: string
  children: React.ReactNode
}) {
  if (isExternalPost(post)) {
    return (
      <a href={post.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={post.href} className={className}>
      {children}
    </Link>
  )
}

function NewBadge({ large }: { large?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-red-500 font-bold uppercase tracking-wide text-white ${
        large ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[10px]'
      }`}
    >
      NEW
    </span>
  )
}

function PostFootnote({ post }: { post: BlogPost }) {
  return (
    <p className="text-xs sm:text-[13px] text-gray-400">
      {post.dateLabel}
      {post.author ? <> · {post.author}</> : null}
    </p>
  )
}

/** 홈 탭 상단 대형 아티클 — 이미지 좌측, 제목·요약 우측 */
function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <PostLink post={post} className="group block">
      <div className="relative aspect-[16/9] sm:aspect-[21/10] overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={post.thumbnail}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          style={post.thumbnailObjectPosition ? { objectPosition: post.thumbnailObjectPosition } : undefined}
        />
        <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm">
          {blogCategoryLabel(post.categoryId)}
        </span>
        {post.isNew ? (
          <span className="absolute left-4 top-4">
            <NewBadge large />
          </span>
        ) : null}
      </div>

      <div className="mt-5 max-w-3xl">
        <h3 className="text-lg sm:text-xl lg:text-[1.35rem] font-bold leading-snug text-gray-900 ko-modal-copy line-clamp-2 transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        {post.teaser ? (
          <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-gray-600 ko-modal-copy">
            {post.teaser}
          </p>
        ) : null}

        <div className="mt-3">
          <PostFootnote post={post} />
        </div>
      </div>
    </PostLink>
  )
}

/** 일반 카드 — 썸네일 위, 제목·요약·날짜 아래 */
function PostCard({ post }: { post: BlogPost }) {
  return (
    <PostLink post={post} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-gray-100">
        <img
          src={post.thumbnail}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          style={post.thumbnailObjectPosition ? { objectPosition: post.thumbnailObjectPosition } : undefined}
          loading="lazy"
        />
        {post.isNew ? (
          <span className="absolute left-3 top-3">
            <NewBadge />
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 text-base sm:text-[17px] font-bold leading-snug text-gray-900 ko-modal-copy line-clamp-2 transition-colors group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-500 ko-modal-copy line-clamp-2">{post.excerpt}</p>
      <div className="mt-2">
        <PostFootnote post={post} />
      </div>
    </PostLink>
  )
}

function sidebarItemClass(active: boolean) {
  const base =
    'w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ko-modal-copy'
  if (active) return `${base} bg-primary-muted text-primary font-semibold`
  return `${base} text-gray-600 hover:bg-gray-50 hover:text-gray-900`
}

function chipClass(active: boolean) {
  const base =
    'shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ko-modal-copy'
  if (active) return `${base} border-primary bg-primary text-white`
  return `${base} border-gray-200 bg-white text-gray-700 hover:bg-gray-50`
}

export function BlogGallery() {
  const [tab, setTab] = useState<TabId>('all')

  const tabs: { id: TabId; label: string }[] = useMemo(
    () => [{ id: 'all' as const, label: '홈' }, ...BLOG_CATEGORIES.map((c) => ({ id: c.id, label: c.label }))],
    [],
  )

  const { featured, rest } = useMemo(() => {
    if (tab === 'all') {
      const featured = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0] ?? null
      return { featured, rest: BLOG_POSTS.filter((p) => p !== featured) }
    }
    return { featured: null, rest: BLOG_POSTS.filter((p) => p.categoryId === tab) }
  }, [tab])

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
      {/* 사이드바 — 모바일에서는 가로 칩 */}
      <aside className="shrink-0 lg:w-52">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 lg:hidden scrollbar-hide" role="tablist" aria-label="블로그 카테고리">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={chipClass(tab === t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <nav className="hidden lg:block lg:sticky lg:top-24" aria-label="블로그 카테고리">
          <ul className="space-y-1">
            {tabs.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  aria-current={tab === t.id ? 'page' : undefined}
                  onClick={() => setTab(t.id)}
                  className={sidebarItemClass(tab === t.id)}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="my-4 border-t border-gray-100" />

          <a
            href={BLOG_NAVER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50"
          >
            세짐 공식 블로그
            <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H18m0 0v4.5M18 6l-7.5 7.5M18 13.5V18a1.5 1.5 0 01-1.5 1.5h-10A1.5 1.5 0 015 18V8a1.5 1.5 0 011.5-1.5H11"
              />
            </svg>
          </a>
        </nav>
      </aside>

      {/* 본문 */}
      <div className="min-w-0 flex-1">
        <h2 className="mb-5 text-lg sm:text-xl font-bold text-gray-900 ko-modal-copy">
          {tab === 'all' ? '최근 아티클' : blogCategoryLabel(tab)}
        </h2>

        {featured ? (
          <div className="mb-10 sm:mb-12">
            <FeaturedPost post={featured} />
          </div>
        ) : null}

        {rest.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-7 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
            {rest.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : !featured ? (
          <p className="rounded-xl bg-gray-50 px-5 py-10 text-center text-sm text-gray-500 ko-modal-copy">
            아직 등록된 글이 없습니다. 곧 새로운 콘텐츠로 찾아뵐게요.
          </p>
        ) : null}
      </div>
    </div>
  )
}
