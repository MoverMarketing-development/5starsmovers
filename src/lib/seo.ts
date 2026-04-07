import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export interface SeoRow {
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  noindex: boolean;
}

const BASE_URL = "https://www.5starmoversmn.com";

/** Fetch SEO settings for a given page path from Supabase. Returns null if not found. */
export async function getSeoSettings(pagePath: string): Promise<SeoRow | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("seo_settings")
      .select("meta_title,meta_description,og_title,og_description,og_image,canonical_url,noindex")
      .eq("page_path", pagePath)
      .single();
    return data ?? null;
  } catch {
    return null;
  }
}

/**
 * Build a Next.js Metadata object, merging Supabase overrides with hardcoded fallbacks.
 * Any field set in the admin takes priority.
 */
export function buildMetadata({
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
  pagePath,
  seo,
}: {
  fallbackTitle: string;
  fallbackDescription?: string;
  fallbackImage?: string;
  pagePath: string;
  seo: SeoRow | null;
}): Metadata {
  const title = seo?.meta_title || fallbackTitle;
  const description = seo?.meta_description || fallbackDescription || "";
  const ogTitle = seo?.og_title || title;
  const ogDescription = seo?.og_description || description;
  const ogImage = seo?.og_image || fallbackImage;
  const canonical = seo?.canonical_url || `${BASE_URL}${pagePath}`;
  const noindex = seo?.noindex ?? false;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: "5 Star Movers Minnesota",
      locale: "en_US",
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
