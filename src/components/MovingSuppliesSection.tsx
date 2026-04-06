import Image from "next/image";
import { movingSuppliesIntro, movingSuppliesItems, movingSuppliesSectionImage } from "@/lib/service-pages";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="m12 3 2.7 5.47 6.04.88-4.37 4.26 1.03 6.02L12 16.77 6.6 19.63l1.03-6.02L3.26 9.35l6.04-.88L12 3Z" />
    </svg>
  );
}

export default function MovingSuppliesSection() {
  return (
    <section className="border-y border-white/5 bg-[#f4f0e8] py-24 text-[#121417]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="font-label text-xs font-bold uppercase tracking-[0.35em] text-[#00685e]">Moving Supplies Available</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">Add Protective Materials To Any Move</h2>
          <p className="mt-5 max-w-3xl text-lg leading-[1.5] text-[#121417]/72">{movingSuppliesIntro}</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {movingSuppliesItems.map((item) => (
              <article key={item.title} className="rounded-[1.6rem] border border-black/6 bg-white p-6 shadow-[0_18px_40px_rgba(18,20,23,0.08)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffdc00] text-[#121417]">
                  <StarIcon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-extrabold">{item.title}</h3>
                <p className="mt-1 text-2xl font-semibold text-[#121417]/88">{item.price}</p>
                <p className="mt-4 text-sm leading-[1.5] text-[#121417]/64">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-black/5 bg-[#121417] shadow-[0_24px_60px_rgba(18,20,23,0.14)]">
          <Image
            src={movingSuppliesSectionImage}
            alt="Moving supplies and packing materials"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 38vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
