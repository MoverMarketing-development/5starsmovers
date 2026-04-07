"use client";

import { useState, KeyboardEvent } from "react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export default function TagInput({ value, onChange }: TagInputProps) {
  const [input, setInput] = useState("");

  function addTag(raw: string) {
    const trimmed = raw.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  }

  return (
    <div className="min-h-[44px] flex flex-wrap gap-1.5 items-center rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 focus-within:border-[#ffdc00]/50 focus-within:ring-1 focus-within:ring-[#ffdc00]/30 transition-colors">
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 rounded-md bg-[#ffdc00]/10 border border-[#ffdc00]/20 px-2 py-0.5 text-xs font-medium text-[#ffdc00]"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="text-[#ffdc00]/50 hover:text-[#ffdc00] transition-colors leading-none"
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => input.trim() && addTag(input)}
        placeholder={value.length === 0 ? "Add tags… (Enter or comma to add)" : ""}
        className="flex-1 min-w-[140px] bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none"
      />
    </div>
  );
}
