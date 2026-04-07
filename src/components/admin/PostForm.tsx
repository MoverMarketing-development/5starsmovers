"use client";

import { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type { Post } from "@/lib/posts";

const RichEditor = dynamic(() => import("./RichEditor"), { ssr: false });

interface PostFormProps {
  post?: Post;
  action: (data: FormData) => Promise<{ error?: string }>;
}

export default function PostForm({ post, action }: PostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState(post?.content ?? "");
  const [status, setStatus] = useState<"draft" | "published">(post?.status ?? "draft");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("content", content);
    formData.set("status", status);

    startTransition(async () => {
      const result = await action(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/admin/posts");
        router.refresh();
      }
    });
  }

  const inputClass =
    "w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#ffdc00]/50 focus:outline-none focus:ring-1 focus:ring-[#ffdc00]/30 transition-colors";
  const labelClass = "block text-xs font-semibold text-white/50 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-400/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Left column */}
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Title *</label>
            <input
              name="title"
              defaultValue={post?.title}
              required
              placeholder="My awesome post"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Content *</label>
            <RichEditor
              value={content}
              onChange={setContent}
              placeholder="Write your post here…"
            />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Publish controls */}
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
              {isPending ? "Saving…" : post ? "Save changes" : "Publish post"}
            </button>
          </div>

          {/* Slug */}
          <div>
            <label className={labelClass}>Slug *</label>
            <input
              name="slug"
              defaultValue={post?.slug}
              required
              placeholder="my-awesome-post"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Meta description</label>
            <textarea
              name="description"
              defaultValue={post?.description}
              rows={3}
              placeholder="Brief summary shown in search results…"
              className={inputClass + " resize-none"}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className={labelClass}>Cover image URL</label>
            <input
              name="image_url"
              defaultValue={post?.image_url}
              placeholder="https://…"
              className={inputClass}
            />
          </div>

          {/* Tags */}
          <div>
            <label className={labelClass}>Tags (comma-separated)</label>
            <input
              name="tags"
              defaultValue={post?.tags?.join(", ")}
              placeholder="moving tips, local movers"
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
