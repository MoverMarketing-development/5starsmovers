import Link from "next/link";
import PostForm from "@/components/admin/PostForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function createPost(data: FormData): Promise<{ error?: string }> {
  "use server";

  const supabase = await createClient();

  const tags = (data.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const status = data.get("status") as string;

  const { error } = await supabase.from("posts").insert({
    title: data.get("title"),
    slug: data.get("slug"),
    description: data.get("description") || null,
    content: data.get("content"),
    image_url: data.get("image_url") || null,
    tags,
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
    author: data.get("author") || null,
    meta_title: data.get("meta_title") || null,
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export default function NewPostPage() {
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
        <h1 className="font-display text-2xl font-extrabold text-white">New Post</h1>
      </div>

      <PostForm action={createPost} />
    </div>
  );
}
