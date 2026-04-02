import { PhoneCheckIcon, CheckmarkCircle01Icon, DeliveryTruck01Icon, StarIcon } from "@hugeicons/core-free-icons";
import type { ComponentProps } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Icon } from "@/components/ui/Icon";

type IconData = ComponentProps<typeof HugeiconsIcon>["icon"];

const steps: { step: string; icon: IconData; title: string; description: string }[] = [
  {
    step: "01",
    icon: PhoneCheckIcon,
    title: "Request a Free Quote",
    description:
      "Call us at (651) 243-1993 or fill out our online form. We will provide an upfront quote with no hidden fees completely free.",
  },
  {
    step: "02",
    icon: CheckmarkCircle01Icon,
    title: "Schedule Your Move",
    description:
      "Pick a date that works for you. Our team will confirm all details and prepare for a seamless moving experience.",
  },
  {
    step: "03",
    icon: DeliveryTruck01Icon,
    title: "We Handle Everything",
    description:
      "Our expert movers arrive on time, pack and load your belongings with care, and deliver everything safely to your new location.",
  },
  {
    step: "04",
    icon: StarIcon,
    title: "Settle In & Enjoy",
    description:
      "We unload, place, and reassemble your items. All that&apos;s left is enjoying your new space stress-free.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#343a40] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#006e63] rounded-full opacity-10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[#ffd700] font-semibold text-sm tracking-widest uppercase mb-3">
            Simple Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Moving with Us is <span className="text-[#ffd700]">Easy as 1-2-3</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            We have designed our process to be as straightforward and stress-free as possible.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%-1rem)] w-[calc(100%-3.5rem)] h-px border-t-2 border-dashed border-white/20 z-0" />
              )}

              <div className="relative z-10 text-center lg:text-left">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                    <Icon icon={step.icon} size={28} color="#ffd700" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#006e63] flex items-center justify-center">
                    <span className="text-white text-xs font-black">{step.step}</span>
                  </div>
                </div>

                <h3 className="font-bold text-white text-lg mb-3">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="#"
            className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-[#e24436] text-white font-bold text-base hover:bg-[#e24436]/90 transition-all hover:scale-105 shadow-lg shadow-[#e24436]/30"
          >
            Get Your Free Quote Now
          </a>
        </div>
      </div>
    </section>
  );
}
