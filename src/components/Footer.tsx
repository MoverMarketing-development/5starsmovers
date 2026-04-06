import type { ReactNode } from "react";
import Link from "next/link";
import BusinessStatus from "@/components/BusinessStatus";
import { servicePages } from "@/lib/service-pages";

const footerColumns = [
  {
    title: "Moving Services",
    links: servicePages.slice(0, 6).map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    })),
  },
  {
    title: "More Services",
    links: servicePages.slice(6, 12).map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    })),
  },
  {
    title: "Help & FAQs",
    links: [
      { label: "Get a Quote", href: "/quote" },
      { label: "Reviews", href: "/#awards" },
      { label: "Why Choose Us", href: "/#difference" },
      { label: "Moving Supplies", href: "/services/moving-supplies" },
      { label: "Packing Services", href: "/services/packing-services" },
      { label: "Contact Us", href: "tel:6514619202" },
    ],
  },
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
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      {children}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 xl:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-display text-base font-extrabold text-white">{column.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {column.links.map((link) => {
                  const isExternal = link.href.startsWith("http") || link.href.startsWith("tel:");

                  if (isExternal) {
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm leading-[1.5] text-white/62 transition-colors hover:text-[#ffdc00]"
                          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm leading-[1.5] text-white/62 transition-colors hover:text-[#ffdc00]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-display text-base font-extrabold text-white">Working Hours</h3>
            <div className="mt-3">
              <BusinessStatus />
            </div>
            <div className="mt-5 space-y-2.5 text-sm leading-[1.5] text-white/68">
              <div className="flex items-center justify-between gap-4">
                <span>Mon-Fri</span>
                <span className="text-base font-semibold text-white">8 AM-6 PM</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Saturday</span>
                <span className="text-base font-semibold text-white">8 AM-12 PM</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Sunday</span>
                <span className="text-base font-semibold text-white/82">Closed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm leading-[1.5] text-white/52">
            Copyright {new Date().getFullYear()} 5 Star Movers. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-white/68 transition-colors hover:text-[#ffdc00]"
              >
                <SocialIcon>{social.icon}</SocialIcon>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
