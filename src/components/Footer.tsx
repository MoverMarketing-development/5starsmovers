import { StarIcon, PhoneCheckIcon, MapPinIcon, MapsLocation01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/Icon";

const serviceLinks = [
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

const aboutLinks = [
  { label: "About Us", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Areas We Serve", href: "#" },
  { label: "Blog", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#343a40] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ffd700]">
                <Icon icon={StarIcon} size={20} color="#343a40" />
              </div>
              <div className="leading-tight">
                <span className="block text-white font-bold text-xl tracking-tight leading-none">5 Star</span>
                <span className="block text-[#ffd700] text-xs font-semibold tracking-widest uppercase leading-none">Movers</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Minnesota&apos;s most trusted local movers. We handle residential and commercial moves
              with care, efficiency, and professionalism across the Twin Cities metro and all of
              Minnesota.
            </p>

            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/5StarMoversOfMN"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#006e63] flex items-center justify-center transition-colors group"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/5starmovers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#006e63] flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-5 tracking-tight">Moving Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a href="#" className="text-white/55 hover:text-[#ffd700] text-sm transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-5 tracking-tight">Company</h4>
            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/55 hover:text-[#ffd700] text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-5 tracking-tight">Get in Touch</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:6512431993" className="flex items-start gap-3 group">
                  <Icon icon={PhoneCheckIcon} size={18} color="#ffd700" />
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Phone</div>
                    <span className="text-white/80 group-hover:text-white text-sm font-medium transition-colors">
                      (651) 243-1993
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <Icon icon={MapPinIcon} size={18} color="#ffd700" />
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Address</div>
                    <span className="text-white/70 text-sm leading-relaxed">
                      6325 Cambridge St, #1
                      <br />
                      St Louis Park, MN 55416
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <Icon icon={MapsLocation01Icon} size={18} color="#ffd700" />
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Service Area</div>
                    <span className="text-white/70 text-sm">
                      Minneapolis & Twin Cities
                      <br />
                      Metro - Statewide
                    </span>
                  </div>
                </div>
              </li>
            </ul>

            <div className="mt-7">
              <a
                href="#"
                className="inline-flex items-center justify-center w-full h-11 rounded-full bg-[#e24436] text-white font-bold text-sm hover:bg-[#e24436]/90 transition-colors"
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            Copyright {new Date().getFullYear()} 5 Star Movers. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
