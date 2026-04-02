import { StarIcon, PhoneCheckIcon, CheckmarkCircle01Icon, DeliveryTruck01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#343a40]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#006e63] opacity-20" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#006e63] opacity-10" />
        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-1 h-48 bg-[#ffd700] opacity-40 rounded-full" />
        <div className="absolute top-1/2 right-[9.5%] -translate-y-1/2 w-1 h-28 bg-[#ffd700] opacity-20 rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(45deg, white 1px, transparent 1px), linear-gradient(-45deg, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} icon={StarIcon} size={13} color="#ffd700" />
                ))}
              </div>
              <span className="text-white/80 text-sm font-medium">Minnesota&apos;s Most Trusted Movers</span>
            </div>

            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              Moving Made
              <br />
              <span className="text-[#ffd700]">Simple.</span>
              <br />
              <span className="text-white/80 text-4xl sm:text-5xl xl:text-6xl">Across Minnesota.</span>
            </h1>

            <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-xl">
              Moving can be stressful, but with 5-Star Movers, it doesn&apos;t have to be. Expert
              movers, upfront pricing, and top-tier customer service every time.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button
                size="lg"
                className="bg-[#e24436] text-white hover:bg-[#e24436]/90 font-bold text-base rounded-full px-8 h-13 shadow-lg shadow-[#e24436]/25 transition-all hover:scale-105"
              >
                Request a Free Quote
              </Button>
              <a
                href="tel:6512431993"
                className="inline-flex items-center justify-center gap-2.5 h-13 px-7 rounded-full border border-white/20 text-white font-semibold text-base hover:border-white/40 hover:bg-white/5 transition-all"
              >
                <Icon icon={PhoneCheckIcon} size={18} color="#ffd700" />
                (651) 243-1993
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2.5">
              {["Licensed & Insured", "Upfront Pricing", "Expert Handling", "Hassle-Free Moves"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Icon icon={CheckmarkCircle01Icon} size={17} color="#ffd700" />
                  <span className="text-white/70 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-4">
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#006e63] to-[#ffd700] rounded-t-3xl" />

              <div className="flex items-center gap-4 mb-7">
                <div className="w-14 h-14 rounded-2xl bg-[#006e63] flex items-center justify-center">
                  <Icon icon={DeliveryTruck01Icon} size={28} color="white" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">5 Star Movers</div>
                  <div className="text-white/50 text-sm">Minneapolis & Twin Cities</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-7">
                {[
                  { n: "10+", l: "Years" },
                  { n: "5K+", l: "Moves" },
                  { n: "5.0*", l: "Rating" },
                ].map((s) => (
                  <div key={s.l} className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-[#ffd700] font-bold text-xl">{s.n}</div>
                    <div className="text-white/50 text-xs mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {["Residential", "Commercial", "Long Distance", "Specialty", "Packing", "Storage"].map((tag) => (
                  <span key={tag} className="text-xs bg-white/8 border border-white/10 text-white/60 rounded-full px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#006e63]/20 border border-[#006e63]/30 rounded-2xl p-5">
                <div className="text-[#ffd700] font-black text-3xl mb-1">100%</div>
                <div className="text-white/70 text-sm font-medium">Licensed & Insured</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="text-[#ffd700] font-black text-3xl mb-1">Free</div>
                <div className="text-white/70 text-sm font-medium">Quote & Upfront Pricing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
