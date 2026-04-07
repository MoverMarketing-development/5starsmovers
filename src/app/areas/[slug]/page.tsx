import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import MovingSuppliesSection from "@/components/MovingSuppliesSection";
import RemoteCityImage from "@/components/RemoteCityImage";
import ServiceGridSection from "@/components/ServiceGridSection";
import TrustBanner from "@/components/TrustBanner";
import { areaPageMap, areaPages } from "@/lib/area-pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function Icon({ name, className }: { name: "star" | "arrow" | "phone"; className?: string }) {
  const shared = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.8, viewBox: "0 0 24 24" };
  switch (name) {
    case "star": return <svg {...shared}><path d="m12 3 2.7 5.47 6.04.88-4.37 4.26 1.03 6.02L12 16.77 6.6 19.63l1.03-6.02L3.26 9.35l6.04-.88L12 3Z" /></svg>;
    case "arrow": return <svg {...shared}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case "phone": return <svg {...shared}><path d="M5 4h4l1 4-2 2a16 16 0 0 0 6 6l2-2 4 1v4c0 1-1 2-2 2C10.82 21 3 13.18 3 6c0-1 1-2 2-2Z" /></svg>;
  }
}

export async function generateStaticParams() {
  return areaPages.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = areaPageMap[slug];

  return area
    ? {
        title: `${area.city} Movers | 5 Star Movers Minnesota`,
        description: area.heroDescription,
      }
    : {};
}

export default async function AreaPage({ params }: PageProps) {
  const { slug } = await params;
  const area = areaPageMap[slug];

  if (!area) notFound();

  return (
    <main className="bg-background text-white">
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-[#00685e]/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#ffdc00]/10 blur-3xl" />
          <div className="grid-dot-pattern absolute inset-0 opacity-60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-5 flex items-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]"><span className="accent-line h-px w-12" />{area.heroEyebrow}</p>
              <h1 className="font-display text-4xl font-extrabold leading-[0.95] text-white sm:text-5xl lg:text-6xl">{area.heroTitle}<span className="mt-2 block text-[#ffdc00]">{area.heroAccent}</span></h1>
              <p className="mt-6 max-w-2xl text-lg leading-[1.5] text-white/[0.68]">{area.heroDescription}</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/quote" className="cta-sheen inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[#121417]">Get Free Quote<Icon name="arrow" className="h-4 w-4" /></Link>
                <a href="tel:6514619202" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-display font-bold uppercase tracking-[0.18em] text-white hover:border-[#ffdc00]/40 hover:text-[#ffdc00]"><Icon name="phone" className="h-4 w-4 text-[#ffdc00]" />(651) 461-9202</a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/5 pt-6">
                {area.heroPoints.map((item) => <div key={item} className="flex items-center gap-2 text-[11px] font-display font-bold uppercase tracking-[0.24em] text-white/[0.72]"><Icon name="star" className="h-3.5 w-3.5 text-[#ffdc00]" />{item}</div>)}
              </div>
            </div>
            <div className="glass-panel ambient-shadow rounded-[2rem] border border-white/10 p-6 lg:p-7">
              <p className="font-label text-[11px] font-bold uppercase tracking-[0.3em] text-[#ffdc00]">Quick Quote Start</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1] text-white">Request a Free Quote Now</h2>
              <p className="mt-4 text-sm leading-[1.5] text-white/58">Enter your route and we will carry both addresses into the full quote form automatically.</p>

              <form action="/quote" method="get" className="mt-6 grid gap-4">
                <label className="block">
                  <span className="font-label text-[11px] font-bold uppercase tracking-[0.24em] text-white/58">Moving From</span>
                  <input type="text" name="fromAddress" required placeholder="Current pickup address" className="mt-3 w-full rounded-[1.1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-base text-white placeholder:text-white/28 outline-none transition-all duration-300 focus:border-[#ffdc00]/55 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(255,220,0,0.08)]" />
                </label>

                <label className="block">
                  <span className="font-label text-[11px] font-bold uppercase tracking-[0.24em] text-white/58">Moving To</span>
                  <input type="text" name="toAddress" required placeholder={`Destination in ${area.city}`} className="mt-3 w-full rounded-[1.1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-base text-white placeholder:text-white/28 outline-none transition-all duration-300 focus:border-[#ffdc00]/55 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(255,220,0,0.08)]" />
                </label>

                <button type="submit" className="cta-sheen mt-2 inline-flex h-[58px] items-center justify-center rounded-full px-7 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[#121417]">
                  Get Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <TrustBanner />

      <section className="border-b border-white/5 bg-[#111417] py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-white/10 bg-[#1b1f23]">
            <RemoteCityImage src={area.cityImageUrl} fallbackSrc="/service-images/residential-1.jpeg" alt={area.cityImageAlt} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="mb-4 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">About {area.city}</p>
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] text-white md:text-5xl">{area.citySectionTitle}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-[1.5] text-white/[0.68]">{area.citySectionBody}</p>
            <a href={area.cityImageSource} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex text-sm font-semibold text-[#ffdc00] hover:text-[#ffe75a]">
              View city image source
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 bg-[#ffdc00] py-24 text-[#121417]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] md:text-5xl">{area.sectionTwoTitle}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-[1.5] text-[#121417]/78">{area.sectionTwoBody}</p>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_24px_60px_rgba(18,20,23,0.16)]">
            <Image src={area.sectionTwoImage} alt={`${area.city} moving team`} fill className="object-cover" sizes="(min-width: 1024px) 38vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 bg-[#f8f6ef] py-24 text-[#121417]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_24px_60px_rgba(18,20,23,0.12)]">
            <Image src={area.sectionThreeImage} alt={`${area.city} movers at work`} fill className="object-cover" sizes="(min-width: 1024px) 42vw, 100vw" />
          </div>
          <div>
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] md:text-5xl">{area.sectionThreeTitle}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-[1.5] text-[#121417]/72">{area.sectionThreeBody}</p>
          </div>
        </div>
      </section>

      <ServiceGridSection />
      <MovingSuppliesSection />
      <Footer />
    </main>
  );
}
