import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import ServiceGridSection from "@/components/ServiceGridSection";
import TrustBanner from "@/components/TrustBanner";

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

  return null;
}

export default function Home() {
  return (
    <main className="bg-background text-white">
      <section id="home" className="relative overflow-hidden">
        <div className="mx-auto grid min-h-[auto] max-w-7xl items-end gap-6 px-4 pt-8 pb-12 md:px-8 md:pt-10 lg:min-h-[820px] lg:grid-cols-[1fr_1fr] lg:gap-4 lg:pt-0">
          <div className="pt-0 pb-0 text-center lg:text-left">
            <div className="mb-5 flex items-center justify-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00] lg:justify-start">
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
            <p className="mt-6 max-w-xl text-base leading-[1.6] text-white/[0.68] md:text-lg">
              We do more than move boxes. We anchor your transition with white-glove service, transparent planning, and premium execution from Minneapolis to the rest of Minnesota.
            </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                <Link href="/quote" className="cta-sheen inline-flex items-center justify-center gap-2 rounded-md px-7 py-4 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[#121417]">
                  Book Your Move Now
                </Link>
                <a
                  href="tel:6514619202"
                  className="inline-flex items-center justify-center rounded-md border border-white/14 px-7 py-4 text-center font-display text-sm font-extrabold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#ffdc00]/40 hover:text-[#ffdc00] sm:hidden"
                >
                  Call (651) 461-9202
                </a>
                <a href="#difference" className="group inline-flex items-center justify-center gap-3 self-center text-sm font-display font-bold text-white transition-all duration-300 hover:text-[#ffdc00] sm:self-auto">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#ffdc00] bg-transparent text-[#ffdc00] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#ffdc00] group-hover:text-[#121417] group-hover:shadow-[0_12px_28px_rgba(255,220,0,0.2)]">
                    <Icon name="arrow" className="h-4 w-4" />
                  </span>
                How We Work
              </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:hidden">
              <div className="glass-panel ambient-shadow rounded-[1.4rem] border border-white/10 px-5 py-4 text-left">
                <p className="font-label text-[10px] uppercase tracking-[0.25em] text-white/[0.55]">Our Reviews</p>
                <div className="mt-3 flex items-center gap-2">
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
              <div className="glass-panel ambient-shadow rounded-[1.4rem] border border-white/10 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffdc00] text-[#121417]">
                    <Icon name="truck" className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white">123+</p>
                    <p className="font-label text-[10px] uppercase tracking-[0.25em] text-white/[0.55]">Active Clients</p>
                  </div>
                </div>
              </div>
              <div className="glass-panel ambient-shadow rounded-[1.4rem] border border-white/10 px-5 py-4 text-left">
                <div className="flex items-center gap-3">
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

            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-white/5 pt-6 lg:justify-start">
              {["Licensed & Insured", "Satisfaction Guaranteed", "24/7 Support"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[11px] font-display font-bold uppercase tracking-[0.24em] text-white/[0.72]">
                  <Icon name="star" className="h-3.5 w-3.5 text-[#ffdc00]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden items-end justify-center self-end lg:flex lg:justify-end">
            <div className="absolute left-1/2 top-1/2 h-[94%] w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffdc00]/10 blur-3xl" />
            <div className="relative w-full max-w-[52rem] lg:-mr-12">
              <img alt="5 Star Movers team" className="relative z-10 h-auto w-full scale-[1.18] object-contain lg:scale-[1.32]" src="/hero-pic.png" />

              <div className="ambient-shadow glass-panel absolute -right-12 top-[calc(20%+35px)] z-30 rounded-2xl border border-white/10 px-3 py-3 lg:-right-20">
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

              <div className="ambient-shadow glass-panel absolute -left-14 top-[56%] z-30 flex items-center gap-3 rounded-2xl border border-white/10 px-3 py-3 lg:-left-20">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffdc00] text-[#121417]">
                  <Icon name="truck" className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">123+</p>
                  <p className="font-label text-[10px] uppercase tracking-[0.25em] text-white/[0.55]">Active Clients</p>
                </div>
              </div>

              <div className="ambient-shadow glass-panel absolute left-[calc(34%+40px)] top-[calc(82%+20px)] z-30 flex items-center gap-3 rounded-2xl border border-white/10 px-3 py-3 lg:left-[calc(30%+40px)]">
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

      <section className="grid-dot-pattern relative overflow-hidden bg-[#1a1d21] py-16 md:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="order-2 relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
            <Image
              src="/service-images/loading-local-1.jpeg"
              alt="5 Star Movers team handling a move in Minnesota"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>

          <div className="order-1 max-w-3xl text-center lg:text-left">
            <p className="mb-4 flex items-center justify-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00] lg:justify-start">
              <span className="accent-line hidden h-px w-12 sm:block" />
              Trusted Across Minnesota
            </p>
            <h2 className="font-display text-4xl font-extrabold leading-[1.02] text-white md:text-5xl">
              We&apos;re Your Trusted Movers in Minnesota
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-[1.65] text-white/[0.68]">
              Moving can be stressful, but with 5-Star Movers, it doesn&apos;t have to be. Our expert
              movers in Minnesota are here to make your transition seamless, whether you&apos;re moving
              down the street or across the state. We handle residential and commercial moves with care,
              efficiency, upfront pricing, and the kind of customer service that keeps the whole process
              feeling clear and under control.
            </p>
          </div>
        </div>
      </section>

      <ServiceGridSection />

      <section className="grid-dot-pattern relative overflow-hidden bg-[#1a1d21] py-16 md:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="order-1 max-w-3xl text-center lg:text-left">
            <p className="mb-4 flex items-center justify-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00] lg:justify-start">
              <span className="accent-line hidden h-px w-12 sm:block" />
              Twin Cities Coverage
            </p>
            <h2 className="font-display text-4xl font-extrabold leading-[1.02] text-white md:text-5xl">
              Explore All The Areas We Serve
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-[1.65] text-white/[0.68]">
              Browse our Minneapolis and Twin Cities coverage pages to see the communities we move in
              every day, with local area details, real city imagery, and direct links to each service
              area we support.
            </p>
            <Link
              href="/areas"
              className="cta-sheen mt-8 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[#121417]"
            >
              Explore Areas
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <div className="order-2 relative aspect-[5/3] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
            <Image
              src="/area-images/areas-collage.png"
              alt="Collage of Twin Cities areas served by 5 Star Movers"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section id="awards" className="border-t border-white/5 bg-[#121417] py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
          <p className="font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">Our Recognition</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-white md:text-5xl">Award-Winning Moving Services You Can Trust</h2>
          <p className="mx-auto mt-6 max-w-4xl text-base leading-[1.5] text-white/[0.62]">
            We are proud to be recognized across the Twin Cities for consistent service quality, professional crews, and a moving experience people genuinely recommend.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 md:mt-14">
            {awards.map((award) => (
              <div key={award.name} className="glass-panel flex h-28 min-w-40 items-center justify-center rounded-[1.4rem] border border-white/10 px-6">
                <img
                  alt={award.name}
                  className="max-h-20 w-auto object-contain"
                  src={award.src}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="difference" className="grid-dot-pattern relative overflow-hidden bg-[#1a1d21] py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
            <div className="max-w-2xl text-center md:text-left">
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

      <section id="quote" className="relative overflow-hidden bg-[#121417] pt-10 md:pt-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 md:gap-12 md:px-8 lg:flex-row lg:items-stretch">
          <div className="flex flex-1 flex-col justify-center pt-4 pb-10 text-center md:pt-5 md:pb-14 lg:pt-6 lg:pb-18 lg:text-left">
            <p className="mb-4 flex items-center justify-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00] lg:justify-start">
              <span className="h-px w-10 bg-[#ffdc00]" />
              Start Your Journey
            </p>
            <h2 className="font-display text-4xl font-extrabold leading-[1] text-white md:text-5xl lg:text-6xl">
              Ready to Move?
              <br />
              Contact the Best
              <span className="block text-[#ffdc00]">Local Movers in the Twin Cities!</span>
            </h2>
            <Link href="/quote" className="cta-sheen mt-8 inline-flex w-fit self-center rounded-full px-8 py-4 text-center font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[#121417] lg:self-start">
              Get Free Moving Quote
            </Link>
            <div className="mt-5 flex flex-col items-center justify-center gap-2 text-center text-base leading-[1.4] text-white/[0.58] sm:flex-row sm:flex-wrap sm:gap-3 sm:text-sm lg:justify-start lg:text-left">
              <span>Fast response within 2 hours</span>
              <span className="hidden h-1.5 w-1.5 rounded-full bg-[#ffdc00] sm:block" />
              <span>No obligation quote</span>
            </div>
          </div>

          <div className="relative -mt-2 flex flex-1 items-end self-stretch pt-0 md:mt-0 lg:-mr-6">
            <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#121417] to-transparent" />
            <img alt="Professional moving crew" className="mx-auto mt-auto block h-auto max-w-full translate-y-1 scale-[1.08] object-contain lg:scale-[1.14]" src="/hero-pic.png" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
