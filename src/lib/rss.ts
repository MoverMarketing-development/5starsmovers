import { XMLParser } from "fast-xml-parser";

const RSS_URL = "https://www.5starmoversmn.com/feed/rss2";
const RSS_TIMEOUT_MS = 5000;

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

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), RSS_TIMEOUT_MS);

  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });

    if (!res.ok) return [];

    const xml = await res.text();
    const parserOptions: ConstructorParameters<typeof XMLParser>[0] = {
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      isArray: (name: string) => name === "item" || name === "media:content",
      // Stop parsing inside content:encoded because it contains raw HTML.
      stopNodes: ["*.content:encoded", "*.description"],
      processEntities: {
        enabled: true,
        maxTotalExpansions: 10000,
        maxEntitySize: 10000,
        maxExpansionDepth: 10,
        maxExpandedLength: 500000,
        maxEntityCount: 1000,
      },
    };
    const parser = new XMLParser(parserOptions);
    const result = parser.parse(xml);
    const items: Record<string, unknown>[] = result?.rss?.channel?.item ?? [];

    return items.map((item) => {
      const enclosure = item["enclosure"];
      const mediaItems: unknown[] = Array.isArray(item["media:content"]) ? item["media:content"] : [];
      const firstMedia = mediaItems[0];
      const enclosureUrl =
        typeof enclosure === "object" &&
        enclosure !== null &&
        "@_url" in enclosure &&
        typeof enclosure["@_url"] === "string"
          ? enclosure["@_url"]
          : "";
      const firstMediaUrl =
        typeof firstMedia === "object" &&
        firstMedia !== null &&
        "@_url" in firstMedia &&
        typeof firstMedia["@_url"] === "string"
          ? firstMedia["@_url"]
          : "";
      const image = enclosureUrl || firstMediaUrl;

      const rawTagsVal = item["g-custom:tags"];
      const rawTags = typeof rawTagsVal === "string" ? rawTagsVal : "";
      const tags = rawTags
        ? rawTags.split(",").map((tag: string) => tag.trim()).filter(Boolean)
        : [];

      const strVal = (value: unknown) =>
        value == null || typeof value === "object" ? "" : String(value);

      return {
        title: strVal(item.title),
        slug: slugFromUrl(strVal(item.link) || strVal(item.guid)),
        link: strVal(item.link),
        description: strVal(item.description),
        content: decodeHtmlEntities(strVal(item["content:encoded"])),
        image,
        pubDate: strVal(item.pubDate),
        tags,
      };
    });
  } catch {
    return [];
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export function formatDate(pubDate: string): string {
  const d = new Date(pubDate);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
