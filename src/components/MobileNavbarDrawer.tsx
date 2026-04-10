"use client";

import Link from "next/link";
import { areaPages } from "@/lib/area-pages";
import { servicePages } from "@/lib/service-pages";

const navItems = [{ label: "Blog", homeHref: "/blog", fallbackHref: "/blog" }];

const aboutLinks = [
  { label: "FAQ's", href: "/faqs" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Careers", href: "/careers" },
];

export default function MobileNavbarDrawer({
  isHome,
  mobileMenuOpen,
  mobileSection,
  onToggleSection,
  onClose,
}: {
  isHome: boolean;
  mobileMenuOpen: boolean;
  mobileSection: "services" | "areas" | "about" | null;
  onToggleSection: (section: "services" | "areas" | "about") => void;
  onClose: () => void;
}) {
  return (
    <div className={`border-t border-white/5 bg-[#171b20] md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-col gap-2">
          <button type="button" className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left font-display text-sm font-bold text-white" onClick={() => onToggleSection("services")}>
            <span>Services</span>
            <svg className={`h-4 w-4 transition-transform ${mobileSection === "services" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" /></svg>
          </button>
          {mobileSection === "services" ? (
            <div className="grid gap-2 rounded-2xl border border-white/8 bg-[#1e242b] p-3">
              {servicePages.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-xl px-3 py-2 text-sm text-white/72 transition-colors hover:bg-white/[0.05] hover:text-white" onClick={onClose}>
                  {service.title}
                </Link>
              ))}
            </div>
          ) : null}

          <button type="button" className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left font-display text-sm font-bold text-white" onClick={() => onToggleSection("areas")}>
            <span>Areas</span>
            <svg className={`h-4 w-4 transition-transform ${mobileSection === "areas" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" /></svg>
          </button>
          {mobileSection === "areas" ? (
            <div className="grid gap-2 rounded-2xl border border-white/8 bg-[#1e242b] p-3">
              <Link href="/areas" className="rounded-xl px-3 py-2 text-sm font-semibold text-[#ffdc00] transition-colors hover:bg-white/[0.05]" onClick={onClose}>
                View all areas
              </Link>
              {areaPages.map((area) => (
                <Link key={area.slug} href={`/areas/${area.slug}`} className="rounded-xl px-3 py-2 text-sm text-white/72 transition-colors hover:bg-white/[0.05] hover:text-white" onClick={onClose}>
                  {area.city}
                </Link>
              ))}
            </div>
          ) : null}

          <button type="button" className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left font-display text-sm font-bold text-white" onClick={() => onToggleSection("about")}>
            <span>About Us</span>
            <svg className={`h-4 w-4 transition-transform ${mobileSection === "about" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" /></svg>
          </button>
          {mobileSection === "about" ? (
            <div className="grid gap-2 rounded-2xl border border-white/8 bg-[#1e242b] p-3">
              <Link href="/about-us" className="rounded-xl px-3 py-2 text-sm text-white/72 transition-colors hover:bg-white/[0.05] hover:text-white" onClick={onClose}>
                About Us
              </Link>
              {aboutLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 text-sm text-white/72 transition-colors hover:bg-white/[0.05] hover:text-white" onClick={onClose}>
                  {item.label}
                </Link>
              ))}
            </div>
          ) : null}

          {navItems.map((item) => {
            const href = isHome ? item.homeHref : item.fallbackHref;
            return (
              <Link key={item.label} href={href} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 font-display text-sm font-bold text-white" onClick={onClose}>
                {item.label}
              </Link>
            );
          })}

          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <a href="tel:6514619202" className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-white">
              Call (651) 461-9202
            </a>
            <Link href="/quote" className="cta-sheen inline-flex items-center justify-center rounded-full px-5 py-3 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-[#121417]" onClick={onClose}>
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
