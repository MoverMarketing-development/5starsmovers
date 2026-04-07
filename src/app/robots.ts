import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  // Always block admin routes regardless of custom config
  const baseRules: MetadataRoute.Robots = {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
    ],
    sitemap: "https://www.5starmoversmn.com/sitemap.xml",
  };

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("robots_settings")
      .select("content")
      .single();

    if (!data?.content) return baseRules;

    // Parse the raw robots.txt text into Next.js Robots format
    const lines = data.content.split("\n").map((l: string) => l.trim());
    const rules: { userAgent: string; allow: string[]; disallow: string[] }[] = [];
    let current: { userAgent: string; allow: string[]; disallow: string[] } | null = null;
    let sitemap = "https://www.5starmoversmn.com/sitemap.xml";

    for (const line of lines) {
      if (line.startsWith("User-agent:")) {
        if (current) rules.push(current);
        current = { userAgent: line.replace("User-agent:", "").trim(), allow: [], disallow: [] };
      } else if (line.startsWith("Allow:") && current) {
        current.allow.push(line.replace("Allow:", "").trim());
      } else if (line.startsWith("Disallow:") && current) {
        const val = line.replace("Disallow:", "").trim();
        if (val) current.disallow.push(val);
      } else if (line.startsWith("Sitemap:")) {
        sitemap = line.replace("Sitemap:", "").trim();
      }
    }
    if (current) rules.push(current);

    // Always ensure /admin/ is disallowed
    for (const rule of rules) {
      if (!rule.disallow.includes("/admin/")) rule.disallow.push("/admin/");
      if (!rule.disallow.includes("/api/admin/")) rule.disallow.push("/api/admin/");
    }

    return {
      rules: rules.length > 0 ? rules : baseRules.rules,
      sitemap,
    };
  } catch {
    return baseRules;
  }
}
