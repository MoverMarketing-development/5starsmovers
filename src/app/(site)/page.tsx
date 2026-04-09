import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import ServiceGridSection from "@/components/ServiceGridSection";
import TrustBanner from "@/components/TrustBanner";
import { getSeoSettings, buildMetadata } from "@/lib/seo";
import { LocalBusinessJsonLd } from "@/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("/");
  return buildMetadata({
    fallbackTitle: "5 Star Movers | Premium Moving Services in Minnesota",
    fallbackDescription: "Minnesota's most trusted movers. 5-star rated, upfront pricing, and expert crews for residential, commercial, and long-distance moves.",
    pagePath: "/",
    seo,
  });
}

const awards = [
  { name: "Best Pros In Town", src: "/awards/badge1.png" },
  { name: "House Method Best Moving Companies", src: "/awards/badge2.webp" },
  { name: "Top 10 Movers in Minneapolis", src: "/awards/badge3.webp" },
  { name: "BBB Accredited", src: "/awards/badge4.svg" },
];

const trustCards = [
  { number: "01", title: "Minneapolis Based", description: "Local crews with real Twin Cities knowledge, faster planning, and cleaner execution from the first call." },
  { number: "02", title: "Upfront Pricing", description: "Transparent quotes, no hidden fees, and a scope-first approach that keeps every move predictable." },
  { number: "03", title: "Friendly Team", description: "Experienced movers who combine careful handling with clear communication and calm service on moving day." },
];

type IconName =
  | "phone"
  | "star"
  | "home"
  | "route"
  | "building"
  | "box"
  | "heart"
  | "package"
  | "apartment"
  | "squares"
  | "warehouse"
  | "sparkles"
  | "shield"
  | "trash"
  | "arrow"
  | "truck";

function Icon({ name, className }: { name: IconName; className?: string }) {
  const shared = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.8, viewBox: "0 0 24 24" };

  switch (name) {
    case "phone":
      return <svg {...shared}><path d="M5 4h4l1 4-2 2a16 16 0 0 0 6 6l2-2 4 1v4c0 1-1 2-2 2C10.82 21 3 13.18 3 6c0-1 1-2 2-2Z" /></svg>;
    case "star":
      return <svg {...shared}><path d="m12 3 2.7 5.47 6.04.88-4.37 4.26 1.03 6.02L12 16.77 6.6 19.63l1.03-6.02L3.26 9.35l6.04-.88L12 3Z" /></svg>;
    case "home":
      return <svg {...shared}><path d="M4 10.5 12 4l8 6.5V20H4v-9.5Z" /><path d="M9 20v-5h6v5" /></svg>;
    case "route":
      return <svg {...shared}><path d="M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M8 17h3a4 4 0 0 0 4-4V9" /><path d="M15 9h1" /></svg>;
    case "building":
      return <svg {...shared}><path d="M4 20V6l8-2 8 2v14" /><path d="M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" /></svg>;
    case "box":
      return <svg {...shared}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M12 12 4 7.5M12 12l8-4.5M12 12v9" /></svg>;
    case "heart":
      return <svg {...shared}><path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" /></svg>;
    case "package":
      return <svg {...shared}><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" /><path d="M4 7.5V16.5L12 21l8-4.5V7.5" /><path d="M12 12v9" /></svg>;
    case "apartment":
      return <svg {...shared}><path d="M6 20V5h12v15" /><path d="M9 8h.01M12 8h.01M15 8h.01M9 12h.01M12 12h.01M15 12h.01M11 20v-4h2v4" /></svg>;
    case "squares":
      return <svg {...shared}><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /></svg>;
    case "warehouse":
      return <svg {...shared}><path d="m3 10 9-6 9 6v10H3V10Z" /><path d="M7 14h10M7 17h10" /></svg>;
    case "sparkles":
      return <svg {...shared}><path d="m12 3 1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4L12 3ZM18.5 14l.82 2.18L21.5 17l-2.18.82L18.5 20l-.82-2.18L15.5 17l2.18-.82L18.5 14ZM6 14l.82 2.18L9 17l-2.18.82L6 20l-.82-2.18L3 17l2.18-.82L6 14Z" /></svg>;
    case "shield":
      return <svg {...shared}><path d="M12 3 5 6v5c0 5 3.5 8.5 7 10 3.5-1.5 7-5 7-10V6l-7-3Z" /></svg>;
    case "trash":
      return <svg {...shared}><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M7 7l1 13h8l1-13" /></svg>;
    case "arrow":
      return <svg {...shared}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case "truck":
      return <svg {...shared}><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" /><path d="M7 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM18 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /></svg>;
  }
}

export default function Home() {
  return (
    <main className="bg-background text-white">
      <LocalBusinessJsonLd />
      <section id="home" className="relative overflow-hidden">
        <div className="mx-auto grid min-h-[600px] max-w-7xl items-end gap-6 px-4 pb-12 md:px-8 sm:min-h-[820px] lg:grid-cols-[1fr_1fr] lg:gap-4">
          <div className="pt-0 pb-0">
            <div className="mb-5 flex items-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">
              <span className="h-px w-10 bg-[#ffdc00]" />
              Moving with Precision
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Seamless Moving
              <br />
              For Your Home
              <br />
              & Office
              <span className="block text-[#ffdc00]">Boosting Your Comfort</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-[1.5] text-white/[0.68]">
              We do more than move boxes. We anchor your transition with white-glove service, transparent planning, and premium execution from Minneapolis to the rest of Minnesota.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/quote" className="cta-sheen inline-flex items-center justify-center gap-2 rounded-md px-7 py-4 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[#121417]">
                Book Your Move Now
              </Link>
              <a href="#difference" className="group inline-flex items-center gap-3 text-sm font-display font-bold text-white transition-all duration-300 hover:text-[#ffdc00]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#ffdc00] bg-transparent text-[#ffdc00] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#ffdc00] group-hover:text-[#121417] group-hover:shadow-[0_12px_28px_rgba(255,220,0,0.2)]">
                  <Icon name="arrow" className="h-4 w-4" />
                </span>
                How We Work
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/5 pt-6">
              {["Licensed & Insured", "Satisfaction Guaranteed", "24/7 Support"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[11px] font-display font-bold uppercase tracking-[0.24em] text-white/[0.72]">
                  <Icon name="star" className="h-3.5 w-3.5 text-[#ffdc00]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-end justify-center self-end lg:justify-end">
            <div className="absolute left-1/2 top-1/2 h-[94%] w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffdc00]/10 blur-3xl" />
            <div className="relative w-full max-w-[52rem] lg:-mr-12">
              <Image
                src="/hero-pic.png"
                alt="5 Star Movers team"
                width={1120}
                height={980}
                preload
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="relative z-10 h-auto w-full scale-[1.18] object-contain lg:scale-[1.32]"
              />

              <div className="ambient-shadow glass-panel absolute -right-12 top-[calc(20%+35px)] z-30 hidden rounded-2xl border border-white/10 px-3 py-3 sm:flex lg:-right-20">
                <p className="font-label text-[10px] uppercase tracking-[0.25em] text-white/[0.55]">Our Reviews</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#121417] bg-[#ffdc00]">
                        <Icon name="star" className="h-3.5 w-3.5 text-[#121417]" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white">+123k happy clients</span>
                </div>
              </div>

              <div className="ambient-shadow glass-panel absolute -left-14 top-[56%] z-30 hidden items-center gap-3 rounded-2xl border border-white/10 px-3 py-3 sm:flex lg:-left-20">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffdc00] text-[#121417]">
                  <Icon name="truck" className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">123+</p>
                  <p className="font-label text-[10px] uppercase tracking-[0.25em] text-white/[0.55]">Active Clients</p>
                </div>
              </div>

              <div className="ambient-shadow glass-panel absolute left-[calc(34%+40px)] top-[calc(82%+20px)] z-30 hidden items-center gap-3 rounded-2xl border border-white/10 px-3 py-3 sm:flex lg:left-[calc(30%+40px)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffdc00] text-[#121417]">
                  <Icon name="shield" className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">69+</p>
                  <p className="font-label text-[10px] uppercase tracking-[0.25em] text-white/[0.55]">Skilled Experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBanner />

      <ServiceGridSection />

      <section id="awards" className="relative overflow-hidden py-24">
        {/* Background: dark base + green radial glow center + gold top-right accent */}
        <div className="absolute inset-0 bg-[#0d1210]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#0d5c5520_0%,transparent_70%)]" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#ffdc00]/6 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-[#006e63]/15 blur-3xl" />
        {/* Top border with gradient */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#006e63]/60 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 text-center md:px-8">
          <p className="font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">Our Recognition</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-white md:text-5xl">
            Award-Winning Moving Services
            <span className="block bg-gradient-to-r from-[#006e63] via-[#00a896] to-[#006e63] bg-clip-text text-transparent">
              You Can Trust
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-base leading-[1.5] text-white/[0.55]">
            We are proud to be recognized across the Twin Cities for consistent service quality, professional crews, and a moving experience people genuinely recommend.
          </p>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
            {awards.map((award) => (
              <div key={award.name} className="group relative flex h-28 min-w-40 items-center justify-center overflow-hidden rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-6 transition-all duration-300 hover:border-[#006e63]/50 hover:bg-[#006e63]/8">
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_center,#006e6310_0%,transparent_70%)]" />
                <div className="relative h-20 w-full">
                  <Image
                    src={award.src}
                    alt={award.name}
                    fill
                    sizes="160px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="difference" className="grid-dot-pattern relative overflow-hidden bg-[#1a1d21] py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-3 flex items-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">
                <span className="accent-line h-px w-12" />
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

          <div className="grid gap-6 md:grid-cols-3">
            {trustCards.map((card) => (
              <article key={card.number} className="group relative overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm">
                <span className="absolute -right-4 -top-6 font-display text-8xl font-black italic text-white/5 transition-colors duration-300 group-hover:text-[#ffdc00]/12">
                  {card.number}
                </span>
                <div className="relative z-10">
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#121417] text-[#ffdc00] transition-colors group-hover:bg-[#ffdc00] group-hover:text-[#121417]">
                    <Icon name="star" className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl font-extrabold text-white">{card.title}</h3>
                  <p className="mt-4 text-sm leading-[1.5] text-white/[0.58]">{card.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#ffdc00] transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="relative overflow-hidden bg-[#f8f6ef]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="grid items-stretch lg:grid-cols-2">

            {/* Left: Content */}
            <div className="flex flex-col justify-center py-16 lg:py-24 lg:pr-16">
              <p className="mb-5 flex items-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#0d5c55]">
                <span className="h-px w-10 bg-[#0d5c55]" />
                Start Your Journey
              </p>
              <h2 className="font-display text-4xl font-extrabold leading-[1.05] text-[#143d39] md:text-5xl lg:text-[3.5rem]">
                Ready to Move?
                <span className="mt-1 block text-[#ffdc00] [text-shadow:0_2px_0_#c9a800]">
                  Twin Cities&apos; Best.
                </span>
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-[#143d39]/60">
                Local crews, upfront pricing, and 5-star service — from your first call to the last box.
              </p>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
                <div>
                  <p className="font-display text-2xl font-black text-[#143d39] sm:text-3xl">2,500+</p>
                  <p className="mt-0.5 text-xs font-semibold text-[#143d39]/50">5-Star Reviews</p>
                </div>
                <div className="h-10 w-px bg-[#143d39]/15" />
                <div>
                  <p className="font-display text-2xl font-black text-[#143d39] sm:text-3xl">10+</p>
                  <p className="mt-0.5 text-xs font-semibold text-[#143d39]/50">Years in Business</p>
                </div>
                <div className="h-10 w-px bg-[#143d39]/15" />
                <div>
                  <p className="font-display text-2xl font-black text-[#143d39] sm:text-3xl">&lt; 2h</p>
                  <p className="mt-0.5 text-xs font-semibold text-[#143d39]/50">Response Time</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/quote"
                  className="cta-sheen inline-flex rounded-full px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[#121417]"
                >
                  Get Free Moving Quote
                </Link>
                <div className="flex items-center gap-2 text-xs text-[#143d39]/50">
                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  No obligation
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative hidden min-h-[480px] overflow-hidden lg:block">
              <Image
                src="/about-us/men-doing-commercial.jpeg"
                alt="5 Star Movers professional crew"
                fill
                sizes="50vw"
                className="object-cover object-center"
              />
              {/* Left fade into cream */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f8f6ef] to-transparent" />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-[#143d39]/10" />
              {/* Badge */}
              <div className="absolute bottom-8 left-8 flex items-center gap-3 rounded-2xl bg-white/90 px-5 py-4 shadow-lg backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffdc00]">
                  <svg className="h-5 w-5 text-[#121417]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="m12 2.8 2.83 5.73 6.32.92-4.57 4.45 1.08 6.29L12 17.19l-5.66 2.98 1.08-6.29-4.57-4.45 6.32-.92L12 2.8Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-[#143d39]">5.0 / 5.0</p>
                  <p className="text-xs text-[#143d39]/55">Google Reviews</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
