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

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mediaQuery.removeEventListener("change", update);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Book a faster move"
      className="relative overflow-hidden bg-[#f8f6ef] py-6 sm:py-8 lg:py-10"
    >
      <div className="relative flex min-h-[155px] items-center overflow-hidden bg-[#f8f6ef] sm:min-h-[180px] lg:min-h-[205px]">
        <div className="relative z-10 mx-auto w-full max-w-7xl overflow-hidden px-4 sm:px-6 md:px-8">
          <p className="whitespace-nowrap text-center font-display text-[0.62rem] font-black uppercase leading-none text-black sm:text-lg md:text-[1.7rem] lg:text-[2.35rem] xl:text-[2.9rem]">
            {copy}
          </p>
        </div>

        <div
          ref={truckRef}
          className="pointer-events-none absolute left-0 top-[54%] z-20 w-[54vw] max-w-none will-change-transform sm:w-[34vw] lg:w-[24vw]"
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
