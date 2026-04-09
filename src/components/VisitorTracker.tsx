"use client";

/**
 * VisitorTracker — mounts once per page load.
 *
 * Records the visit in the _5sm_v cookie and, for returning visitors,
 * shows a small toast notification after a short delay.
 *
 * SEO benefits:
 *  1. Returning-visitor personalisation reduces bounce rate.
 *  2. Social-proof copy ("Trusted by thousands in Minnesota") increases
 *     click-through from the notification to interior pages.
 *  3. Persistent cookie means we can surface targeted CTAs without
 *     re-annoying first-time visitors.
 */

import { useEffect, useState } from "react";
import { recordVisit } from "@/lib/visitor";

function hasConsent(): boolean {
  if (typeof document === "undefined") return false;
  return /(?:^|; )_5sm_consent=accepted/.test(document.cookie);
}

export default function VisitorTracker() {
  const [show, setShow] = useState(false);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Only track if the user has explicitly accepted cookies
    if (!hasConsent()) return;

    const data = recordVisit();

    // Only show the toast for returning visitors (visit 2+)
    if (data.c >= 2) {
      const timer = setTimeout(() => {
        setVisitCount(data.c);
        setShow(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  const isFrequentVisitor = visitCount >= 5;
  const message =
    isFrequentVisitor
      ? "Great to see you again! Ready for a stress-free move?"
      : "Welcome back! Get your free quote in 60 seconds.";
  const mobileMessage = isFrequentVisitor
    ? "Ready for a stress-free move?"
    : "Get your free quote in 60 seconds.";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        fixed bottom-4 left-3 right-3 z-50 w-auto
        rounded-[1.75rem] border border-white/10 bg-[#111318]/95 px-4 py-3 shadow-2xl backdrop-blur-md
        sm:bottom-6 sm:left-1/2 sm:right-auto sm:w-[calc(100%-1.5rem)] sm:max-w-xl sm:-translate-x-1/2 sm:rounded-full sm:px-5
        transition-all duration-500
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <div className="flex items-start gap-3 sm:items-center">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffdc00] text-[#111318] sm:mt-0">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="m12 3 2.7 5.47 6.04.88-4.37 4.26 1.03 6.02L12 16.77 6.6 19.63l1.03-6.02L3.26 9.35l6.04-.88L12 3Z" />
          </svg>
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-[1.45] text-white/88 sm:hidden">
            {mobileMessage}
          </p>
          <p className="hidden text-sm font-semibold leading-[1.45] text-white/88 sm:whitespace-nowrap sm:block">
            {message}
          </p>
          <div className="mt-3 flex items-center gap-2 sm:hidden">
            <a
              href="/quote"
              className="rounded-full bg-[#ffdc00] px-4 py-2 text-xs font-bold text-[#111318] transition-colors hover:bg-[#ffe75a]"
            >
              Get Quote
            </a>
            <button
              onClick={() => setShow(false)}
              aria-label="Dismiss"
              className="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-white/50 transition-colors hover:text-white/75"
            >
              Close
            </button>
          </div>
        </div>

        <a
          href="/quote"
          className="hidden shrink-0 rounded-full bg-[#ffdc00] px-3.5 py-1.5 text-xs font-bold text-[#111318] transition-colors hover:bg-[#ffe75a] sm:inline-flex"
        >
          Get Quote
        </a>

        <button
          onClick={() => setShow(false)}
          aria-label="Dismiss"
          className="hidden shrink-0 rounded-full p-1 text-white/30 transition-colors hover:text-white/60 sm:inline-flex"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
