import type { Metadata } from "next";
import QuoteWizard from "@/components/QuoteWizard";

export const metadata: Metadata = {
  title: "Get Your Quote | 5 Star Movers",
  description:
    "A premium multi-step moving quote form for 5 Star Movers with route details, move size, services, and contact information.",
};

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-[#121417] text-white">
      <QuoteWizard />
    </main>
  );
}
