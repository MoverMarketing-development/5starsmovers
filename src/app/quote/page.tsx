import type { Metadata } from "next";
import Link from "next/link";
import QuoteWizard from "@/components/QuoteWizard";

export const metadata: Metadata = {
  title: "Get Your Quote | 5 Star Movers",
  description:
    "A premium multi-step moving quote form for 5 Star Movers with route details, move size, services, and contact information.",
};

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-[#121417] text-white">
      <header className="border-b border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 md:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffdc00] text-[#121417] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
                <path d="M7 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM18 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              </svg>
            </div>
            <div className="font-display">
              <span className="block text-lg font-extrabold tracking-tight transition-colors group-hover:text-[#ffdc00]">
                5 Star Movers
              </span>
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/[0.55]">
                Premium Quote Experience
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-white/72 transition-all duration-300 hover:border-white/18 hover:bg-white/[0.07] hover:text-white"
          >
            Back Home
          </Link>
        </div>
      </header>

      <QuoteWizard />
    </main>
  );
}
