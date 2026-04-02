"use client";

import { useState } from "react";
import { StarIcon, PhoneCheckIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";

const services = [
  "Residential Moving",
  "Long Distance Moving",
  "Commercial Moving",
  "Loading & Unloading",
  "Senior Moving",
  "Packing Services",
  "Apartment Moving",
  "Moving Supplies",
  "Storage",
  "White Glove Moving",
  "Specialty Moving",
  "Junk Removal",
];

const about = ["FAQs", "Contact", "Careers"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#343a40]/95 backdrop-blur-sm border-b border-white/10">
      {/* Top bar */}
      <div className="bg-[#006e63] py-1.5 px-4 text-center text-sm font-semibold text-white">
        <a href="tel:6512431993" className="inline-flex items-center gap-2 hover:underline">
          <Icon icon={PhoneCheckIcon} size={16} />
          Call us today: (651) 243-1993 — Free Quotes, Upfront Pricing
        </a>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ffd700]">
            <Icon icon={StarIcon} size={18} color="#343a40" />
          </div>
          <div className="leading-tight">
            <span className="block text-white font-bold text-lg tracking-tight leading-none">5 Star</span>
            <span className="block text-[#ffd700] text-xs font-semibold tracking-widest uppercase leading-none">Movers</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* About Us dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("about")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="px-4 py-2 text-white/90 hover:text-[#ffd700] text-sm font-medium transition-colors flex items-center gap-1">
              About Us
              <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {activeDropdown === "about" && (
              <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-2xl py-2 mt-1 border border-gray-100">
                {about.map((item) => (
                  <a key={item} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#006e63]/10 hover:text-[#006e63] transition-colors font-medium">
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="px-4 py-2 text-white/90 hover:text-[#ffd700] text-sm font-medium transition-colors flex items-center gap-1">
              Moving Services
              <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {activeDropdown === "services" && (
              <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-2xl py-2 mt-1 border border-gray-100">
                {services.map((item) => (
                  <a key={item} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#006e63]/10 hover:text-[#006e63] transition-colors font-medium">
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="#" className="px-4 py-2 text-white/90 hover:text-[#ffd700] text-sm font-medium transition-colors">
            Areas We Serve
          </a>
          <a href="#" className="px-4 py-2 text-white/90 hover:text-[#ffd700] text-sm font-medium transition-colors">
            Blog
          </a>
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:6512431993" className="text-white/80 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5">
            <Icon icon={PhoneCheckIcon} size={16} color="#ffd700" />
            (651) 243-1993
          </a>
          <Button
            size="sm"
            className="bg-[#e24436] text-white hover:bg-[#e24436]/90 font-semibold rounded-full px-5"
          >
            Get Free Quote
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#343a40] border-t border-white/10 px-4 py-4 space-y-1">
          <a href="#" className="block py-2 text-white/90 font-medium">About Us</a>
          <div className="pl-4 space-y-1">
            {about.map((item) => (
              <a key={item} href="#" className="block py-1.5 text-white/60 text-sm hover:text-[#ffd700]">{item}</a>
            ))}
          </div>
          <a href="#" className="block py-2 text-white/90 font-medium">Moving Services</a>
          <div className="pl-4 space-y-1">
            {services.map((item) => (
              <a key={item} href="#" className="block py-1.5 text-white/60 text-sm hover:text-[#ffd700]">{item}</a>
            ))}
          </div>
          <a href="#" className="block py-2 text-white/90 font-medium">Areas We Serve</a>
          <a href="#" className="block py-2 text-white/90 font-medium">Blog</a>
          <div className="pt-3">
            <Button className="w-full bg-[#e24436] text-white hover:bg-[#e24436]/90 font-semibold rounded-full">
              Get Free Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
