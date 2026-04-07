import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TrustBanner from "@/components/TrustBanner";
import { getPostBySlug, getPublishedPosts, formatDate } from "@/lib/posts";
import { getSeoSettings, buildMetadata } from "@/lib/seo";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export const revalidate = 3600;
export const dynamicParams = true;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  // Only statically generate from Supabase — skip RSS at build time
  try {
    const posts = await getPublishedPosts();
    // If posts come from RSS (no id UUID pattern), skip static generation
    return posts
      .filter((p) => p.id !== p.slug) // Supabase posts have UUID ids
      .map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const seo = await getSeoSettings(`/blog/${slug}`);
  return buildMetadata({
    fallbackTitle: post.meta_title || `${post.title} | 5 Star Movers Minnesota`,
    fallbackDescription: post.description || undefined,
    fallbackImage: post.image_url || undefined,
    pagePath: `/blog/${slug}`,
    seo,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="bg-[#0f1114] min-h-screen text-white">
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        url={`https://www.5starmoversmn.com/blog/${post.slug}`}
        imageUrl={post.image_url || undefined}
        publishedAt={post.published_at ?? post.created_at}
        updatedAt={post.updated_at}
        author={post.author}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.5starmoversmn.com" },
        { name: "Blog", url: "https://www.5starmoversmn.com/blog" },
        { name: post.title, url: `https://www.5starmoversmn.com/blog/${post.slug}` },
      ]} />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#006e63]/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#ffd700]/6 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-16 md:py-20">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/70 line-clamp-1">{post.title}</span>
          </nav>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#006e63]/20 px-3 py-1 text-xs font-semibold text-[#006e63]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          {post.description && (
            <p className="mt-5 text-lg leading-relaxed text-white/60 max-w-3xl">
              {post.description}
            </p>
          )}

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffd700] text-[#343a40]">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="m12 3 2.7 5.47 6.04.88-4.37 4.26 1.03 6.02L12 16.77 6.6 19.63l1.03-6.02L3.26 9.35l6.04-.88L12 3Z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-white/70">
                {post.author || "5 Star Movers"}
              </span>
            </div>
            <span className="text-white/20">·</span>
            <span className="text-sm text-white/40">{formatDate(post.published_at ?? post.created_at)}</span>
          </div>
        </div>
      </section>

      <TrustBanner />

      {/* Cover image */}
      {post.image_url && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 -mt-1 pt-10">
          <div className="overflow-hidden rounded-2xl border border-white/8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full object-cover max-h-[480px]"
            />
          </div>
        </div>
      )}

      {/* Article content */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* CTA */}
      <section className="border-t border-white/5 bg-[#0c0f11] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#ffd700]">
            Ready to Move?
          </p>
          <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">
            Let Minnesota&apos;s 5-Star Crew{" "}
            <span className="text-[#ffd700]">Handle It.</span>
          </h2>
          <p className="mt-4 text-white/55 max-w-xl mx-auto">
            Free quote, upfront pricing, and expert movers — every time.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-full bg-[#e24436] px-8 py-4 font-bold text-white hover:bg-[#e24436]/90 transition-all hover:scale-105"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:6512431993"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 font-semibold text-white hover:border-white/40 transition-all"
            >
              <svg className="h-4 w-4 text-[#ffd700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 4h4l1 4-2 2a16 16 0 0 0 6 6l2-2 4 1v4c0 1-1 2-2 2C10.82 21 3 13.18 3 6c0-1 1-2 2-2Z" />
              </svg>
              (651) 243-1993
            </a>
          </div>
          <div className="mt-8">
            <Link href="/blog" className="text-sm text-white/40 hover:text-white transition-colors">
              ← Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
