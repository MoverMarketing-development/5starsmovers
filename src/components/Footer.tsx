import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import BusinessStatus from "@/components/BusinessStatus";

const movingAreas = [
  { label: "Minneapolis", href: "/areas/minneapolis" },
  { label: "St. Paul", href: "/areas/st-paul" },
  { label: "Bloomington", href: "/areas/bloomington" },
  { label: "Eden Prairie", href: "/areas/eden-prairie" },
  { label: "Maple Grove", href: "/areas/maple-grove" },
  { label: "Plymouth", href: "/areas/plymouth" },
];

const movingServices = [
  { label: "Residential Moving", href: "/services/residential-moving" },
  { label: "Long Distance Moving", href: "/services/long-distance-moving" },
  { label: "Commercial Moving", href: "/services/commercial-moving" },
  { label: "Loading & Unloading", href: "/services/loading-unloading" },
  { label: "Storage", href: "/services/storage" },
  { label: "Packing Services", href: "/services/packing-services" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "http://facebook.com/5StarMoversOfMN",
    icon: (
      <path d="M14 8h2V4h-2.5C10.46 4 9 5.79 9 8.72V11H6v4h3v5h4v-5h3.05l.45-4H13V9.02C13 8.4 13.33 8 14 8Z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/5starmovers",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

function SocialIcon({ children }: { children: ReactNode }) {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group/link inline-flex items-center gap-2 text-sm font-medium leading-[1.5] text-white/62 outline-none transition-colors hover:text-white focus-visible:text-white"
    >
      <span className="h-px w-0 bg-[#ffdc00] transition-all duration-200 group-hover/link:w-3 group-focus-visible/link:w-3" />
      <span className="underline-offset-4 group-hover/link:underline">{children}</span>
    </Link>
  );
}

function MovingChecklistCard({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-[17rem] rounded-lg border border-white/10 bg-black/25 p-4 text-left ${className}`}>
      <p className="font-label text-[10px] font-bold uppercase tracking-[0.28em] text-[#ffdc00]">
        Download Guide
      </p>
      <p className="mt-3 text-sm font-semibold leading-[1.5] text-white/58">
        Download the printable PDF before your move.
      </p>
      <a
        href="https://irp.cdn-website.com/21612567/files/uploaded/5+STAR+MOVERS+-+CHECKLIST+%282%29.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download
        className="cta-sheen mt-5 inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#121417] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#ffdc00]/35"
      >
        Moving Checklist
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#121417] text-white" aria-labelledby="site-footer-title">
      <h2 id="site-footer-title" className="sr-only">
        Site footer
      </h2>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8 lg:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-10 text-center sm:text-left md:grid-cols-2 xl:grid-cols-[1.1fr_0.95fr_1.05fr_1.1fr] xl:gap-12">
          <section className="order-1 flex flex-col items-center sm:items-start md:order-none" aria-labelledby="footer-brand">
            <h3 id="footer-brand" className="sr-only">
              Brand and contact
            </h3>
            <Link href="/" className="group inline-flex" aria-label="5 Star Movers home">
              <Image
                src="/logo.webp"
                alt="5 Star Movers"
                width={192}
                height={48}
                className="transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>

            <div className="mt-7">
              <p className="font-label text-[11px] font-bold uppercase tracking-[0.3em] text-[#ffdc00]">
                Call Us Now
              </p>
              <a
                href="tel:6514619202"
                className="mt-2 block font-display text-2xl font-extrabold tracking-tight text-white transition-colors hover:text-[#ffdc00] focus-visible:text-[#ffdc00] focus-visible:outline-none"
              >
                (651) 461-9202
              </a>
            </div>

            <MovingChecklistCard className="mt-6 hidden md:block" />
          </section>

          <nav aria-labelledby="footer-areas" className="order-3 md:order-none">
            <h3 id="footer-areas" className="font-display text-xl font-extrabold tracking-tight text-white">
              Moving Areas
            </h3>
            <ul className="mt-6 grid gap-3">
              {movingAreas.map((area) => (
                <li key={area.label}>
                  <FooterLink href={area.href}>{area.label}</FooterLink>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/areas"
                  className="group inline-flex items-center gap-2 font-display text-sm font-extrabold text-[#ffdc00] transition-colors hover:text-[#ffe75a] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#ffdc00]/30"
                >
                  View All Areas
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                    -&gt;
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-services" className="order-4 md:order-none">
            <h3 id="footer-services" className="font-display text-xl font-extrabold tracking-tight text-white">
              Moving Services
            </h3>
            <ul className="mt-6 grid gap-3">
              {movingServices.map((service) => (
                <li key={service.label}>
                  <FooterLink href={service.href}>{service.label}</FooterLink>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/#services"
                  className="group inline-flex items-center gap-2 font-display text-sm font-extrabold text-[#ffdc00] transition-colors hover:text-[#ffe75a] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#ffdc00]/30"
                >
                  View All Services
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                    -&gt;
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          <section aria-labelledby="footer-hours" className="order-2 flex flex-col items-center sm:items-start md:order-none">
            <h3 id="footer-hours" className="font-display text-xl font-extrabold tracking-tight text-white">
              Business Hours
            </h3>

            <div className="mt-6 inline-flex rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2">
              <BusinessStatus />
            </div>

            <dl className="mt-6 grid w-full max-w-[19rem] gap-5 text-sm leading-[1.5] text-white/68">
              <div>
                <dt>Monday - Saturday</dt>
                <dd className="mt-1 font-display text-xl font-extrabold text-white">8:00 AM - 6:30 PM</dd>
              </div>
              <div>
                <dt>Sunday</dt>
                <dd className="mt-1 font-display text-xl font-extrabold text-white">9:00 AM - 5:00 PM</dd>
              </div>
            </dl>

            <div className="mt-7 flex items-center gap-3" aria-label="Social media">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-white/78 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ffdc00]/40 hover:bg-[#ffdc00] hover:text-[#121417] focus-visible:border-[#ffdc00] focus-visible:text-[#ffdc00] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#ffdc00]/30"
                >
                  <SocialIcon>{social.icon}</SocialIcon>
                </a>
              ))}
            </div>
          </section>
        </div>

        <MovingChecklistCard className="mx-auto mt-8 md:hidden" />

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-center text-sm leading-[1.5] text-white/52 lg:flex-row lg:text-left">
          <p>
            Copyright {new Date().getFullYear()} 5 Star Movers. All rights reserved.
          </p>
          <Link href="/privacy-policy" className="text-white/72 underline-offset-4 transition-colors hover:text-[#ffdc00] hover:underline focus-visible:text-[#ffdc00] focus-visible:outline-none">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
