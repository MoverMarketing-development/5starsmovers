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

function hasSupabaseEnv(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getPosts(): Promise<Post[]> {
  if (!hasSupabaseEnv()) return [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return [];
    return data;
  } catch {
    return [];
  }
}

export async function getPublishedPosts(): Promise<Post[]> {
  // Run Supabase + RSS in parallel; RSS has a 5s timeout so it never hangs
  const rssWithTimeout = Promise.race([
    getBlogPosts(),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("RSS timeout")), 5000)
    ),
  ]);

  const [supabaseResult, rssResult] = await Promise.allSettled([
    (async () => {
      const supabase = await createClient();
      return supabase
        .from("posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });
    })(),
    rssWithTimeout,
  ]);

  const supabaseData =
    supabaseResult.status === "fulfilled" && !supabaseResult.value.error
      ? (supabaseResult.value.data as Post[])
      : [];

  const rssPosts: Post[] =
    rssResult.status === "fulfilled"
      ? (rssResult.value as Awaited<ReturnType<typeof getBlogPosts>>).map(rssToPost)
      : [];

  // Supabase published posts take priority; append RSS posts not already in Supabase
  const supabaseSlugs = new Set(supabaseData.map((p) => p.slug));
  const rssOnly = rssPosts.filter((p) => !supabaseSlugs.has(p.slug));
  return [...supabaseData, ...rssOnly];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (hasSupabaseEnv()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (!error && data) {
        return data;
      }
    } catch {
      // RSS is the fallback source when Supabase is unavailable in local/dev.
    }
  }

  const rssPost = await getBlogPost(slug);
  return rssPost ? rssToPost(rssPost) : null;
}

export async function getPostById(id: string): Promise<Post | null> {
  if (!hasSupabaseEnv()) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export function formatDate(dateString: string): string {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
