"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fetches the per-page custom Header HTML from the SEO settings API
 * and injects it into <head> via createContextualFragment so that
 * <script>, <style>, <link>, and <meta> tags all work correctly.
 */
export default function HeadHtmlLoader() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    fetch(`/api/seo/header-html?path=${encodeURIComponent(pathname)}`)
      .then((r) => r.json())
      .then(({ html }: { html: string }) => {
        if (!html) return;
        const range = document.createRange();
        range.selectNode(document.head);
        const fragment = range.createContextualFragment(html);
        document.head.appendChild(fragment);
      })
      .catch(() => {});
  }, [pathname]);

  return null;
}
