import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { formatDate } from "@/lib/posts";
import DeletePostButton from "./DeletePostButton";
import ImportRssButton from "./ImportRssButton";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white">Posts</h1>
          <p className="mt-1 text-sm text-white/40">
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ImportRssButton />
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 rounded-lg bg-[#ffdc00] px-4 py-2 text-sm font-bold text-[#111318] transition-all hover:bg-[#ffe75a]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Post
          </Link>
        </div>
      </div>

      {/* Table */}
      {posts.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-16 text-center">
          <p className="text-white/30 text-sm">No posts yet. Create your first one or import from RSS.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.02]">
                <th className="px-5 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">Title</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider hidden sm:table-cell">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-white/40 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-medium text-white line-clamp-1">{post.title}</div>
                    <div className="text-xs text-white/30 mt-0.5">/blog/{post.slug}</div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        post.status === "published"
                          ? "bg-green-500/15 text-green-400"
                          : "bg-white/8 text-white/40"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell text-white/40 text-xs">
                    {post.published_at
                      ? formatDate(post.published_at)
                      : formatDate(post.created_at)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-white/50 hover:bg-white/[0.06] hover:text-white transition-colors"
                      >
                        Edit
                      </Link>
                      <DeletePostButton id={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
