import Link from "next/link";
import type { Metadata } from "next";
import TrustBanner from "@/components/TrustBanner";
import { getBlogPosts, formatDate } from "@/lib/rss";

export const metadata: Metadata = {
  title: "Moving Tips & Resources | 5 Star Movers Minnesota",
  description:
    "Expert moving advice, neighborhood guides, and relocation resources from Minnesota's most trusted movers.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="bg-[#0f1114] min-h-screen text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5 py-20 md:py-28">
        <div className="absolute inset-0">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#006e63]/15 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#ffd700]/8 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#ffd700]">
            5 Star Movers — Resources
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
            Moving Tips &{" "}
            <span className="text-[#ffd700]">Neighborhood</span>
            <br />
            Guides
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60">
            Expert advice, local area guides, and everything you need to plan a
            stress-free move across Minnesota.
          </p>
        </div>
      </section>

      <TrustBanner />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        {/* Featured post */}
        {featured && (
          <section className="mb-16">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-[#006e63]">
              Latest Article
            </p>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] transition-all hover:border-[#ffd700]/30 hover:bg-white/[0.05] lg:grid-cols-[1fr_0.9fr]"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
                {featured.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#006e63]/30 to-[#343a40]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f1114]/60 lg:block hidden" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <div className="mb-4 flex flex-wrap gap-2">
                  {featured.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#006e63]/20 px-3 py-1 text-xs font-semibold text-[#006e63]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-display text-2xl font-extrabold leading-tight text-white group-hover:text-[#ffd700] transition-colors md:text-3xl">
                  {featured.title}
                </h2>
                {featured.description && (
                  <p className="mt-4 text-base leading-relaxed text-white/60 line-clamp-3">
                    {featured.description}
                  </p>
                )}
                <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-5">
                  <span className="text-sm text-white/40">{formatDate(featured.pubDate)}</span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-[#ffd700]">
                    Read article
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <section>
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
              All Articles
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition-all hover:border-[#ffd700]/25 hover:bg-white/[0.05] hover:-translate-y-1"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {post.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#006e63]/20 to-[#343a40]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    {post.tags.length > 0 && (
                      <span className="mb-3 self-start rounded-full bg-[#006e63]/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#006e63]">
                        {post.tags[0]}
                      </span>
                    )}
                    <h3 className="font-display text-lg font-extrabold leading-snug text-white group-hover:text-[#ffd700] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.description && (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50 line-clamp-2">
                        {post.description}
                      </p>
                    )}
                    <div className="mt-5 flex items-center justify-between border-t border-white/6 pt-4">
                      <span className="text-xs text-white/35">{formatDate(post.pubDate)}</span>
                      <svg className="h-4 w-4 text-[#ffd700] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
