"use client";

import { memo, useEffect, useRef } from "react";
import Script from "next/script";

function TrustIndexWidgetComponent() {
  const trustIndexRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    trustIndexRef.current?.setAttribute(
      "src",
      "https://cdn.trustindex.io/loader.js?26de95268d12962a4e96fbdb281",
    );
  }, []);

  return (
    <>
      <Script
        id="trustindex-widget-loader"
        src="https://cdn.trustindex.io/loader.js"
        strategy="afterInteractive"
      />
      <div ref={trustIndexRef} className="trustindex-widget mx-auto" />
    </>
  );
}

const TrustIndexWidget = memo(TrustIndexWidgetComponent);

export default TrustIndexWidget;
