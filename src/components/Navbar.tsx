"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const TrustIndexWidget = dynamic(() => import("@/components/TrustIndexWidget"), {
  ssr: false,
});

const DesktopNavbarMenus = dynamic(() => import("@/components/DesktopNavbarMenus"));
const MobileNavbarDrawer = dynamic(() => import("@/components/MobileNavbarDrawer"));

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<"services" | "areas" | "about" | null>(null);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky inset-x-0 top-0 z-50">
      <div className="hidden border-b border-white/5 bg-[#121417] px-4 py-2 text-[13px] md:block">
        <div className="mx-auto grid max-w-7xl items-center gap-4 md:grid-cols-[1fr_auto_1fr] md:px-8">
          <p className="hidden justify-self-start text-white/[0.65] md:block">
            Premium Moving Services in Minnesota
          </p>
          <div className="flex min-h-8 items-center justify-center">
            <TrustIndexWidget />
          </div>
          <a
            href="tel:6514619202"
            className="justify-self-end flex items-center justify-end gap-2 font-semibold text-white hover:text-[#ffdc00]"
          >
            <svg className="h-4 w-4 text-[#ffdc00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 4h4l1 4-2 2a16 16 0 0 0 6 6l2-2 4 1v4c0 1-1 2-2 2C10.82 21 3 13.18 3 6c0-1 1-2 2-2Z" />
            </svg>
            (651) 461-9202
          </a>
        </div>
      </div>

      <nav className="glass-panel relative border-b border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:gap-6 md:px-8 md:py-4">
          <Link
            href="/"
            className="group flex items-center"
            onClick={() => {
              setMobileMenuOpen(false);
              setMobileSection(null);
            }}
          >
            <Image
              src="/logo.webp"
              alt="5 Star Movers logo"
              width={192}
              height={48}
              preload
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-[1.03] md:h-12"
              style={{ width: "auto" }}
            />
          </Link>

          <DesktopNavbarMenus />

          <Link
            href="/quote"
            className="cta-sheen hidden rounded-full px-5 py-2.5 font-display text-xs font-extrabold uppercase tracking-[0.24em] text-[#121417] sm:inline-flex"
          >
            Get a Quote
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white md:hidden"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen ? (
          <MobileNavbarDrawer
            isHome={isHome}
            mobileMenuOpen={mobileMenuOpen}
            mobileSection={mobileSection}
            onToggleSection={(section) => setMobileSection((current) => current === section ? null : section)}
            onClose={() => {
              setMobileMenuOpen(false);
              setMobileSection(null);
            }}
          />
        ) : null}
      </nav>
    </header>
  );
}
