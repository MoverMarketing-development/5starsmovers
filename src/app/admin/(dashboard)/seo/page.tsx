import { createClient } from "@/lib/supabase/server";
import SeoForm from "./SeoForm";

export const dynamic = "force-dynamic";

const PAGE_GROUPS = [
  {
    label: "Main Pages",
    pages: [
      { path: "/", label: "Home" },
      { path: "/about-us", label: "About Us" },
      { path: "/contact-us", label: "Contact Us" },
      { path: "/quote", label: "Get a Quote" },
      { path: "/faqs", label: "FAQs" },
      { path: "/careers", label: "Careers" },
      { path: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
  {
    label: "Blog",
    pages: [
      { path: "/blog", label: "Blog Index" },
    ],
  },
  {
    label: "Moving Services",
    pages: [
      { path: "/services", label: "Services (index)" },
      { path: "/services/residential-moving", label: "Residential Moving" },
      { path: "/services/long-distance-moving", label: "Long Distance Moving" },
      { path: "/services/commercial-moving", label: "Commercial Moving" },
      { path: "/services/loading-unloading", label: "Loading & Unloading" },
      { path: "/services/senior-moving", label: "Senior Moving" },
      { path: "/services/packing-services", label: "Packing Services" },
      { path: "/services/apartment-moving", label: "Apartment Moving" },
      { path: "/services/moving-supplies", label: "Moving Supplies" },
      { path: "/services/storage", label: "Storage" },
      { path: "/services/white-glove-moving", label: "White Glove Moving" },
      { path: "/services/specialty-moving", label: "Specialty Moving" },
      { path: "/services/junk-removal", label: "Junk Removal" },
    ],
  },
  {
    label: "Areas We Serve",
    pages: [
      { path: "/areas", label: "Areas (index)" },
      { path: "/areas/minneapolis", label: "Minneapolis" },
      { path: "/areas/st-paul", label: "St. Paul" },
      { path: "/areas/bloomington", label: "Bloomington" },
      { path: "/areas/eden-prairie", label: "Eden Prairie" },
      { path: "/areas/minnetonka", label: "Minnetonka" },
      { path: "/areas/edina", label: "Edina" },
      { path: "/areas/plymouth", label: "Plymouth" },
      { path: "/areas/maple-grove", label: "Maple Grove" },
      { path: "/areas/brooklyn-park", label: "Brooklyn Park" },
      { path: "/areas/eagan", label: "Eagan" },
      { path: "/areas/burnsville", label: "Burnsville" },
      { path: "/areas/apple-valley", label: "Apple Valley" },
      { path: "/areas/lakeville", label: "Lakeville" },
      { path: "/areas/woodbury", label: "Woodbury" },
      { path: "/areas/coon-rapids", label: "Coon Rapids" },
      { path: "/areas/blaine", label: "Blaine" },
      { path: "/areas/shakopee", label: "Shakopee" },
      { path: "/areas/chaska", label: "Chaska" },
      { path: "/areas/chanhassen", label: "Chanhassen" },
      { path: "/areas/savage", label: "Savage" },
    ],
  },
];

export default async function SeoPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase.from("seo_settings").select("*");

  const seoMap: Record<string, { meta_title: string; meta_description: string; og_title: string; og_description: string; og_image: string; canonical_url: string; noindex: boolean }> = {};
  for (const row of rows ?? []) {
    seoMap[row.page_path] = row;
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-extrabold text-white">SEO Settings</h1>
        <p className="mt-1 text-sm text-white/40">
          Meta titles, descriptions, and OG images for each page.
        </p>
      </div>

      <div className="space-y-10">
        {PAGE_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#ffdc00]">
              {group.label}
            </p>
            <div className="space-y-2">
              {group.pages.map((page) => (
                <SeoForm
                  key={page.path}
                  pagePath={page.path}
                  pageLabel={page.label}
                  defaultValues={seoMap[page.path] ?? null}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
