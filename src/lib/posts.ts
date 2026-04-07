import { createClient } from "@/lib/supabase/server";
import { getBlogPosts, getBlogPost } from "@/lib/rss";

export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string;
  tags: string[];
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author?: string | null;
  meta_title?: string | null;
}

/** Map an RSS BlogPost to our Post shape so pages work with both sources */
function rssToPost(p: Awaited<ReturnType<typeof getBlogPosts>>[number]): Post {
  return {
    id: p.slug,
    title: p.title,
    slug: p.slug,
    description: p.description,
    content: p.content,
    image_url: p.image,
    tags: p.tags,
    status: "published",
    published_at: p.pubDate || null,
    created_at: p.pubDate || new Date().toISOString(),
    updated_at: p.pubDate || new Date().toISOString(),
  };
}

export async function getPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) return [];
  return data;
}

export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  // Always fetch RSS posts and merge so they are never lost
  let rssPosts: Post[] = [];
  try {
    const rss = await getBlogPosts();
    rssPosts = rss.map(rssToPost);
  } catch {
    // RSS unavailable — continue with Supabase only
  }

  if (error || !data || data.length === 0) {
    return rssPosts;
  }

  // Supabase posts take priority; append RSS posts whose slug isn't already in Supabase
  const supabaseSlugs = new Set(data.map((p) => p.slug));
  const rssOnly = rssPosts.filter((p) => !supabaseSlugs.has(p.slug));
  return [...data, ...rssOnly];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  // Fall back to RSS if not found in Supabase
  if (error || !data) {
    const rssPost = await getBlogPost(slug);
    return rssPost ? rssToPost(rssPost) : null;
  }
  return data;
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export function formatDate(dateString: string): string {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
