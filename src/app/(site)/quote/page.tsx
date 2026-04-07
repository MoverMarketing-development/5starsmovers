import type { Metadata } from "next";
import QuoteWizard from "@/components/QuoteWizard";
import { getSeoSettings, buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("/quote");
  return buildMetadata({
    fallbackTitle: "Get Your Quote | 5 Star Movers",
    fallbackDescription: "A premium multi-step moving quote form for 5 Star Movers with route details, move size, services, and contact information.",
    pagePath: "/quote",
    seo,
  });
}

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-[#121417] text-white">
      <QuoteWizard />
    </main>
  );
}
