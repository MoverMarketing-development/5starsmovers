"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { areaGroups, areaPages } from "@/lib/area-pages";
import { servicePages } from "@/lib/service-pages";

type IconName =
  | "phone"
  | "star"
  | "home"
  | "route"
  | "building"
  | "box"
  | "heart"
  | "package"
  | "apartment"
  | "squares"
  | "warehouse"
  | "sparkles"
  | "shield"
  | "trash"
  | "location";

function Icon({ name, className }: { name: IconName; className?: string }) {
  const shared = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "phone":
      return (
        <svg {...shared}>
          <path d="M5 4h4l1 4-2 2a16 16 0 0 0 6 6l2-2 4 1v4c0 1-1 2-2 2C10.82 21 3 13.18 3 6c0-1 1-2 2-2Z" />
        </svg>
      );
    case "star":
      return (
        <svg {...shared}>
          <path d="m12 3 2.7 5.47 6.04.88-4.37 4.26 1.03 6.02L12 16.77 6.6 19.63l1.03-6.02L3.26 9.35l6.04-.88L12 3Z" />
        </svg>
      );
    case "home":
      return (
        <svg {...shared}>
          <path d="M4 10.5 12 4l8 6.5V20H4v-9.5Z" />
          <path d="M9 20v-5h6v5" />
        </svg>
      );
    case "route":
      return (
        <svg {...shared}>
          <path d="M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M8 17h3a4 4 0 0 0 4-4V9" />
          <path d="M15 9h1" />
        </svg>
      );
    case "building":
      return (
        <svg {...shared}>
          <path d="M4 20V6l8-2 8 2v14" />
          <path d="M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" />
        </svg>
      );
    case "box":
      return (
        <svg {...shared}>
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="M12 12 4 7.5M12 12l8-4.5M12 12v9" />
        </svg>
      );
    case "heart":
      return (
        <svg {...shared}>
          <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" />
        </svg>
      );
    case "package":
      return (
        <svg {...shared}>
          <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
          <path d="M4 7.5V16.5L12 21l8-4.5V7.5" />
          <path d="M12 12v9" />
        </svg>
      );
    case "apartment":
      return (
        <svg {...shared}>
          <path d="M6 20V5h12v15" />
          <path d="M9 8h.01M12 8h.01M15 8h.01M9 12h.01M12 12h.01M15 12h.01M11 20v-4h2v4" />
        </svg>
      );
    case "squares":
      return (
        <svg {...shared}>
          <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
        </svg>
      );
    case "warehouse":
      return (
        <svg {...shared}>
          <path d="m3 10 9-6 9 6v10H3V10Z" />
          <path d="M7 14h10M7 17h10" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...shared}>
          <path d="m12 3 1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4L12 3ZM18.5 14l.82 2.18L21.5 17l-2.18.82L18.5 20l-.82-2.18L15.5 17l2.18-.82L18.5 14ZM6 14l.82 2.18L9 17l-2.18.82L6 20l-.82-2.18L3 17l2.18-.82L6 14Z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...shared}>
          <path d="M12 3 5 6v5c0 5 3.5 8.5 7 10 3.5-1.5 7-5 7-10V6l-7-3Z" />
        </svg>
      );
    case "trash":
      return (
        <svg {...shared}>
          <path d="M4 7h16" />
          <path d="M9 7V4h6v3" />
          <path d="M7 7l1 13h8l1-13" />
        </svg>
      );
    case "location":
      return (
        <svg {...shared}>
          <path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z" />
          <path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
        </svg>
      );
    default:
      return null;
  }
}

const navItems = [
  { label: "Blog", homeHref: "/blog", fallbackHref: "/blog" },
];

const aboutLinks = [
  {
    label: "FAQ's",
    href: "/faqs",
    description: "Answers to the most common moving questions.",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
    description: "Email, phone, and office details for 5 Star Movers.",
  },
  {
    label: "Careers",
    href: "/careers",
    description: "Job application details and the careers form.",
  },
];

const serviceGroups = [
  {
    title: "Moving Core",
    description: "Most-requested moving services.",
    items: servicePages.slice(0, 4),
  },
  {
    title: "Specialized Support",
    description: "Tailored help for more specific needs.",
    items: servicePages.slice(4, 8),
  },
  {
    title: "Premium & Extra Services",
    description: "Higher-care and add-on service options.",
    items: servicePages.slice(8, 12),
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [openMenu, setOpenMenu] = useState<"services" | "areas" | "about" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<"services" | "areas" | "about" | null>(null);
  const trustIndexRef = useRef<HTMLDivElement | null>(null);
  const previousPathnameRef = useRef(pathname);
  const servicesOpen = openMenu === "services";
  const areasOpen = openMenu === "areas";
  const aboutOpen = openMenu === "about";

  useEffect(() => {
    trustIndexRef.current?.setAttribute(
      "src",
      "https://cdn.trustindex.io/loader.js?26de95268d12962a4e96fbdb281",
    );
  }, []);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) {
      return;
    }

    previousPathnameRef.current = pathname;

    if (window.innerWidth < 1024) {
      return;
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();

    const frame = window.requestAnimationFrame(scrollToTop);

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

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
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hidden border-b border-white/5 bg-[#121417] px-4 py-2 text-[13px] md:block">
        <div className="mx-auto grid max-w-7xl items-center gap-4 md:grid-cols-[1fr_auto_1fr] md:px-8">
          <p className="hidden justify-self-start text-white/[0.65] md:block">
            Premium Moving Services in Minnesota
          </p>
          <div className="flex min-h-8 items-center justify-center">
            <Script
              id="trustindex-widget-loader"
              src="https://cdn.trustindex.io/loader.js"
              strategy="afterInteractive"
            />
            <div
              ref={trustIndexRef}
              className="trustindex-widget mx-auto"
            />
          </div>
          <a
            href="tel:6514619202"
            className="justify-self-end flex items-center justify-end gap-2 font-semibold text-white hover:text-[#ffdc00]"
          >
            <Icon name="phone" className="h-4 w-4 text-[#ffdc00]" />
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
              setOpenMenu(null);
              setMobileMenuOpen(false);
              setMobileSection(null);
            }}
          >
            <Image
              src="/logo.webp"
              alt="5 Star Movers logo"
              width={192}
              height={48}
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-[1.03] md:h-12"
            />
          </Link>

          <div className="hidden items-center gap-8 font-display text-sm font-bold md:flex">
            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("services")}
            >
              <Link
                href={isHome ? "#services" : "/#services"}
                className={`inline-flex items-center gap-2 ${servicesOpen ? "text-white" : "text-white/70 hover:text-white"}`}
                onClick={() => setOpenMenu(null)}
              >
                Services
                <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </Link>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("areas")}
            >
              <Link
                href="/areas"
                className={`inline-flex items-center gap-2 ${areasOpen ? "text-white" : "text-white/70 hover:text-white"}`}
                onClick={() => setOpenMenu(null)}
              >
                Areas
                <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${areasOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </Link>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("about")}
            >
              <Link
                href="/about-us"
                className={`inline-flex items-center gap-2 ${aboutOpen ? "text-white" : "text-white/70 hover:text-white"}`}
                onClick={() => setOpenMenu(null)}
              >
                About Us
                <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </Link>
            </div>

            {navItems.map((item) => {
              const href = isHome ? item.homeHref : item.fallbackHref;
              const active = isHome && item.label === "Home";

              return (
                <Link
                  key={item.label}
                  href={href}
                  className={active ? "text-[#ffdc00]" : "text-white/70 hover:text-white"}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

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

        <div className={`border-t border-white/5 bg-[#171b20] md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left font-display text-sm font-bold text-white"
                onClick={() => setMobileSection((current) => current === "services" ? null : "services")}
              >
                <span>Services</span>
                <svg className={`h-4 w-4 transition-transform ${mobileSection === "services" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {mobileSection === "services" ? (
                <div className="grid gap-2 rounded-2xl border border-white/8 bg-[#1e242b] p-3">
                  {servicePages.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="rounded-xl px-3 py-2 text-sm text-white/72 transition-colors hover:bg-white/[0.05] hover:text-white"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileSection(null);
                      }}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              ) : null}

              <button
                type="button"
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left font-display text-sm font-bold text-white"
                onClick={() => setMobileSection((current) => current === "areas" ? null : "areas")}
              >
                <span>Areas</span>
                <svg className={`h-4 w-4 transition-transform ${mobileSection === "areas" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {mobileSection === "areas" ? (
                <div className="grid gap-2 rounded-2xl border border-white/8 bg-[#1e242b] p-3">
                  <Link
                    href="/areas"
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-[#ffdc00] transition-colors hover:bg-white/[0.05]"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileSection(null);
                    }}
                  >
                    View all areas
                  </Link>
                  {areaPages.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/areas/${area.slug}`}
                      className="rounded-xl px-3 py-2 text-sm text-white/72 transition-colors hover:bg-white/[0.05] hover:text-white"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileSection(null);
                      }}
                    >
                      {area.city}
                    </Link>
                  ))}
                </div>
              ) : null}

              <button
                type="button"
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left font-display text-sm font-bold text-white"
                onClick={() => setMobileSection((current) => current === "about" ? null : "about")}
              >
                <span>About Us</span>
                <svg className={`h-4 w-4 transition-transform ${mobileSection === "about" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {mobileSection === "about" ? (
                <div className="grid gap-2 rounded-2xl border border-white/8 bg-[#1e242b] p-3">
                  <Link
                    href="/about-us"
                    className="rounded-xl px-3 py-2 text-sm text-white/72 transition-colors hover:bg-white/[0.05] hover:text-white"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileSection(null);
                    }}
                  >
                    About Us
                  </Link>
                  {aboutLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-xl px-3 py-2 text-sm text-white/72 transition-colors hover:bg-white/[0.05] hover:text-white"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileSection(null);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}

              {navItems.map((item) => {
                const href = isHome ? item.homeHref : item.fallbackHref;

                return (
                  <Link
                    key={item.label}
                    href={href}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 font-display text-sm font-bold text-white"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileSection(null);
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <a
                  href="tel:6514619202"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-white"
                >
                  Call (651) 461-9202
                </a>
                <Link
                  href="/quote"
                  className="cta-sheen inline-flex items-center justify-center rounded-full px-5 py-3 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-[#121417]"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileSection(null);
                  }}
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-x-0 top-full hidden transition-all duration-200 md:block ${
            servicesOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
          onMouseEnter={() => setOpenMenu("services")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="border-y border-[#2f353c] bg-[#1b2027] shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
              <div className="mb-5 flex items-end justify-between gap-6 border-b border-white/8 pb-5">
                <div>
                  <div className="font-label text-[11px] font-bold uppercase tracking-[0.32em] text-[#ffdc00]">
                    Moving Services
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-extrabold text-white">
                    Explore all 12 services
                  </h3>
                </div>
                <Link
                  href={isHome ? "#services" : "/#services"}
                  className="text-sm font-semibold text-[#ffdc00] hover:text-[#ffe75a]"
                  onClick={() => setOpenMenu(null)}
                >
                  View home section
                </Link>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {serviceGroups.map((group) => (
                  <div key={group.title} className="rounded-[1.4rem] border border-[#303844] bg-[#20262e] p-4">
                    <div className="font-display text-base font-extrabold text-white">
                      {group.title}
                    </div>
                    <p className="mt-1 text-xs leading-[1.5] text-white/[0.5]">
                      {group.description}
                    </p>

                    <div className="mt-4 grid gap-1.5">
                      {group.items.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="group/item rounded-xl px-3 py-2.5 transition-colors hover:bg-[#2a313b]"
                          onClick={() => setOpenMenu(null)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#3a4450] bg-[#161b22] text-[#ffdc00] transition-colors group-hover/item:border-[#ffdc00]/30 group-hover/item:bg-[#1d232c]">
                                <Icon name={service.icon} className="h-4.5 w-4.5" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white/78 transition-colors group-hover/item:text-white">
                                  {service.title}
                                </div>
                                <div className="mt-0.5 text-xs leading-[1.45] text-white/[0.46]">
                                  {service.description}
                                </div>
                              </div>
                            </div>
                            <span className="pt-0.5 text-[#ffdc00] opacity-0 transition-opacity group-hover/item:opacity-100">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="m13 6 6 6-6 6" />
                              </svg>
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-x-0 top-full hidden transition-all duration-200 md:block ${
            aboutOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
          onMouseEnter={() => setOpenMenu("about")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="border-y border-[#2f353c] bg-[#1b2027] shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
              <div className="mb-5 flex items-end justify-between gap-6 border-b border-white/8 pb-5">
                <div>
                  <div className="font-label text-[11px] font-bold uppercase tracking-[0.32em] text-[#ffdc00]">
                    About 5 Star Movers
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-extrabold text-white">
                    Learn more about the company
                  </h3>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {aboutLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group/item rounded-[1.4rem] border border-[#303844] bg-[#20262e] p-5 transition-colors hover:bg-[#2a313b]"
                    onClick={() => setOpenMenu(null)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-display text-lg font-extrabold text-white">
                          {item.label}
                        </div>
                        <p className="mt-2 max-w-sm text-sm leading-[1.6] text-white/[0.56]">
                          {item.description}
                        </p>
                      </div>
                      <span className="pt-1 text-[#ffdc00] opacity-0 transition-opacity group-hover/item:opacity-100">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="m13 6 6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-x-0 top-full hidden transition-all duration-200 md:block ${
            areasOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
          onMouseEnter={() => setOpenMenu("areas")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="border-y border-[#2f353c] bg-[#1b2027] shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
              <div className="mb-5 flex items-end justify-between gap-6 border-b border-white/8 pb-5">
                <div>
                  <div className="font-label text-[11px] font-bold uppercase tracking-[0.32em] text-[#ffdc00]">
                    Service Areas
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-extrabold text-white">
                    Explore all {areaPages.length} cities
                  </h3>
                </div>
                <Link
                  href="/areas"
                  className="text-sm font-semibold text-[#ffdc00] hover:text-[#ffe75a]"
                  onClick={() => setOpenMenu(null)}
                >
                  Open areas page
                </Link>
              </div>

              <div className="grid gap-4 xl:grid-cols-4">
                {areaGroups.map((group) => (
                  <div key={group.title} className="rounded-[1.4rem] border border-[#303844] bg-[#20262e] p-4">
                    <div className="font-display text-base font-extrabold text-white">
                      {group.title}
                    </div>
                    <p className="mt-1 text-xs leading-[1.5] text-white/[0.5]">
                      {group.description}
                    </p>

                    <div className="mt-4 grid gap-1.5">
                      {group.items.map((area) => (
                        <Link
                          key={area.slug}
                          href={`/areas/${area.slug}`}
                          className="group/item rounded-xl px-3 py-2.5 transition-colors hover:bg-[#2a313b]"
                          onClick={() => setOpenMenu(null)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#3a4450] bg-[#161b22] text-[#ffdc00] transition-colors group-hover/item:border-[#ffdc00]/30 group-hover/item:bg-[#1d232c]">
                                <Icon name="location" className="h-4.5 w-4.5" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white/78 transition-colors group-hover/item:text-white">
                                  {area.city}
                                </div>
                                <div className="mt-0.5 text-xs leading-[1.45] text-white/[0.46]">
                                  {area.state}
                                </div>
                              </div>
                            </div>
                            <span className="pt-0.5 text-[#ffdc00] opacity-0 transition-opacity group-hover/item:opacity-100">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="m13 6 6 6-6 6" />
                              </svg>
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
