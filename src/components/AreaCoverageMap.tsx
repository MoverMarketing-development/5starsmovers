"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { areaGroups } from "@/lib/area-pages";

type NeighborhoodHotspot = {
  name: string;
  left: string;
  top: string;
};

const minneapolisNeighborhoodHotspots: NeighborhoodHotspot[] = [
  { name: "Shingle Creek", left: "18%", top: "7%" },
  { name: "Victory", left: "17%", top: "18%" },
  { name: "Webber-Camden", left: "30%", top: "21%" },
  { name: "Jordan", left: "20%", top: "32%" },
  { name: "Near North", left: "33%", top: "43%" },
  { name: "North Loop", left: "41%", top: "47%" },
  { name: "Downtown West", left: "45%", top: "53%" },
  { name: "Downtown East", left: "56%", top: "54%" },
  { name: "Northeast Park", left: "67%", top: "35%" },
  { name: "Southeast Como", left: "78%", top: "39%" },
  { name: "Cedar-Riverside", left: "62%", top: "60%" },
  { name: "Seward", left: "74%", top: "63%" },
  { name: "Whittier", left: "36%", top: "67%" },
  { name: "Kingfield", left: "32%", top: "80%" },
  { name: "Standish", left: "63%", top: "78%" },
  { name: "Hale", left: "49%", top: "90%" },
  { name: "Wenonah", left: "70%", top: "92%" },
];

export default function AreaCoverageMap() {
  const [activeNeighborhood, setActiveNeighborhood] = useState<NeighborhoodHotspot | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#f8f6ef] py-24 text-[#121417]">
      <div className="absolute inset-0">
        <div className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-[#ffdc00]/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#00685e]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
        <div>
          <p className="mb-4 font-label text-xs font-bold uppercase tracking-[0.35em] text-[#00685e]">
            Areas We Serve
          </p>
          <h2 className="font-display text-4xl font-extrabold leading-[1.02] text-[#121417] md:text-5xl">
            Explore Our Twin Cities Coverage Map
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.6] text-[#121417]/70">
            The neighborhood artwork now has interactive hotspots so visitors can hover a Minneapolis
            area and jump straight into our Minneapolis service page.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2">
              <span className="h-3 w-3 rounded-full bg-[#ffdc00]" />
              Interactive neighborhood hotspot
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2">
              <span className="h-3 w-3 rounded-full bg-[#121417]" />
              Opens Minneapolis area page
            </span>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {areaGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-[1.5rem] border border-black/8 bg-white/90 p-5 shadow-[0_18px_40px_rgba(18,20,23,0.06)]"
              >
                <h3 className="font-display text-xl font-extrabold text-[#121417]">{group.title}</h3>
                <p className="mt-2 text-sm leading-[1.5] text-[#121417]/60">{group.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/areas/${area.slug}`}
                      className="rounded-full border border-black/10 bg-[#121417] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white hover:border-[#ffdc00] hover:bg-[#1d2024]"
                    >
                      {area.city}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/8 bg-white/88 p-4 shadow-[0_28px_80px_rgba(18,20,23,0.12)] sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display text-2xl font-extrabold text-[#121417]">
                Minneapolis Neighborhood Map
              </p>
              <p className="mt-1 text-sm text-[#121417]/60">
                Hover a hotspot to preview the neighborhood, then click to open our Minneapolis page.
              </p>
            </div>
            <div className="rounded-full border border-black/8 bg-[#f8f6ef] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#121417]/65">
              Interactive SVG
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.5rem] border border-black/8 bg-[linear-gradient(180deg,#fdfbf4_0%,#f4efe0_100%)] p-3">
            <div className="relative">
              <Image
                src="/maps/minneapolis-neighborhoods.svg"
                alt="Map of Minneapolis neighborhoods"
                width={1600}
                height={2638}
                className="h-auto w-full rounded-[1rem] bg-white object-contain"
              />

              <div className="absolute inset-0">
                {minneapolisNeighborhoodHotspots.map((hotspot) => {
                  const isActive = activeNeighborhood?.name === hotspot.name;

                  return (
                    <Link
                      key={hotspot.name}
                      href="/areas/minneapolis"
                      aria-label={`Open Minneapolis movers page from ${hotspot.name}`}
                      className="group absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: hotspot.left, top: hotspot.top }}
                      onMouseEnter={() => setActiveNeighborhood(hotspot)}
                      onMouseLeave={() => setActiveNeighborhood((current) => current?.name === hotspot.name ? null : current)}
                      onFocus={() => setActiveNeighborhood(hotspot)}
                      onBlur={() => setActiveNeighborhood((current) => current?.name === hotspot.name ? null : current)}
                    >
                      <span
                        className={`absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full transition ${
                          isActive ? "bg-[#ffdc00]/25" : "bg-[#ffdc00]/14 group-hover:bg-[#ffdc00]/25"
                        }`}
                      />
                      <span
                        className={`relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#121417] bg-[#ffdc00] shadow-[0_8px_16px_rgba(18,20,23,0.2)] transition-transform ${
                          isActive ? "scale-110" : "group-hover:scale-110"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#121417]" />
                      </span>
                    </Link>
                  );
                })}

                {activeNeighborhood ? (
                  <div
                    className="pointer-events-none absolute z-10 w-56 -translate-x-1/2 rounded-2xl border border-[#121417]/12 bg-[#121417] px-4 py-3 text-white shadow-[0_24px_48px_rgba(18,20,23,0.24)]"
                    style={{
                      left: `clamp(120px, ${activeNeighborhood.left}, calc(100% - 120px))`,
                      top: `clamp(24px, calc(${activeNeighborhood.top} - 88px), calc(100% - 120px))`,
                    }}
                  >
                    <p className="font-display text-lg font-extrabold leading-none">
                      {activeNeighborhood.name}
                    </p>
                    <p className="mt-2 text-sm text-white/68">Minneapolis neighborhood</p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-[#ffdc00]">
                      Click to open Minneapolis page
                    </p>
                    <span className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-r border-b border-[#121417]/12 bg-[#121417]" />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
