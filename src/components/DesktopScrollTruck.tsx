"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function DesktopScrollTruck() {
  const truckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const truck = truckRef.current;
    const section = truck?.closest("section");

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

      const start = -172;
      const end = 342;
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
          sizes="24vw"
          className="relative h-auto w-full select-none object-contain"
        />
      </div>
    </div>
  );
}
