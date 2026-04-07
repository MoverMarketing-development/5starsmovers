"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
}

export default function ImageUpload({ value, onChange, label, hint }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File must be under 5 MB");
      return;
    }
    setUploadError(null);
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "jpg";
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage
        .from("blog-images")
        .upload(filename, file, { upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("blog-images").getPublicUrl(filename);
      onChange(data.publicUrl);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset so the same file can be re-selected
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  const inputClass =
    "w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#ffdc00]/50 focus:outline-none focus:ring-1 focus:ring-[#ffdc00]/30 transition-colors";

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <span className="block text-xs font-semibold text-white/50">{label}</span>
          {hint && <span className="text-xs text-white/25">{hint}</span>}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={handleInputChange}
      />

      {value ? (
        <div className="space-y-3">
          {/* Preview */}
          <div className="relative w-full aspect-video max-w-sm rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Cover" className="w-full h-full object-cover" />
          </div>
          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-white/[0.08] transition-colors disabled:opacity-50"
            >
              {uploading ? "Uploading…" : "Replace"}
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              disabled={uploading}
              className="rounded-lg border border-red-500/20 bg-red-500/5 px-3.5 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !uploading && inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.12] bg-white/[0.02] py-10 cursor-pointer hover:bg-white/[0.04] hover:border-[#ffdc00]/30 transition-colors select-none"
        >
          {uploading ? (
            <span className="text-sm text-white/40 animate-pulse">Uploading…</span>
          ) : (
            <>
              <span className="text-3xl">🖼</span>
              <span className="text-sm font-medium text-white/40">
                Click or drag &amp; drop to upload
              </span>
              <span className="text-xs text-white/20">PNG, JPG, WebP — max 5 MB</span>
            </>
          )}
        </div>
      )}

      {/* URL fallback input */}
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste an image URL…"
          className={inputClass + " text-xs"}
        />
      </div>

      {uploadError && (
        <p className="text-xs text-red-400">{uploadError}</p>
      )}
    </div>
  );
}
