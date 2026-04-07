"use server";

import { createClient } from "@/lib/supabase/server";

export async function saveSeoSettings(
  pagePath: string,
  data: FormData
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.from("seo_settings").upsert(
    {
      page_path: pagePath,
      meta_title: data.get("meta_title") || null,
      meta_description: data.get("meta_description") || null,
      og_title: data.get("og_title") || null,
      og_description: data.get("og_description") || null,
      og_image: data.get("og_image") || null,
      canonical_url: data.get("canonical_url") || null,
      noindex: data.get("noindex") === "true",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "page_path" }
  );

  if (error) return { error: error.message };
  return {};
}
