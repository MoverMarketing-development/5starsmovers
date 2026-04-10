"use client";

import { memo, useEffect, useRef, useState } from "react";
import Script from "next/script";

const desktopQuery = "(min-width: 768px)";

function TrustIndexWidgetComponent() {
  const trustIndexRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopQuery);

    const syncShouldLoad = () => setShouldLoad(mediaQuery.matches);
    syncShouldLoad();

    mediaQuery.addEventListener("change", syncShouldLoad);

    return () => mediaQuery.removeEventListener("change", syncShouldLoad);
  }, []);

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }

    trustIndexRef.current?.setAttribute(
      "src",
      "https://cdn.trustindex.io/loader.js?26de95268d12962a4e96fbdb281",
    );
  }, [shouldLoad]);

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      <Script
        id="trustindex-widget-loader"
        src="https://cdn.trustindex.io/loader.js"
        strategy="lazyOnload"
      />
      <div ref={trustIndexRef} className="trustindex-widget mx-auto" />
    </>
  );
}

const TrustIndexWidget = memo(TrustIndexWidgetComponent);

export default TrustIndexWidget;
