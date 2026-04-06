import { XMLParser } from "fast-xml-parser";

const RSS_URL = "https://www.5starmoversmn.com/feed/rss2";

export interface BlogPost {
  title: string;
  slug: string;
  link: string;
  description: string;
  content: string;
  image: string;
  pubDate: string;
  tags: string[];
}

function slugFromUrl(url: string): string {
  return url.replace(/\/$/, "").split("/").pop() ?? "";
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(RSS_URL, {
    next: { revalidate: 3600 },
  });
  const xml = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    isArray: (name: string) => name === "item" || name === "media:content",
    // Stop parsing inside content:encoded — it's raw HTML, not XML
    stopNodes: ["*.content:encoded", "*.description"],
    processEntities: {
      enabled: true,
      maxTotalExpansions: 10000,
      maxEntitySize: 10000,
      maxExpansionDepth: 10,
      maxExpandedLength: 500000,
      maxEntityCount: 1000,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  const result = parser.parse(xml);
  const items = result?.rss?.channel?.item ?? [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return items.map((item: any) => {
    // Image: prefer enclosure url, fallback to first media:content
    const enclosure = item["enclosure"];
    const mediaItems: unknown[] = Array.isArray(item["media:content"]) ? item["media:content"] : [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const image: string =
      (typeof enclosure === "object" && enclosure?.["@_url"]) ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((mediaItems[0] as any)?.["@_url"]) ||
      "";

    const rawTagsVal = item["g-custom:tags"];
    const rawTags = typeof rawTagsVal === "string" ? rawTagsVal : "";
    const tags = rawTags ? rawTags.split(",").map((t: string) => t.trim()).filter(Boolean) : [];

    const strVal = (v: unknown) => (v == null || typeof v === "object" ? "" : String(v));

    return {
      title: strVal(item.title),
      slug: slugFromUrl(strVal(item.link) || strVal(item.guid)),
      link: strVal(item.link),
      description: strVal(item.description),
      content: strVal(item["content:encoded"]),
      image,
      pubDate: strVal(item.pubDate),
      tags,
    };
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug);
}

export function formatDate(pubDate: string): string {
  const d = new Date(pubDate);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
