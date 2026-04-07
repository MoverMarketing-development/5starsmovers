import { createClient } from "@/lib/supabase/server";
import RobotsEditor from "./RobotsEditor";

export const dynamic = "force-dynamic";

const DEFAULT_ROBOTS = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/admin/

Sitemap: https://www.5starmoversmn.com/sitemap.xml`;

export default async function RobotsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("robots_settings")
    .select("content")
    .single();

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-extrabold text-white">Robots.txt</h1>
        <p className="mt-1 text-sm text-white/40">
          Controls which pages search engine crawlers can access.
        </p>
      </div>

      <div className="mb-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm text-white/50 space-y-1.5">
        <p><span className="text-white/70 font-semibold">Allow: /</span> — crawlers can access everything</p>
        <p><span className="text-white/70 font-semibold">Disallow: /admin/</span> — block admin from Google index</p>
        <p><span className="text-white/70 font-semibold">Sitemap:</span> — tells Google where your sitemap is</p>
      </div>

      <RobotsEditor defaultContent={data?.content ?? DEFAULT_ROBOTS} />

      <p className="mt-4 text-xs text-white/25">
        Changes are live immediately at{" "}
        <span className="font-mono text-white/40">https://www.5starmoversmn.com/robots.txt</span>
      </p>
    </div>
  );
}
