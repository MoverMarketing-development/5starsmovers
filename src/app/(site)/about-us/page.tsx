import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getSeoSettings, buildMetadata } from "@/lib/seo";

const trustHighlights = [
  "Minnesota's Most Trusted Movers",
  "Voted #1 by Forbes Magazine for Minneapolis & St. Paul",
  "With years of trusted service and countless satisfied customers",
];

const valueStatements = [
  "At 5-Star Movers, our mission is to make your move seamless and stress-free. We're committed to providing reliable, professional services with a focus on customer satisfaction.",
  "Our values are built around integrity, clear communication, and attention to detail. We handle every move with care, ensuring a smooth, efficient experience from start to finish. By staying true to these principles, we aim to deliver exceptional service and build lasting trust with every customer.",
];

const excellenceStatements = [
  "At 5-Star Movers, we believe moving should be simple, stress-free, and handled with care. With years of experience, our team is committed to providing top-quality moving services tailored to your needs. From local moves to long-distance relocations, we bring professionalism, efficiency, and reliability to every job. Our mission is to ensure your move is smooth from start to finish, with expert packing, secure transport, and outstanding customer service.",
  "Whether you're relocating your home or business, trust 5-Star Movers to handle it with care and precision. Your satisfaction is our top priority.",
];

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("/about-us");
  return buildMetadata({
    fallbackTitle: "About Us | 5 Star Movers",
    fallbackDescription: "Get to know us: At 5-Star Movers, we're dedicated to making your move smooth, efficient, and stress-free.",
    pagePath: "/about-us",
    seo,
  });
}

export default function AboutUsPage() {
  return (
    <main className="bg-background text-white">
      <section className="relative overflow-hidden border-b border-white/5 bg-[#121417]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,220,0,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(0,104,94,0.22),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">
              <span className="h-px w-12 bg-[#ffdc00]" />
              ABOUT US
            </p>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1] text-white md:text-6xl">
              About 5-Star Movers:
              <span className="block text-[#ffdc00]">Your Trusted Moving Experts</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-[1.6] text-white/72">
              Get to know us: At 5-Star Movers, we&apos;re dedicated to making your move smooth, efficient, and stress-free.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-[1.7] text-white/68">
              Voted #1 by Forbes Magazine for Minneapolis &amp; St. Paul, 5-Star Movers is your go-to local moving expert. With years of trusted service and countless satisfied customers, we guarantee a smooth, hassle-free move. Contact us today for a free, no-obligation quote and discover the 5-Star difference that sets us apart from the rest!
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/quote"
                className="cta-sheen inline-flex items-center justify-center rounded-full px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[#121417]"
              >
                Get Free Moving Quote
              </Link>
              <a
                href="tel:6512431993"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.16em] text-white/78 hover:border-[#ffdc00]/40 hover:text-white"
              >
                CALL (651) 243-1993
              </a>
            </div>
          </div>

          <div className="grid gap-4 self-end">
            {trustHighlights.map((item, index) => (
              <article
                key={item}
                className="glass-panel ambient-shadow rounded-[1.5rem] border border-white/10 p-6"
              >
                <p className="font-label text-[11px] font-bold uppercase tracking-[0.3em] text-[#ffdc00]">
                  0{index + 1}
                </p>
                <p className="mt-4 font-display text-2xl font-extrabold leading-[1.15] text-white">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#016d63] py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,220,0,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.3),transparent_34%),linear-gradient(135deg,rgba(1,109,99,0.92)_0%,rgba(0,82,74,0.98)_55%,rgba(7,30,28,1)_100%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle,rgba(255,220,0,0.28)_1.2px,transparent_1.2px)] [background-size:34px_34px]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">
              Our Mission and Values
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold text-white md:text-5xl">
              Our Mission and Values
            </h2>
          </div>
          <div className="space-y-5">
            {valueStatements.map((statement) => (
              <div
                key={statement}
                className="rounded-[1.4rem] border border-white/12 bg-black/10 p-7 text-base leading-[1.75] text-white/80 backdrop-blur-[2px]"
              >
                {statement}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#121417] py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-3xl">
            <p className="font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">
              Dedicated to Excellence in Moving Services
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold text-white md:text-5xl">
              Dedicated to Excellence in Moving Services
            </h2>
          </div>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="order-2 space-y-6 lg:order-1">
              {excellenceStatements.map((statement) => (
                <p
                  key={statement}
                  className="max-w-2xl text-lg leading-[1.85] text-white/72"
                >
                  {statement}
                </p>
              ))}
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#1b2027]">
                <Image
                  src="/about-us/men-doing-commercial.jpeg"
                  alt="5-Star Movers team moving commercial furniture"
                  width={1366}
                  height={768}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#121417] py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-white/8" />
        <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
          <p className="font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">
            READY TO MOVE? CONTACT MINNEAPOLIS&apos; BEST MOVERS TODAY!
          </p>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] text-white md:text-6xl">
            Ready to Move?
            <span className="block text-[#ffdc00]">Contact the Best Movers in Minnesota!</span>
          </h2>
          <div className="mt-10">
            <Link
              href="/quote"
              className="cta-sheen inline-flex rounded-full px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[#121417]"
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
