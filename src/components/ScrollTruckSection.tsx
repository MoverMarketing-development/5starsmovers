"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const copy = "The Truck That Moves You Faster\u2014Book Today.";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ScrollTruckSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const truck = truckRef.current;

    if (!section || !truck) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    let target = 0;
    let current = 0;
    let frame = 0;

    const setTarget = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;

      target = clamp((viewportHeight * 0.82 - rect.top) / (viewportHeight * 0.9), 0, 1);
    };

    const render = () => {
      current += (target - current) * 0.16;

      const isMobile = window.innerWidth < 768;
      const start = isMobile ? -148 : -172;
      const end = isMobile ? 178 : 342;
      const x = start + (end - start) * current;

      truck.style.transform = `translate3d(${x}%, 0, 0)`;

      if (Math.abs(target - current) > 0.001) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const update = () => {
      if (!desktopQuery.matches) {
        truck.style.transform = "";
        return;
      }

      if (mediaQuery.matches) {
        truck.style.transform = "translate3d(18%, 0, 0)";
        return;
      }

      setTarget();

      if (!frame) {
        frame = window.requestAnimationFrame(render);
      }
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    mediaQuery.addEventListener("change", update);
    desktopQuery.addEventListener("change", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mediaQuery.removeEventListener("change", update);
      desktopQuery.removeEventListener("change", update);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Book a faster move"
      className="relative overflow-hidden bg-[#f8f6ef] py-12 sm:py-14 md:py-16 lg:py-10"
    >
      <div className="relative flex items-center overflow-hidden bg-[#f8f6ef] lg:min-h-[205px]">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:overflow-hidden">
          <p className="mx-auto max-w-4xl text-center font-display text-4xl font-black uppercase leading-[0.95] text-black sm:text-5xl md:text-6xl lg:max-w-none lg:whitespace-nowrap lg:text-[2.35rem] xl:text-[2.9rem]">
            {copy}
          </p>
        </div>

        <div
          ref={truckRef}
          className="pointer-events-none absolute left-0 top-[54%] z-20 hidden w-[24vw] max-w-none will-change-transform lg:block"
        >
          <div className="relative -translate-y-1/2">
            <div
              aria-hidden="true"
              className="absolute -left-[172vw] -top-[120%] h-[340%] w-[180vw] bg-[#f8f6ef]"
            />
            <Image
              src="/truck-scroll.png"
              alt="5 Star Movers truck"
              width={2532}
              height={996}
              sizes="(max-width: 767px) 54vw, (max-width: 1023px) 34vw, 24vw"
              className="relative h-auto w-full select-none object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
