import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

type FaqItem = {
  question: string;
  answer: string[];
};

type FaqSection = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: FaqItem[];
};

const faqSections: FaqSection[] = [
  {
    id: "before-the-move",
    eyebrow: "Before The Move",
    title: "Before The Move",
    intro:
      "Here you'll find answers to the most common questions we receive. Whether you're wondering about our services, pricing, or the moving process, we've compiled helpful information to ensure your experience with us is smooth and stress-free. If you don't find the answer you're looking for, feel free to reach out!",
    items: [
      {
        question: "What is your cancellation policy?",
        answer: [
          "You may cancel up until 48 hours before the move free of charge. If you cancel within 48 hours of your moving time, we will keep 1 hour of the moving cost as a charge for schedule disruptions.",
        ],
      },
      {
        question: "How do I book a move with 5-Star Movers?",
        answer: [
          "There are many ways you can book us! You can provide your information on our homepage free quote form and be contacted within 24 hours with a quote, schedule an in home quote, send us an email, or give us a call at (651) 243-1993. Whatever works best for you!",
        ],
      },
    ],
  },
  {
    id: "during-the-move",
    eyebrow: "During The Move",
    title: "During The Move",
    intro:
      "Answers for move day, scheduling, insurance, and timing so expectations stay clear from the moment your crew is assigned.",
    items: [
      {
        question: "When will the movers arrive?",
        answer: [
          "Our morning arrival times (7-9am) are guaranteed. Our afternoon and evening times are determined by how long the morning jobs take. We will be able to provide you with a rough estimate upon booking, and a more accurate ETA on the date of the move.",
        ],
      },
      {
        question: "Are my items insured?",
        answer: [
          "There are different levels of insurance decided by the level of service you are selecting.",
          "On labor-only moves, we have no legal liability to cover any of the items, but we do believe in making things right with the customer so we will come to an agreement which benefits all parties.",
          "For full-service moving jobs or movers + truck jobs there are two different levels of insurance coverage. The first is known as released value coverage, and it is free on all full-service or movers + truck jobs. The limit of liability is 60 cents per pound per article. The second is known as full-coverage protection, and this is available for a fee associated with how much coverage you wish to purchase. This covers items at the current market rate for the condition they are currently in.",
          "Keep in mind that items do depreciate with time, and things are not still worth what you paid for them new.",
          "Most home owner's and renter's insurance policies do cover moving, and could provide you with free coverage over and above the released value coverage. We do work with each customer to assure both sides come to agreeable terms when it comes to damaged items.",
        ],
      },
      {
        question: "How far in advance should I book?",
        answer: [
          "If you want to guarantee your preferred date and time, you should look to book at least 4-6 weeks ahead of time in the summer, and 2-4 weeks ahead of time in the off-peak months. If you are more flexible with your timing, feel free to book 2-4 weeks ahead of time in the summer and 1-2 weeks ahead of time in the winter. There are sometimes cancellations, which allow us to fit you in on shorter notice so feel free to ask!",
        ],
      },
    ],
  },
  {
    id: "after-the-move",
    eyebrow: "After The Move",
    title: "After The Move",
    intro:
      "Clear billing and payment answers, so there are no surprises once the move is complete.",
    items: [
      {
        question: "How are billable hours calculated?",
        answer: [
          "At 5-Star Movers, we believe in you only paying for the amount of our time you are actually using. For this reason, we start the clock when the movers arrive at the jobsite and ends when the movers have moved the last item into place. We don't bill for time to and from the headquarters like most other companies do.",
        ],
      },
      {
        question: "How do I pay?",
        answer: ["We accept all forms of credit card payments, as well as cash."],
      },
      {
        question: "Is there a job time minimum?",
        answer: [
          "Yes, we do have a minimum charge of 2 hours regardless of the actual job time. Any time over 2 hours is billed in 15 minute increments, and you will never pay for more time than what you actually use beyond the 2 hour mark.",
        ],
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "FAQ's | 5 Star Movers",
  description:
    "5-Star Movers can help move you and your family in & out of the Minneapolis area.",
};

export default function FaqsPage() {
  return (
    <main className="bg-background text-white">
      <section className="relative overflow-hidden border-b border-white/8 bg-[#121417]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(1,109,99,0.65),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(255,220,0,0.15),transparent_20%),linear-gradient(135deg,#101316_0%,#121417_38%,#032f2b_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
              <p className="flex items-center justify-center gap-3 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00] lg:justify-start">
                <span className="hidden h-px w-12 bg-[#ffdc00] sm:block" />
                FAQ&apos;S
              </p>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[0.95] text-white sm:text-5xl lg:text-7xl">
                Questions,
                <span className="block text-[#8ef0d9]">clearly answered.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-[1.65] text-white/72 lg:text-lg">
                5-Star Movers can help move you and your family in &amp; out of the Minneapolis area.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:mt-10 lg:justify-start">
                {faqSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-full border border-white/12 bg-white/5 px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-white/78 transition-all hover:border-[#ffdc00]/60 hover:bg-[#ffdc00] hover:text-[#121417]"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-4 text-center sm:grid-cols-3 lg:grid-cols-1 lg:text-left">
              <article className="rounded-[1.6rem] border border-[#0db8aa]/25 bg-[#016d63]/20 p-6 backdrop-blur-sm">
                <p className="font-label text-[11px] font-bold uppercase tracking-[0.3em] text-[#8ef0d9]">
                  Policy
                </p>
                <p className="mt-4 font-display text-2xl font-extrabold text-white">
                  Cancellation up to 48 hours free of charge
                </p>
              </article>
              <article className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                <p className="font-label text-[11px] font-bold uppercase tracking-[0.3em] text-[#ffdc00]">
                  Timing
                </p>
                <p className="mt-4 font-display text-2xl font-extrabold text-white">
                  Morning arrival times (7-9am) are guaranteed
                </p>
              </article>
              <article className="rounded-[1.6rem] border border-white/10 bg-black/20 p-6 backdrop-blur-sm">
                <p className="font-label text-[11px] font-bold uppercase tracking-[0.3em] text-[#8ef0d9]">
                  Billing
                </p>
                <p className="mt-4 font-display text-2xl font-extrabold text-white">
                  Minimum charge of 2 hours
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/6 bg-[#0d1215] py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 text-center md:px-8 lg:justify-start lg:text-left">
          <span className="font-label text-[11px] font-bold uppercase tracking-[0.32em] text-white/42">
            Quick Links
          </span>
          {faqSections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                index === 1
                  ? "bg-[#016d63] text-white hover:bg-[#028879]"
                  : "bg-white/6 text-white/72 hover:bg-white/10 hover:text-white"
              }`}
            >
              {section.title}
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[#121417] py-16 md:py-20">
        <div className="mx-auto max-w-7xl space-y-8 px-4 md:px-8">
          {faqSections.map((section, sectionIndex) => (
            <section
              key={section.id}
              id={section.id}
              className={`overflow-hidden rounded-[2rem] border ${
                sectionIndex === 1
                  ? "border-[#016d63]/40 bg-[linear-gradient(135deg,rgba(1,109,99,0.18)_0%,rgba(18,20,23,1)_42%,rgba(18,20,23,1)_100%)]"
                  : "border-white/8 bg-[#171b1f]"
              }`}
            >
              <div className="grid gap-8 px-6 py-8 text-center md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-10 lg:py-10 lg:text-left">
                <div className="mx-auto max-w-xl lg:mx-0">
                  <p className="font-label text-xs font-bold uppercase tracking-[0.35em] text-[#ffdc00]">
                    {section.eyebrow}
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-extrabold text-white md:text-5xl">
                    {section.title}
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-[1.75] text-white/68">
                    {section.intro}
                  </p>
                </div>

                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <details
                      key={item.question}
                      className="group rounded-[1.5rem] border border-white/10 bg-black/10 p-0 open:border-[#ffdc00]/45 open:bg-black/20"
                      open={sectionIndex === 0 && itemIndex === 0}
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left font-display text-xl font-extrabold text-white marker:content-none">
                        <span>{item.question}</span>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[#ffdc00] transition-transform duration-200 group-open:rotate-45">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </summary>
                      <div className="border-t border-white/8 px-6 py-5">
                        <div className="space-y-4 text-base leading-[1.8] text-white/74">
                          {item.answer.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          ))}
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
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/quote"
              className="inline-flex rounded-full bg-[#ffdc00] px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[#121417] transition-all hover:scale-[1.02] hover:bg-[#ffe75a]"
            >
              GET FREE MOVING QUOTE
            </Link>
            <a
              href="tel:6512431993"
              className="inline-flex rounded-full border border-white/20 px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-white transition-colors hover:border-white/50 hover:bg-white/8"
            >
              CALL (651) 243-1993
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
