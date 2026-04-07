"use client";

import { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import type { Post } from "@/lib/posts";
import ImageUpload from "./ImageUpload";
import TagInput from "./TagInput";

const RichEditor = dynamic(() => import("./RichEditor"), { ssr: false });

const TITLE_MAX = 200;
const META_TITLE_MAX = 65;
const META_DESC_MAX = 160;

interface PostFormProps {
  post?: Post;
  action: (data: FormData) => Promise<{ error?: string }>;
}

function CharCount({ value, max }: { value: string; max: number }) {
  const over = value.length > max;
  return (
    <span className={`text-xs tabular-nums ${over ? "text-red-400" : "text-white/25"}`}>
      {value.length}/{max}
    </span>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 space-y-5">
      <div className="border-b border-white/[0.06] pb-4">
        <h2 className="text-sm font-bold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-white/35 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export default function PostForm({ post, action }: PostFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Content state
  const [content, setContent] = useState(post?.content ?? "");
  const [status, setStatus] = useState<"draft" | "published">(post?.status ?? "draft");

  // Tracked for char counters
  const [title, setTitle] = useState(post?.title ?? "");
  const [metaTitle, setMetaTitle] = useState(post?.title ?? "");
  const [metaDesc, setMetaDesc] = useState(post?.description ?? "");

  // Image + tags (controlled so we can inject into FormData)
  const [imageUrl, setImageUrl] = useState(post?.image_url ?? "");
  const [tags, setTags] = useState<string[]>(post?.tags ?? []);

  // Auto-generate slug from title
  function slugify(s: string) {
    return s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!post?.slug);

  function handleTitleChange(v: string) {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
    if (!metaTitle || metaTitle === title) setMetaTitle(v);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("content", content);
    formData.set("status", status);
    formData.set("image_url", imageUrl);
    formData.set("tags", tags.join(","));
    formData.set("slug", slug);

    startTransition(async () => {
      const result = await action(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  const inputClass =
    "w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#ffdc00]/50 focus:outline-none focus:ring-1 focus:ring-[#ffdc00]/30 transition-colors";
  const labelClass = "block text-xs font-semibold text-white/50 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-400/10 px-4 py-3 text-sm text-red-400 border border-red-400/20">
          {error}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        {/* ── Left column ── */}
        <div className="space-y-5">

          {/* Post Details */}
          <Section title="Post Details" subtitle="Basic information about this post.">
            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={labelClass.replace("mb-1.5", "")}>Post title *</label>
                <CharCount value={title} max={TITLE_MAX} />
              </div>
              <input
                name="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                placeholder="My awesome post"
                className={inputClass}
              />
              <p className="mt-1 text-xs text-white/20">Keep under {TITLE_MAX} characters for best results.</p>
            </div>

            {/* Author */}
            <div>
              <label className={labelClass}>Post author</label>
              <input
                name="author"
                defaultValue={(post as Post & { author?: string })?.author ?? ""}
                placeholder="Author name"
                list="author-list"
                className={inputClass}
              />
              <datalist id="author-list">
                <option value="5 Star Movers Team" />
                <option value="Pablo Ojeda" />
                <option value="Guillermo Rodriguez" />
              </datalist>
            </div>

            {/* Slug */}
            <div>
              <label className={labelClass}>URL slug *</label>
              <div className="flex items-center gap-0 rounded-lg border border-white/[0.08] bg-white/[0.04] overflow-hidden focus-within:border-[#ffdc00]/50 focus-within:ring-1 focus-within:ring-[#ffdc00]/30 transition-colors">
                <span className="px-3 py-2.5 text-sm text-white/30 border-r border-white/[0.06] whitespace-nowrap select-none">
                  /blog/
                </span>
                <input
                  name="slug"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
                  required
                  placeholder="my-awesome-post"
                  className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
            </div>
          </Section>

          {/* Content */}
          <Section title="Post Content" subtitle="Write the full body of the post.">
            <RichEditor
              value={content}
              onChange={setContent}
              placeholder="Write your post here…"
            />
          </Section>

          {/* Media */}
          <Section title="Post Media" subtitle="Cover image shown at the top of the post and in previews.">
            <ImageUpload
              value={imageUrl}
              onChange={setImageUrl}
              label="Cover image"
              hint="Recommended: 1200 × 630 px"
            />
          </Section>

          {/* Tags */}
          <Section title="Post Tags" subtitle="Use tags to help visitors find related posts.">
            <div>
              <label className={labelClass}>Tags</label>
              <TagInput value={tags} onChange={setTags} />
              <p className="mt-1.5 text-xs text-white/20">Press Enter or comma to add a tag.</p>
            </div>
          </Section>

          {/* SEO */}
          <Section title="Post SEO Settings" subtitle="Override how this post appears in search results and social shares.">
            <div className="rounded-lg bg-[#ffdc00]/5 border border-[#ffdc00]/10 px-4 py-3 text-xs text-[#ffdc00]/70">
              Schema markup and Open Graph tags are automatically generated for every published post.
            </div>

            {/* Meta title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={labelClass.replace("mb-1.5", "")}>Post meta title</label>
                <CharCount value={metaTitle} max={META_TITLE_MAX} />
              </div>
              <input
                name="meta_title"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Defaults to post title"
                className={inputClass}
              />
            </div>

            {/* Meta description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={labelClass.replace("mb-1.5", "")}>Meta description</label>
                <CharCount value={metaDesc} max={META_DESC_MAX} />
              </div>
              <textarea
                name="description"
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                rows={3}
                placeholder="Brief summary shown in search results…"
                className={inputClass + " resize-none"}
              />
            </div>
          </Section>
        </div>

        {/* ── Right sidebar ── */}
        <div className="space-y-5 lg:sticky lg:top-6 self-start">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 space-y-4">
            <div>
              <label className={labelClass}>Status</label>
              <div className="flex gap-2">
                {(["draft", "published"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`flex-1 rounded-lg py-2 text-xs font-semibold capitalize transition-colors ${
                      status === s
                        ? s === "published"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-white/10 text-white border border-white/20"
                        : "border border-white/[0.06] text-white/30 hover:text-white/60"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-[#ffdc00] py-2.5 text-sm font-bold text-[#111318] transition-all hover:bg-[#ffe75a] disabled:opacity-50"
            >
              {isPending ? "Saving…" : post ? "Save changes" : "Create post"}
            </button>

            {slug && (
              <a
                href={`/blog/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 w-full rounded-lg border border-white/[0.08] py-2 text-xs font-medium text-white/40 hover:border-white/20 hover:text-white/70 transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Preview post
              </a>
            )}
          </div>

          {/* Preview box */}
          {imageUrl && (
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Preview" className="w-full aspect-video object-cover" />
              <div className="px-4 py-3">
                <p className="text-xs font-semibold text-white/50 truncate">{title || "Post title"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
