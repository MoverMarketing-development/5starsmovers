import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getSeoSettings, buildMetadata } from "@/lib/seo";

const positions = ["Mover/Helper", "Driver"];
const employmentStatuses = ["Employed", "Self-employed", "Unemployed", "Student"];

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("/careers");
  return buildMetadata({
    fallbackTitle: "Careers | 5 Star Movers",
    fallbackDescription: "Job Application Form for 5 Star Movers.",
    pagePath: "/careers",
    seo,
  });
}

export default function CareersPage() {
  return (
    <main className="bg-background text-white">
      <section className="relative overflow-hidden border-b border-white/8 bg-[#121417]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(1,109,99,0.5),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,220,0,0.12),transparent_20%),linear-gradient(135deg,#101316_0%,#121417_42%,#0d2c28_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 lg:py-28">
          <p className="flex items-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">
            <span className="h-px w-12 bg-[#ffdc00]" />
            Careers
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[0.95] text-white sm:text-5xl lg:text-7xl">
            Careers
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-[1.65] text-white/72">
            Thank you for your interest in working with us. Please see below for available job opportunities, and submit your application by completing the form below.
          </p>
        </div>
      </section>

      <section className="bg-[#121417] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-[0.36fr_0.64fr]">
          <aside className="rounded-[1.6rem] border border-white/8 bg-[#171b1f] p-6">
            <p className="font-label text-[11px] font-bold uppercase tracking-[0.32em] text-[#ffdc00]">
              Minnesota&apos;s Most Trusted Movers
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-white">
              Job Application Form
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-white/68">
              Learn more about our company by clicking here.
            </p>
            <div className="mt-6">
              <Link
                href="/about-us"
                className="inline-flex rounded-full border border-white/10 px-5 py-3 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-white/76 hover:border-[#ffdc00]/45 hover:text-white"
              >
                Learn More About Our Company
              </Link>
            </div>
          </aside>

          <section className="rounded-[1.9rem] border border-[#016d63]/35 bg-[linear-gradient(135deg,rgba(1,109,99,0.16)_0%,rgba(18,20,23,1)_46%,rgba(18,20,23,1)_100%)] p-6 md:p-8">
            <h3 className="font-display text-3xl font-extrabold text-white">
              Contact Us
            </h3>

            <form className="mt-8 space-y-6">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-white/76">Name:</span>
                  <input
                    type="text"
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/30"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-white/76">Email:</span>
                  <input
                    type="email"
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/30"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-white/76">Phone:</span>
                <input
                  type="tel"
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/30"
                />
              </label>

              <fieldset className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-black/10 p-5">
                <legend className="px-2 text-sm font-semibold text-white/76">
                  What Position Are You Applying For?
                </legend>
                <div className="flex flex-wrap gap-3 pt-2">
                  {positions.map((position) => (
                    <label
                      key={position}
                      className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/76"
                    >
                      <input type="radio" name="position" className="accent-[#ffdc00]" />
                      {position}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-black/10 p-5">
                <legend className="px-2 text-sm font-semibold text-white/76">
                  What Is Your Employment Status?
                </legend>
                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  {employmentStatuses.map((status) => (
                    <label
                      key={status}
                      className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/76"
                    >
                      <input type="radio" name="employment-status" className="accent-[#ffdc00]" />
                      {status}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-white/76">Would You Like To List References?</span>
                <textarea
                  rows={4}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/30"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-white/76">Provide Your Resume</span>
                <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-black/20 px-4 py-6 text-center text-sm text-white/58">
                  <input type="file" className="mx-auto block text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-[#ffdc00] file:px-4 file:py-2 file:font-display file:text-xs file:font-extrabold file:uppercase file:tracking-[0.18em] file:text-[#121417]" />
                  <p className="mt-3">Upload File</p>
                </div>
              </label>

              <button
                type="button"
                className="cta-sheen inline-flex rounded-full px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[#121417]"
              >
                Submit Application
              </button>

              <div className="rounded-[1.5rem] border border-[#016d63]/35 bg-[#016d63]/12 p-5">
                <p className="font-display text-lg font-extrabold text-white">Thank you for contacting us.</p>
                <p className="mt-2 text-sm leading-[1.6] text-white/68">
                  We will get back to you as soon as possible.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/8 bg-black/15 p-5">
                <p className="font-display text-lg font-extrabold text-white">Oops, there was an error sending your message.</p>
                <p className="mt-2 text-sm leading-[1.6] text-white/68">
                  Please try again later.
                </p>
              </div>
            </form>
          </section>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/6 bg-[#016d63] py-24">
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
              className="inline-flex rounded-full bg-[#ffdc00] px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[#121417] transition-all hover:scale-[1.02] hover:bg-[#ffe75a]"
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
