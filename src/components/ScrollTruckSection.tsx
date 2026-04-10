import ScrollTruckAnimationLoader from "@/components/ScrollTruckAnimationLoader";

const copy = "The Truck That Moves You Faster\u2014Book Today.";

export default function ScrollTruckSection() {
  return (
    <section
      aria-label="Book a faster move"
      className="relative overflow-hidden bg-[#f8f6ef] py-12 sm:py-14 md:py-16 lg:py-10"
    >
      <div className="relative flex items-center overflow-hidden bg-[#f8f6ef] lg:min-h-[205px]">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:overflow-hidden">
          <p className="mx-auto max-w-4xl text-center font-display text-4xl font-black uppercase leading-[0.95] text-black sm:text-5xl md:text-6xl lg:max-w-none lg:whitespace-nowrap lg:text-[2.35rem] xl:text-[2.9rem]">
            {copy}
          </p>
        </div>

        <ScrollTruckAnimationLoader />
      </div>
    </section>
  );
}
