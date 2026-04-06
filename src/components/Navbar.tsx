"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type IconName = "phone" | "star";

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
    default:
      return null;
  }
}

const navItems = [
  { label: "Home", homeHref: "#home", fallbackHref: "/" },
  { label: "Services", homeHref: "#services", fallbackHref: "/#services" },
  { label: "Reviews", homeHref: "#awards", fallbackHref: "/#awards" },
  { label: "Why Us", homeHref: "#difference", fallbackHref: "/#difference" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/5 bg-[#121417] px-4 py-2 text-[13px]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 md:px-4">
          <p className="hidden text-white/[0.65] md:block">
            Premium Moving Services in Minnesota
          </p>
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="flex text-[#ffdc00]">
              {[...Array(5)].map((_, index) => (
                <Icon key={index} name="star" className="h-3.5 w-3.5" />
              ))}
            </span>
            <span className="font-semibold text-white">199 reviews</span>
          </div>
          <a
            href="tel:6514619202"
            className="flex items-center gap-2 font-semibold text-white hover:text-[#ffdc00]"
          >
            <Icon name="phone" className="h-4 w-4 text-[#ffdc00]" />
            (651) 461-9202
          </a>
        </div>
      </div>

      <nav className="glass-panel border-b border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-8">
          <Link href="/" className="group flex items-center">
            <Image
              src="/logo.webp"
              alt="5 Star Movers logo"
              width={192}
              height={48}
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </Link>

          <div className="hidden items-center gap-8 font-display text-sm font-bold md:flex">
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
            className="cta-sheen inline-flex rounded-full px-5 py-2.5 font-display text-xs font-extrabold uppercase tracking-[0.24em] text-[#121417]"
          >
            Get a Quote
          </Link>
        </div>
      </nav>
    </header>
  );
}
