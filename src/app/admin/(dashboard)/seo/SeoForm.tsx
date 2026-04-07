"use client";

import { useState, useTransition } from "react";
import { saveSeoSettings } from "./actions";
import ImageUpload from "@/components/admin/ImageUpload";

interface DefaultValues {
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  noindex: boolean;
  header_html: string | null;
}

interface SeoFormProps {
  pagePath: string;
  pageLabel: string;
  defaultValues: DefaultValues | null;
}

function CharCount({ value, max, warn }: { value: string; max: number; warn: number }) {
  const len = value.length;
  const color =
    len === 0 ? "text-white/20"
    : len > max ? "text-red-400"
    : len >= warn ? "text-yellow-400"
    : "text-green-400";
  return <span className={`text-[11px] tabular-nums ${color}`}>{len}/{max}</span>;
}

export default function SeoForm({ pagePath, pageLabel, defaultValues }: SeoFormProps) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const [metaTitle, setMetaTitle] = useState(defaultValues?.meta_title ?? "");
  const [metaDesc, setMetaDesc] = useState(defaultValues?.meta_description ?? "");
  const [ogTitle, setOgTitle] = useState(defaultValues?.og_title ?? "");
  const [ogDesc, setOgDesc] = useState(defaultValues?.og_description ?? "");
  const [ogImage, setOgImage] = useState(defaultValues?.og_image ?? "");
  const [headerHtml, setHeaderHtml] = useState(defaultValues?.header_html ?? "");
  const [noindex, setNoindex] = useState(defaultValues?.noindex ?? false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    const formData = new FormData(e.currentTarget);
    formData.set("meta_title", metaTitle);
    formData.set("meta_description", metaDesc);
    formData.set("og_title", ogTitle);
    formData.set("og_description", ogDesc);
    formData.set("og_image", ogImage);
    formData.set("header_html", headerHtml);
    formData.set("noindex", noindex ? "true" : "false");

    startTransition(async () => {
      const result = await saveSeoSettings(pagePath, formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    });
  }

  const inputClass =
    "w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#ffdc00]/50 focus:outline-none focus:ring-1 focus:ring-[#ffdc00]/30 transition-colors";

  return (
    <div className="rounded-xl border border-white/[0.07] overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm font-semibold text-white shrink-0">{pageLabel}</span>
          <span className="text-xs text-white/30 font-mono truncate">{pagePath}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            {defaultValues?.meta_title && (
              <span className="text-[10px] rounded-full bg-green-500/15 text-green-400 px-2 py-0.5 font-semibold">configured</span>
            )}
            {noindex && (
              <span className="text-[10px] rounded-full bg-orange-500/15 text-orange-400 px-2 py-0.5 font-semibold">noindex</span>
            )}
          </div>
        </div>
        <svg className={`h-4 w-4 text-white/30 transition-transform shrink-0 ml-3 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="px-5 pb-5 pt-3 border-t border-white/[0.05] space-y-6">

          {/* ── Google / Search ── */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#ffdc00] mb-4">Google / Search</p>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-white/40">Meta Title</span>
                  <CharCount value={metaTitle} max={60} warn={50} />
                </div>
                <input
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Page Title | 5 Star Movers Minnesota"
                  maxLength={80}
                  className={inputClass}
                />
                <p className="mt-1 text-[11px] text-white/20">Recommended: 50–60 chars. Google truncates beyond 60.</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-white/40">Meta Description</span>
                  <CharCount value={metaDesc} max={160} warn={120} />
                </div>
                <textarea
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  rows={2}
                  placeholder="Brief description shown in search results…"
                  maxLength={200}
                  className={inputClass + " resize-none"}
                />
                <p className="mt-1 text-[11px] text-white/20">Recommended: 120–160 chars.</p>
              </div>
            </div>
          </div>

          {/* ── Google Preview ── */}
          {(metaTitle || metaDesc) && (
            <div className="rounded-lg border border-white/[0.06] bg-[#202124] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/30 mb-3">Google Preview</p>
              <div className="text-[14px] text-[#8ab4f8] font-medium leading-tight line-clamp-1">
                {metaTitle || pageLabel}
              </div>
              <div className="text-[12px] text-[#4caf50] mt-0.5">
                www.5starmoversmn.com{pagePath}
              </div>
              <div className="text-[13px] text-[#bdc1c6] mt-1 line-clamp-2 leading-snug">
                {metaDesc || <span className="text-white/20 italic">No description set.</span>}
              </div>
            </div>
          )}

          {/* ── Social / OG ── */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#ffdc00] mb-4">Social Share (Open Graph)</p>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-white/40">
                    OG Title <span className="text-white/20 font-normal">— defaults to Meta Title if blank</span>
                  </span>
                  <CharCount value={ogTitle} max={60} warn={50} />
                </div>
                <input
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  placeholder="Leave blank to use Meta Title"
                  maxLength={80}
                  className={inputClass}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-white/40">
                    OG Description <span className="text-white/20 font-normal">— defaults to Meta Description if blank</span>
                  </span>
                  <CharCount value={ogDesc} max={160} warn={120} />
                </div>
                <textarea
                  value={ogDesc}
                  onChange={(e) => setOgDesc(e.target.value)}
                  rows={2}
                  placeholder="Leave blank to use Meta Description"
                  maxLength={200}
                  className={inputClass + " resize-none"}
                />
              </div>

              <div>
                <ImageUpload
                  value={ogImage}
                  onChange={setOgImage}
                  label="OG Image"
                  hint="1200 × 630 px recommended"
                />
                <p className="mt-1.5 text-[11px] text-white/20">Shown when shared on Facebook, LinkedIn, iMessage, etc.</p>
              </div>
            </div>
          </div>

          {/* ── Advanced ── */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#ffdc00] mb-4">Advanced</p>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-white/40 block mb-1.5">
                  Canonical URL <span className="text-white/20 font-normal">— auto-set if blank</span>
                </span>
                <input
                  name="canonical_url"
                  defaultValue={defaultValues?.canonical_url ?? ""}
                  placeholder={`https://www.5starmoversmn.com${pagePath}`}
                  className={inputClass}
                />
                <p className="mt-1 text-[11px] text-white/20">Prevents duplicate content penalties. Leave blank unless you need a custom value.</p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <button
                  type="button"
                  role="switch"
                  aria-checked={noindex}
                  onClick={() => setNoindex((v) => !v)}
                  className={`relative mt-0.5 w-9 h-5 rounded-full transition-colors shrink-0 ${noindex ? "bg-orange-500" : "bg-white/10"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${noindex ? "translate-x-4" : ""}`} />
                </button>
                <div>
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                    Noindex this page
                  </span>
                  <p className="text-[11px] text-white/30 mt-0.5">Tells Google not to index this page. Use for /quote, /careers, /privacy-policy.</p>
                </div>
              </label>
            </div>
          </div>

          {/* ── Header HTML ── */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#ffdc00] mb-4">Header HTML</p>
            <div className="space-y-3">
              <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] px-4 py-3 text-[11px] text-white/40 leading-relaxed">
                Enter your custom HTML or JavaScript for this page. It will be injected into{" "}
                <code className="text-white/60 bg-white/[0.06] px-1 py-0.5 rounded">&lt;head&gt;</code>{" "}
                and applied on desktop, tablet, and mobile.
                <br />
                Common uses: Google Tag Manager, custom tracking pixels, analytics scripts.
              </div>
              <textarea
                value={headerHtml}
                onChange={(e) => setHeaderHtml(e.target.value)}
                rows={6}
                spellCheck={false}
                placeholder={`<!-- Example: Google Tag Manager -->\n<script>\n  (function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXXXX');\n</script>`}
                className={inputClass + " resize-y font-mono text-xs"}
              />
              {headerHtml && (
                <div className="flex items-center gap-1.5 text-[11px] text-green-400/80">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Custom HTML is active for this page
                </div>
              )}
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-[#ffdc00] px-4 py-2 text-sm font-bold text-[#111318] transition-all hover:bg-[#ffe75a] disabled:opacity-50"
            >
              {isPending ? "Saving…" : "Save"}
            </button>
            {saved && <span className="text-sm text-green-400">Saved!</span>}
          </div>
        </form>
      )}
    </div>
  );
}
