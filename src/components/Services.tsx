import {
  Home01Icon,
  DeliveryTruck01Icon,
  Building01Icon,
  Package01Icon,
  User02Icon,
  BoxingBagIcon,
  MapsLocation01Icon,
  StarsIcon,
  Medal01Icon,
  VanIcon,
  Shield01Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import type { ComponentProps } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Icon } from "@/components/ui/Icon";

type IconData = ComponentProps<typeof HugeiconsIcon>["icon"];

const services: { icon: IconData; title: string; description: string }[] = [
  {
    icon: Home01Icon,
    title: "Residential Moving",
    description: "Seamless home moves handled with care and professionalism.",
  },
  {
    icon: DeliveryTruck01Icon,
    title: "Long Distance Moving",
    description: "Cross-state moves with the same reliability you expect locally.",
  },
  {
    icon: Building01Icon,
    title: "Commercial Moving",
    description: "Minimize downtime with our efficient office and business relocations.",
  },
  {
    icon: VanIcon,
    title: "Loading & Unloading",
    description: "Heavy lifting done right — fast, safe, and damage-free.",
  },
  {
    icon: User02Icon,
    title: "Senior Moving",
    description: "Compassionate, patient service designed for our senior community.",
  },
  {
    icon: Package01Icon,
    title: "Packing Services",
    description: "Professional packing with quality materials to protect your belongings.",
  },
  {
    icon: MapsLocation01Icon,
    title: "Apartment Moving",
    description: "Navigating tight spaces and elevators? We've got it covered.",
  },
  {
    icon: BoxingBagIcon,
    title: "Moving Supplies",
    description: "Boxes, tape, and packing materials delivered right to you.",
  },
  {
    icon: Shield01Icon,
    title: "Storage Solutions",
    description: "Safe, clean, and accessible storage options when you need them.",
  },
  {
    icon: StarsIcon,
    title: "White Glove Moving",
    description: "Premium, concierge-level moving for your most valuable items.",
  },
  {
    icon: Medal01Icon,
    title: "Specialty Moving",
    description: "Pianos, antiques, safes — we handle what others won't.",
  },
  {
    icon: Delete02Icon,
    title: "Junk Removal",
    description: "Clear out unwanted items before or after your move with ease.",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#006e63] font-semibold text-sm tracking-widest uppercase mb-3">
            What We Offer
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#343a40] mb-4">
            Your Go-To for Moving Services
            <br />
            <span className="text-[#006e63]">Across Minnesota</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From single apartments to full commercial buildings, we offer 12 specialized services
            to handle every aspect of your move.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-[#343a40]/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Hover background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#343a40] to-[#006e63] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon container */}
                <div className="w-12 h-12 rounded-xl bg-[#006e63]/10 group-hover:bg-[#ffd700]/20 flex items-center justify-center mb-4 transition-colors text-[#006e63] group-hover:text-[#ffd700]">
                  <Icon icon={service.icon} size={24} color="currentColor" />
                </div>

                <h3 className="font-bold text-[#343a40] group-hover:text-white text-base mb-2 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 group-hover:text-white/70 text-sm leading-relaxed transition-colors">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-1 text-[#ffd700] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
