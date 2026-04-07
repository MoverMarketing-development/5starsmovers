"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RobotsEditor({ defaultContent }: { defaultContent: string }) {
  const [content, setContent] = useState(defaultContent);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase
        .from("robots_settings")
        .upsert({ content, updated_at: new Date().toISOString() }, { onConflict: "id" });

      if (error) {
        // If no row exists yet, insert
        const { error: insertError } = await supabase
          .from("robots_settings")
          .insert({ content });
        if (insertError) {
          setError(insertError.message);
          return;
        }
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  return (
    <div className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={16}
        spellCheck={false}
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 font-mono text-sm text-white/80 placeholder:text-white/20 focus:border-[#ffdc00]/40 focus:outline-none focus:ring-1 focus:ring-[#ffdc00]/20 transition-colors resize-none"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="rounded-lg bg-[#ffdc00] px-4 py-2 text-sm font-bold text-[#111318] transition-all hover:bg-[#ffe75a] disabled:opacity-50"
        >
          {isPending ? "Saving…" : "Save robots.txt"}
        </button>
        {saved && <span className="text-sm text-green-400">Saved! Changes are live.</span>}
      </div>
    </div>
  );
}
