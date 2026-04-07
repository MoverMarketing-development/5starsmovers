"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ImportRssButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleImport() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/import-rss", { method: "POST" });
      const data = await res.json();
      setMessage(data.message ?? "Done");
      router.refresh();
    } catch {
      setMessage("Import failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {message && (
        <span className="text-xs text-white/40">{message}</span>
      )}
      <button
        onClick={handleImport}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.1] px-4 py-2 text-sm font-medium text-white/60 hover:border-white/20 hover:text-white transition-colors disabled:opacity-40"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m-4 4 4-4 4 4M4 20h16" />
        </svg>
        {loading ? "Importing…" : "Import RSS"}
      </button>
    </div>
  );
}
