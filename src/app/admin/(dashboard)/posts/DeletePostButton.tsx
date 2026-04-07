"use client";

import { useState } from "react";
import { deletePost } from "./actions";

export default function DeletePostButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setLoading(true);
    const result = await deletePost(id);
    if (result.error) {
      alert("Error: " + result.error);
      setLoading(false);
    }
    // On success, revalidatePath in the server action refreshes the list automatically
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-colors disabled:opacity-40"
    >
      {loading ? "…" : "Delete"}
    </button>
  );
}
