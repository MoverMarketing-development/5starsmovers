import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import RemoteCityImage from "@/components/RemoteCityImage";
import TrustBanner from "@/components/TrustBanner";
import { areaGroups } from "@/lib/area-pages";
import { getSeoSettings, buildMetadata } from "@/lib/seo";

const trustCards = [
  {
    number: "01",
    title: "Minneapolis Based",
    description:
      "Local crews with real Twin Cities knowledge, faster planning, and cleaner execution from the first call.",
  },
  {
    number: "02",
    title: "Upfront Pricing",
    description:
      "Transparent quotes, no hidden fees, and a scope-first approach that keeps every move predictable.",
  },
  {
    number: "03",
    title: "Friendly Team",
    description:
      "Experienced movers who combine careful handling with clear communication and calm service on moving day.",
  },
];

function Icon({ name, className }: { name: "star" | "arrow" | "phone"; className?: string }) {
  const shared = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.8, viewBox: "0 0 24 24" };

  switch (name) {
    case "star":
      return <svg {...shared}><path d="m12 3 2.7 5.47 6.04.88-4.37 4.26 1.03 6.02L12 16.77 6.6 19.63l1.03-6.02L3.26 9.35l6.04-.88L12 3Z" /></svg>;
    case "arrow":
      return <svg {...shared}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case "phone":
      return <svg {...shared}><path d="M5 4h4l1 4-2 2a16 16 0 0 0 6 6l2-2 4 1v4c0 1-1 2-2 2C10.82 21 3 13.18 3 6c0-1 1-2 2-2Z" /></svg>;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("/areas");
  return buildMetadata({
    fallbackTitle: "Areas We Serve | 5 Star Movers Minnesota",
    fallbackDescription: "Explore the Twin Cities areas served by 5 Star Movers, including Minneapolis, St. Paul, Bloomington, Edina, Woodbury, and more.",
    pagePath: "/areas",
    seo,
  });
}

export default function AreasPage() {
  return (
    <main className="bg-background text-white">
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-[#00685e]/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#ffdc00]/10 blur-3xl" />
          <div className="grid-dot-pattern absolute inset-0 opacity-60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="text-center lg:text-left">
              <p className="mb-5 flex items-center justify-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00] lg:justify-start">
                <span className="accent-line hidden h-px w-12 sm:block" />
                Twin Cities Service Area
              </p>
              <h1 className="font-display text-4xl font-extrabold leading-[0.95] text-white sm:text-5xl lg:text-6xl">
                Areas We Serve
                <span className="mt-2 block text-[#ffdc00]">Built For A Smoother Move</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.6] text-white/[0.68] lg:mx-0 lg:text-lg">
                Explore the Minneapolis and Twin Cities communities we serve with dedicated moving
                pages, local route expertise, and real neighborhood familiarity across the metro.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:mt-10 lg:justify-start">
                <Link
                  href="#areas-grid"
                  className="cta-sheen inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[#121417]"
                >
                  Explore All Areas
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <a
                  href="tel:6514619202"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-display font-bold uppercase tracking-[0.18em] text-white hover:border-[#ffdc00]/40 hover:text-[#ffdc00]"
                >
                  <Icon name="phone" className="h-4 w-4 text-[#ffdc00]" />
                  (651) 461-9202
                </a>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-white/5 pt-6 lg:mt-10 lg:justify-start">
                {["20 local area pages", "Real city coverage", "Fast quote support"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[11px] font-display font-bold uppercase tracking-[0.24em] text-white/[0.72]">
                    <Icon name="star" className="h-3.5 w-3.5 text-[#ffdc00]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel ambient-shadow rounded-[2rem] border border-white/10 p-6 text-center lg:p-7 lg:text-left">
              <p className="font-label text-[11px] font-bold uppercase tracking-[0.3em] text-[#ffdc00]">
                Quick Quote Start
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1] text-white">
                Start with your route
              </h2>
              <p className="mt-4 text-base leading-[1.6] text-white/58">
                Enter where you are moving from and where you are headed in the Twin Cities. We will
                carry both addresses into the full quote form automatically.
              </p>

              <form action="/quote" method="get" className="mt-6 grid gap-4">
                <label className="block">
                  <span className="font-label text-[11px] font-bold uppercase tracking-[0.24em] text-white/58">
                    Moving From
                  </span>
                  <input
                    type="text"
                    name="fromAddress"
                    required
                    placeholder="Current pickup address"
                    className="mt-3 w-full rounded-[1.1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-base text-white placeholder:text-white/28 outline-none transition-all duration-300 focus:border-[#ffdc00]/55 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(255,220,0,0.08)]"
                  />
                </label>

                <label className="block">
                  <span className="font-label text-[11px] font-bold uppercase tracking-[0.24em] text-white/58">
                    Moving To
                  </span>
                  <input
                    type="text"
                    name="toAddress"
                    required
                    placeholder="Destination in Minneapolis or nearby"
                    className="mt-3 w-full rounded-[1.1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-base text-white placeholder:text-white/28 outline-none transition-all duration-300 focus:border-[#ffdc00]/55 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(255,220,0,0.08)]"
                  />
                </label>

                <button
                  type="submit"
                  className="cta-sheen mt-2 inline-flex h-[58px] items-center justify-center rounded-full px-7 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[#121417]"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <TrustBanner />

      <section id="areas-grid" className="border-b border-white/5 bg-[#111417] py-16 text-white md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 flex flex-col justify-between gap-8 text-center md:mb-12 md:flex-row md:items-end md:text-left lg:mb-16">
            <div className="mx-auto max-w-3xl md:mx-0">
              <p className="mb-3 flex items-center justify-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00] md:justify-start">
                <span className="hidden h-px w-12 bg-[#ffdc00] sm:block" />
                City Coverage
              </p>
              <h2 className="font-display text-4xl font-extrabold leading-[1.02] md:text-5xl">
                Browse Every Twin Cities Area We Serve
              </h2>
            </div>
          </div>

          <div className="space-y-10 md:space-y-12 lg:space-y-14">
            {areaGroups.map((group) => (
              <div key={group.title}>
                <div className="mb-7 flex flex-col gap-2 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
                  <div>
                    <h3 className="font-display text-2xl font-extrabold">{group.title}</h3>
                    <p className="mt-2 text-base leading-[1.6] text-white/[0.62]">{group.description}</p>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffdc00]">
                    {group.items.length} areas
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((area) => (
                    <article
                      key={area.slug}
                      className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.04] shadow-[0_24px_60px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
                    >
                      <Link href={`/areas/${area.slug}`} className="block">
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#d7ddd9]">
                          <RemoteCityImage
                            src={area.cityImageUrl}
                            fallbackSrc="/service-images/residential-1.jpeg"
                            alt={area.cityImageAlt}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent" />
                          <div className="absolute left-5 top-5 rounded-full bg-white/88 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#121417]">
                            {area.state}
                          </div>
                          <div className="absolute bottom-5 left-5 right-5">
                            <p className="font-display text-2xl font-extrabold text-white">{area.city}</p>
                          </div>
                        </div>

                        <div className="p-6">
                          <p
                            className="text-base leading-[1.65] text-white/[0.68]"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 4,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {area.heroDescription}
                          </p>
                          <div className="mt-5 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffdc00]">
                              View local page
                            </span>
                            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#121417] text-[#ffdc00] transition-colors group-hover:bg-[#ffdc00] group-hover:text-[#121417]">
                              <Icon name="arrow" className="h-4 w-4" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid-dot-pattern relative overflow-hidden bg-[#1a1d21] py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 flex flex-col justify-between gap-8 text-center md:mb-12 md:flex-row md:items-end md:text-left lg:mb-16">
            <div className="mx-auto max-w-2xl md:mx-0">
              <p className="mb-3 flex items-center justify-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00] md:justify-start">
                <span className="accent-line hidden h-px w-12 sm:block" />
                The Anchor Difference
              </p>
              <h2 className="font-display text-4xl font-extrabold leading-[1] text-white md:text-5xl">
                Why Leading Families Choose <span className="text-[#ffdc00]">5-Star Movers</span>
              </h2>
            </div>
            <p className="hidden max-w-xs border-l border-[#ffdc00]/20 pl-6 text-sm leading-[1.5] text-white/[0.55] md:block">
              Architectural precision in every transition. We do not just move objects; we secure your next chapter.
            </p>
          </div>

          <div className="grid gap-6 text-center md:grid-cols-3 md:text-left">
            {trustCards.map((card) => (
              <article
                key={card.number}
                className="group relative overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm"
              >
                <span className="absolute -right-4 -top-6 font-display text-8xl font-black italic text-white/5 transition-colors duration-300 group-hover:text-[#ffdc00]/12">
                  {card.number}
                </span>
                <div className="relative z-10">
                  <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#121417] text-[#ffdc00] transition-colors group-hover:bg-[#ffdc00] group-hover:text-[#121417] md:mx-0">
                    <Icon name="star" className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl font-extrabold text-white">{card.title}</h3>
                  <p className="mt-4 text-base leading-[1.6] text-white/[0.58]">{card.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#ffdc00] transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
