import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getBlogPosts } from "@/lib/rss";

export async function POST() {
  const supabase = await createClient();

  // Verify the caller is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await getBlogPosts();

  if (posts.length === 0) {
    return NextResponse.json({ message: "No posts found in RSS feed." });
  }

  const rows = posts.map((p) => ({
    title: p.title,
    slug: p.slug,
    description: p.description || null,
    content: p.content,
    image_url: p.image || null,
    tags: p.tags,
    status: "published" as const,
    published_at: p.pubDate ? new Date(p.pubDate).toISOString() : new Date().toISOString(),
  }));

  // Upsert by slug — won't overwrite posts that were already edited
  const { error, count } = await supabase
    .from("posts")
    .upsert(rows, { onConflict: "slug", ignoreDuplicates: true })
    .select("id");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    message: `Imported ${count ?? rows.length} posts from RSS.`,
  });
}
