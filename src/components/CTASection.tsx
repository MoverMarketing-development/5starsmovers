import { PhoneCheckIcon, StarIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative bg-gradient-to-br from-[#343a40] to-[#006e63] rounded-3xl p-10 sm:p-14 overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffd700] rounded-full opacity-10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full opacity-5 blur-2xl pointer-events-none" />

          <div className="flex justify-center gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} icon={StarIcon} size={24} color="#ffd700" />
            ))}
          </div>

          <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Move? Let&apos;s Make{" "}
            <span className="text-[#ffd700]">It Happen.</span>
          </h2>
          <p className="relative z-10 text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Get a free, no-obligation quote today. Upfront pricing, expert movers, and a hassle-free
            experience. That&apos;s the 5 Star promise.
          </p>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#e24436] text-white hover:bg-[#e24436]/90 font-bold text-base rounded-full px-8 h-14 shadow-lg shadow-black/20 transition-all hover:scale-105"
            >
              Request a Free Quote
            </Button>
            <a
              href="tel:6512431993"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full border-2 border-white/30 text-white font-semibold text-base hover:border-white/60 hover:bg-white/10 transition-all"
            >
              <Icon icon={PhoneCheckIcon} size={20} color="#ffd700" />
              (651) 243-1993
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
