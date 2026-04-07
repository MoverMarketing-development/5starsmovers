"use client";

/**
 * CookieBanner — GDPR / CCPA compliant consent notice.
 *
 * Consent cookie : _5sm_consent  ("accepted" | "declined")  — 1 year
 * Tracking cookie: _5sm_v  — only set AFTER the user accepts.
 *
 * On "Accept": saves consent + records first visit immediately.
 * On "Decline": saves consent as "declined", visitor cookie is never set.
 * Once a choice is made the banner never shows again.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { recordVisit } from "@/lib/visitor";

const CONSENT_COOKIE = "_5sm_consent";
const ONE_YEAR = 60 * 60 * 24 * 365;

function getConsent(): "accepted" | "declined" | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|; )_5sm_consent=([^;]*)/);
  return m ? (decodeURIComponent(m[1]) as "accepted" | "declined") : null;
}

function saveConsent(value: "accepted" | "declined") {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${ONE_YEAR}; path=/; SameSite=Lax${secure}`;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if no prior consent decision
    if (getConsent() === null) {
      // Small delay so the page renders first
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  function handleAccept() {
    saveConsent("accepted");
    recordVisit(); // start tracking immediately after consent
    setVisible(false);
  }

  function handleDecline() {
    saveConsent("declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className={`
        fixed bottom-0 left-0 right-0 z-[100]
        border-t border-white/[0.07] bg-[#0f1114]/95 backdrop-blur-md
        px-4 py-4 sm:py-5
        transition-transform duration-500
        ${visible ? "translate-y-0" : "translate-y-full"}
      `}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white mb-0.5">
            We use cookies 🍪
          </p>
          <p className="text-xs text-white/50 leading-relaxed">
            We use cookies to remember your preferences and improve your
            experience on return visits. No data is sold or shared with third
            parties.{" "}
            <Link
              href="/privacy-policy"
              className="underline underline-offset-2 hover:text-white/80 transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-white/50 hover:border-white/20 hover:text-white/80 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-[#ffdc00] px-5 py-2 text-xs font-bold text-[#111318] hover:bg-[#ffe75a] transition-colors"
          >
            Accept cookies
          </button>
        </div>
      </div>
    </div>
  );
}
