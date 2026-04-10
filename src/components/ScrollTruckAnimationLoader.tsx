"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const desktopQuery = "(min-width: 1024px)";

const DesktopScrollTruck = dynamic(() => import("@/components/DesktopScrollTruck"), {
  ssr: false,
});

export default function ScrollTruckAnimationLoader() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopQuery);

    const syncShouldLoad = () => setShouldLoad(mediaQuery.matches);
    syncShouldLoad();

    mediaQuery.addEventListener("change", syncShouldLoad);

    return () => mediaQuery.removeEventListener("change", syncShouldLoad);
  }, []);

  return shouldLoad ? <DesktopScrollTruck /> : null;
}
