import {
  CheckmarkBadge01Icon,
  Dollar01Icon,
  CustomerService01Icon,
  Shield01Icon,
  Clock01Icon,
  Award01Icon,
} from "@hugeicons/core-free-icons";
import type { ComponentProps } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Icon } from "@/components/ui/Icon";

type IconData = ComponentProps<typeof HugeiconsIcon>["icon"];

const features: { icon: IconData; title: string; description: string }[] = [
  {
    icon: CheckmarkBadge01Icon,
    title: "Licensed & Insured",
    description:
      "Your belongings are fully protected. We're licensed, bonded, and insured so you never have to worry.",
  },
  {
    icon: Dollar01Icon,
    title: "Upfront Pricing",
    description:
      "No hidden fees, no surprises. You'll know exactly what you're paying before we move a single box.",
  },
  {
    icon: CustomerService01Icon,
    title: "Top-Tier Customer Service",
    description:
      "Our team is here from first call to final box. Friendly, professional, and always on time.",
  },
  {
    icon: Shield01Icon,
    title: "Expert Handling",
    description:
      "From fragile antiques to heavy safes, our trained movers treat your items with the utmost care.",
  },
  {
    icon: Clock01Icon,
    title: "Efficient & Punctual",
    description:
      "We respect your time. Our team arrives on schedule and completes every move efficiently.",
  },
  {
    icon: Award01Icon,
    title: "Proven Track Record",
    description:
      "5-star reviews from thousands of happy customers across the Twin Cities and all of Minnesota.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="inline-block text-[#006e63] font-semibold text-sm tracking-widest uppercase mb-3">
              Why 5 Star Movers
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#343a40] leading-tight">
              Choosing 5-Star Movers means choosing{" "}
              <span className="text-[#006e63]">reliability, affordability & peace of mind</span>
            </h2>
          </div>
          <div>
            <p className="text-gray-500 text-lg leading-relaxed">
              We handle residential and commercial moves with care, efficiency, and professionalism.
              With years of experience, we specialize in packing, storage solutions, and specialty
              moves like pianos and antiques — our team ensures every move is hassle-free.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#e24436] text-white font-semibold hover:bg-[#e24436]/90 transition-colors"
              >
                Request a Free Quote
              </a>
              <a
                href="tel:6512431993"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border-2 border-[#343a40] text-[#343a40] font-semibold hover:bg-[#343a40]/5 transition-colors"
              >
                (651) 243-1993
              </a>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg hover:shadow-[#343a40]/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#006e63] flex items-center justify-center mb-5 group-hover:bg-[#343a40] transition-colors">
                <Icon icon={feature.icon} size={22} color="white" />
              </div>
              <h3 className="font-bold text-[#343a40] text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
