import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const contactCards = [
  {
    label: "Email",
    value: "5starmoversmn@gmail.com",
    href: "mailto:5starmoversmn@gmail.com",
  },
  {
    label: "Phone",
    value: "(651) 243-1993",
    href: "tel:6512431993",
  },
  {
    label: "Office",
    value: "5-Star Movers 6325 Cambridge St #1 St Louis Park, MN 55416",
    href: "https://g.co/kgs/GREhhNw",
  },
];

export const metadata: Metadata = {
  title: "Contact Us | 5 Star Movers",
  description: "Contact information for 5 Star Movers.",
};

export default function ContactUsPage() {
  return (
    <main className="bg-background text-white">
      <section className="relative overflow-hidden border-b border-white/8 bg-[#121417]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(1,109,99,0.55),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,220,0,0.14),transparent_18%),linear-gradient(135deg,#101316_0%,#121417_44%,#0d2c28_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center md:px-8 md:py-20 lg:py-28 lg:text-left">
          <p className="flex items-center justify-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00] lg:justify-start">
            <span className="hidden h-px w-12 bg-[#ffdc00] sm:block" />
            Contact Us
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[0.95] text-white sm:text-5xl lg:mx-0 lg:text-7xl">
            Contact us
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-white/62 lg:justify-start">
            <Link href="/" className="rounded-full border border-white/10 px-4 py-2 hover:border-[#ffdc00]/40 hover:text-white">
              Home
            </Link>
            <Link href="/about-us" className="rounded-full border border-white/10 px-4 py-2 hover:border-[#ffdc00]/40 hover:text-white">
              About Us
            </Link>
            <span className="text-white/35">/</span>
            <span className="text-white">Contact</span>
          </div>
        </div>
      </section>

      <section className="bg-[#121417] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 max-w-3xl text-center lg:mb-10 lg:text-left">
            <p className="font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">
              Minnesota&apos;s Most Trusted Movers
            </p>
          </div>

          <div className="grid gap-6 text-center md:grid-cols-3">
            {contactCards.map((card, index) => (
              <a
                key={card.label}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`mx-auto flex h-full w-full max-w-md flex-col items-center justify-center rounded-[1.8rem] border p-6 transition-colors hover:border-[#ffdc00]/35 md:max-w-none md:p-8 ${
                  index === 1
                    ? "border-[#016d63]/45 bg-[linear-gradient(135deg,rgba(1,109,99,0.22)_0%,rgba(18,20,23,1)_55%,rgba(18,20,23,1)_100%)]"
                    : "border-white/8 bg-[#171b1f]"
                }`}
              >
                <p className="font-label text-[11px] font-bold uppercase tracking-[0.32em] text-[#ffdc00]">
                  {card.label}
                </p>
                <p className="mt-4 text-balance font-display text-xl font-extrabold leading-[1.25] text-white sm:text-2xl">
                  {card.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/6 bg-[#016d63] py-16 md:py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,220,0,0.18),transparent_24%),linear-gradient(135deg,rgba(1,109,99,1)_0%,rgba(1,91,82,1)_48%,rgba(8,24,22,1)_100%)]" />
        <div className="relative mx-auto max-w-6xl px-4 text-center md:px-8">
          <p className="font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">
            READY TO MOVE? CONTACT MINNEAPOLIS&apos; BEST MOVERS TODAY!
          </p>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] text-white md:text-6xl">
            Ready to Move?
            <span className="block text-[#d8fff3]">Contact the Best Movers in Minnesota!</span>
          </h2>
          <div className="mt-10">
            <Link
              href="/quote"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#ffdc00] px-8 py-4 text-center font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[#121417] transition-all hover:scale-[1.02] hover:bg-[#ffe75a] sm:w-auto"
            >
              GET FREE MOVING QUOTE
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
