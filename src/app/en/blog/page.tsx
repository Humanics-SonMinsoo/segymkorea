import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_NAVER_URL, BLOG_POSTS, isExternalPost } from '@/data/blog-posts'

export const metadata: Metadata = {
  title: 'SEGYM Blog | Humanics',
  description: 'Stories, reviews, and news from SEGYM and Humanics — operator interviews and product updates.',
}

const CATEGORY_EN: Record<string, string> = {
  review: 'Customer stories',
  news: 'SEGYM news',
  insight: 'Operations insight',
}

export default function EnBlogPage() {
  return (
    <main className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Blog</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Stories from the floor
        </h1>
        <p className="mt-5 text-lg text-gray-600 max-w-2xl leading-relaxed">
          Operator interviews and SEGYM updates. Some articles open on our Korean Naver blog.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => {
            const external = isExternalPost(post)
            const href = post.href.startsWith('/segym-day') ? '/en' : post.href
            const Card = (
              <article className="h-full rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt=""
                    className="h-full w-full object-cover"
                    style={
                      post.thumbnailObjectPosition
                        ? { objectPosition: post.thumbnailObjectPosition }
                        : undefined
                    }
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="font-semibold text-primary">
                      {CATEGORY_EN[post.categoryId] ?? post.categoryId}
                    </span>
                    {post.isNew ? (
                      <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        NEW
                      </span>
                    ) : null}
                  </div>
                  {post.subjectLabel ? (
                    <p className="text-xs font-medium text-gray-500 mb-1">{post.subjectLabel}</p>
                  ) : null}
                  <h2 className="font-bold text-gray-900 leading-snug line-clamp-3">{post.title}</h2>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3 flex-1">{post.excerpt}</p>
                  <p className="mt-3 text-xs text-gray-400">{post.dateLabel}</p>
                </div>
              </article>
            )

            return external ? (
              <a key={post.id} href={post.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                {Card}
              </a>
            ) : (
              <Link key={post.id} href={href} className="block h-full">
                {Card}
              </Link>
            )
          })}
        </div>

        <p className="mt-10 text-sm text-gray-500">
          Official Naver blog:{' '}
          <a
            href={BLOG_NAVER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium underline-offset-2 hover:underline"
          >
            blog.naver.com/humanics23
          </a>
        </p>
      </section>
    </main>
  )
}
