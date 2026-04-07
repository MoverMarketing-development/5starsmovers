import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import MovingSuppliesSection from "@/components/MovingSuppliesSection";
import TrustBanner from "@/components/TrustBanner";
import { servicePageMap, servicePages } from "@/lib/service-pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function Icon({ name, className }: { name: "star" | "arrow" | "phone" | "home" | "route" | "building" | "box" | "heart" | "package" | "apartment" | "squares" | "warehouse" | "sparkles" | "shield" | "trash"; className?: string }) {
  const shared = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.8, viewBox: "0 0 24 24" };
  switch (name) {
    case "star": return <svg {...shared}><path d="m12 3 2.7 5.47 6.04.88-4.37 4.26 1.03 6.02L12 16.77 6.6 19.63l1.03-6.02L3.26 9.35l6.04-.88L12 3Z" /></svg>;
    case "arrow": return <svg {...shared}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case "phone": return <svg {...shared}><path d="M5 4h4l1 4-2 2a16 16 0 0 0 6 6l2-2 4 1v4c0 1-1 2-2 2C10.82 21 3 13.18 3 6c0-1 1-2 2-2Z" /></svg>;
    case "home": return <svg {...shared}><path d="M4 10.5 12 4l8 6.5V20H4v-9.5Z" /><path d="M9 20v-5h6v5" /></svg>;
    case "route": return <svg {...shared}><path d="M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M8 17h3a4 4 0 0 0 4-4V9" /><path d="M15 9h1" /></svg>;
    case "building": return <svg {...shared}><path d="M4 20V6l8-2 8 2v14" /><path d="M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" /></svg>;
    case "box": return <svg {...shared}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M12 12 4 7.5M12 12l8-4.5M12 12v9" /></svg>;
    case "heart": return <svg {...shared}><path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" /></svg>;
    case "package": return <svg {...shared}><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" /><path d="M4 7.5V16.5L12 21l8-4.5V7.5" /><path d="M12 12v9" /></svg>;
    case "apartment": return <svg {...shared}><path d="M6 20V5h12v15" /><path d="M9 8h.01M12 8h.01M15 8h.01M9 12h.01M12 12h.01M15 12h.01M11 20v-4h2v4" /></svg>;
    case "squares": return <svg {...shared}><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /></svg>;
    case "warehouse": return <svg {...shared}><path d="m3 10 9-6 9 6v10H3V10Z" /><path d="M7 14h10M7 17h10" /></svg>;
    case "sparkles": return <svg {...shared}><path d="m12 3 1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4L12 3ZM18.5 14l.82 2.18L21.5 17l-2.18.82L18.5 20l-.82-2.18L15.5 17l2.18-.82L18.5 14ZM6 14l.82 2.18L9 17l-2.18.82L6 20l-.82-2.18L3 17l2.18-.82L6 14Z" /></svg>;
    case "shield": return <svg {...shared}><path d="M12 3 5 6v5c0 5 3.5 8.5 7 10 3.5-1.5 7-5 7-10V6l-7-3Z" /></svg>;
    case "trash": return <svg {...shared}><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M7 7l1 13h8l1-13" /></svg>;
  }
}

export async function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePageMap[slug];
  return service ? { title: `${service.title} | 5 Star Movers Minnesota`, description: service.heroDescription } : {};
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicePageMap[slug];
  if (!service) notFound();

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
              <p className="mb-5 flex items-center justify-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00] lg:justify-start"><span className="accent-line hidden h-px w-12 sm:block" />{service.heroEyebrow}</p>
              <h1 className="font-display text-4xl font-extrabold leading-[0.95] text-white sm:text-5xl lg:text-6xl">{service.heroTitle}<span className="mt-2 block text-[#ffdc00]">{service.heroAccent}</span></h1>
              <p className="mt-6 max-w-2xl text-base leading-[1.6] text-white/[0.68] lg:text-lg">{service.heroDescription}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start lg:mt-10">
                <Link href="/quote" className="cta-sheen inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[#121417]">Get Free Quote<Icon name="arrow" className="h-4 w-4" /></Link>
                <a href="tel:6514619202" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-display font-bold uppercase tracking-[0.18em] text-white hover:border-[#ffdc00]/40 hover:text-[#ffdc00]"><Icon name="phone" className="h-4 w-4 text-[#ffdc00]" />(651) 461-9202</a>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-white/5 pt-6 lg:mt-10 lg:justify-start">
                {service.heroPoints.map((item) => <div key={item} className="flex items-center gap-2 text-[11px] font-display font-bold uppercase tracking-[0.24em] text-white/[0.72]"><Icon name="star" className="h-3.5 w-3.5 text-[#ffdc00]" />{item}</div>)}
              </div>
            </div>
            <div className="glass-panel ambient-shadow rounded-[2rem] border border-white/10 p-6 lg:p-7">
              <p className="font-label text-[11px] font-bold uppercase tracking-[0.3em] text-[#ffdc00]">
                Quick Quote Start
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1] text-white">
                Start with your route
              </h2>
              <p className="mt-4 text-sm leading-[1.5] text-white/58">
                Enter where you are moving from and to. We will carry both addresses into the full quote form automatically.
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
                    autoComplete="street-address"
                    placeholder="Current pickup address"
                    className="quote-input mt-3 w-full rounded-[1.1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-base text-white placeholder:text-white/28 outline-none transition-all duration-300 focus:border-[#ffdc00]/55 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(255,220,0,0.08)]"
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
                    autoComplete="street-address"
                    placeholder="Destination address"
                    className="quote-input mt-3 w-full rounded-[1.1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-base text-white placeholder:text-white/28 outline-none transition-all duration-300 focus:border-[#ffdc00]/55 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(255,220,0,0.08)]"
                  />
                </label>

                <button
                  type="submit"
                  className="cta-sheen mt-2 inline-flex h-[58px] cursor-pointer items-center justify-center rounded-full px-7 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[#121417]"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <TrustBanner />
      <section className="border-b border-white/5 bg-[#111417] py-16 md:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="order-2 relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-white/10 bg-[#1b1f23] lg:order-1">

            <Image
              src={service.sectionOneImage}
              alt={`${service.title} service photo`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
          <div className="order-1 text-center lg:order-2 lg:text-left">
            <p className="mb-4 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">Service Overview</p>
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] text-white md:text-5xl">{service.sectionOneTitle}</h2>
            <p className="mt-6 max-w-3xl text-base leading-[1.65] text-white/[0.68] md:text-lg">{service.sectionOneBody}</p>
          </div>
        </div>
      </section>
      <section className="border-b border-white/5 bg-[#f4f0e8] py-16 text-[#121417] md:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="order-1 text-center lg:text-left">
            <p className="mb-4 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#00685e]">Built For This Service</p>
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] md:text-5xl">{service.sectionTwoTitle}</h2>
            <p className="mt-6 max-w-3xl text-base leading-[1.65] text-[#121417]/72 md:text-lg">{service.sectionTwoBody}</p>
          </div>
          <div className="order-2 relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_24px_60px_rgba(18,20,23,0.12)]">

            <Image
              src={service.sectionTwoImage}
              alt={`${service.title} team at work`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
          </div>
        </div>
      </section>
      <section className="grid-dot-pattern relative overflow-hidden bg-[#1a1d21] py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-3xl text-center lg:text-left">
              <p className="mb-3 flex items-center justify-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00] lg:justify-start"><span className="accent-line hidden h-px w-12 sm:block" />Why Choose Us</p>
              <h2 className="font-display text-4xl font-extrabold leading-[1] text-white md:text-5xl">{service.whyChooseTitle}</h2>
            </div>
            <p className="hidden max-w-sm border-l border-[#ffdc00]/20 pl-6 text-sm leading-[1.5] text-white/[0.55] md:block">{service.whyChooseIntro}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {service.whyChooseCards.map((card) => <article key={card.number} className="group relative overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm"><span className="absolute -right-4 -top-6 font-display text-8xl font-black italic text-white/5 transition-colors duration-300 group-hover:text-[#ffdc00]/12">{card.number}</span><div className="relative z-10"><div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#121417] text-[#ffdc00] transition-colors group-hover:bg-[#ffdc00] group-hover:text-[#121417]"><Icon name="star" className="h-5 w-5" /></div><h3 className="font-display text-2xl font-extrabold text-white">{card.title}</h3><p className="mt-4 text-sm leading-[1.5] text-white/[0.58]">{card.description}</p></div><div className="absolute bottom-0 left-0 h-1 w-0 bg-[#ffdc00] transition-all duration-500 group-hover:w-full" /></article>)}
          </div>
        </div>
      </section>
      <MovingSuppliesSection />
      <section className="relative overflow-hidden bg-[#121417] py-20">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <p className="font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">Ready To Move</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1] text-white md:text-5xl">Book {service.title}<span className="block text-[#ffdc00]">With Minnesota&apos;s 5-Star Crew</span></h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-[1.5] text-white/[0.62]">Request a quote for {service.title.toLowerCase()} and we will help you plan the right scope, timing, and level of support.</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/quote" className="cta-sheen inline-flex items-center justify-center rounded-full px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[#121417]">Get Free Moving Quote</Link>
            <a href="tel:6514619202" className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-white hover:border-[#ffdc00]/35 hover:text-[#ffdc00]">Call (651) 461-9202</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
