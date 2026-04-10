"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const allowedHeadTags = new Set(["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TITLE"]);
const loaderAttribute = "data-head-html-loader";

function cloneHeadElement(element: Element) {
  const tagName = element.tagName.toLowerCase();
  const clone = document.createElement(tagName);

  for (const attribute of Array.from(element.attributes)) {
    clone.setAttribute(attribute.name, attribute.value);
  }

  clone.setAttribute(loaderAttribute, "true");
  clone.textContent = element.textContent;

  return clone;
}

/**
 * Fetches the per-page custom Header HTML from the SEO settings API
 * and injects only head-safe tags. This prevents malformed admin HTML
 * from being hoisted into the page body by the browser parser.
 */
export default function HeadHtmlLoader() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    document.querySelectorAll(`[${loaderAttribute}]`).forEach((node) => node.remove());

    let cancelled = false;

    fetch(`/api/seo/header-html?path=${encodeURIComponent(pathname)}`)
      .then((r) => r.json())
      .then(({ html }: { html: string }) => {
        if (cancelled || !html) return;

        const range = document.createRange();
        range.selectNode(document.head);
        const fragment = range.createContextualFragment(html);

        Array.from(fragment.childNodes).forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;

          const element = node as Element;
          if (!allowedHeadTags.has(element.tagName)) return;

          document.head.appendChild(cloneHeadElement(element));
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      document.querySelectorAll(`[${loaderAttribute}]`).forEach((node) => node.remove());
    };
  }, [pathname]);

  return null;
}
