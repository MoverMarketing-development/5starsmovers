import Link from "next/link";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { getPostById } from "@/lib/posts";
import { createClient } from "@/lib/supabase/server";

type Props = { params: Promise<{ id: string }> };

async function updatePost(id: string, data: FormData): Promise<{ error?: string }> {
  "use server";

  const supabase = await createClient();

  const tags = (data.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const status = data.get("status") as string;

  const { error } = await supabase
    .from("posts")
    .update({
      title: data.get("title"),
      slug: data.get("slug"),
      description: data.get("description") || null,
      content: data.get("content"),
      image_url: data.get("image_url") || null,
      tags,
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };
  return {};
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  const boundAction = updatePost.bind(null, id);

  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/posts"
          className="text-white/30 hover:text-white transition-colors text-sm"
        >
          ← Posts
        </Link>
        <span className="text-white/20">/</span>
        <h1 className="font-display text-2xl font-extrabold text-white line-clamp-1">
          {post.title}
        </h1>
      </div>

      <PostForm post={post} action={boundAction} />
    </div>
  );
}
