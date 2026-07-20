"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

const SUGGESTIONS = ["mixsoon", "Bean Essence", "sensitive skin", "PDRN", "Cardi B", "sunscreen"];

export function HomeSearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(value?: string) {
    const query = (value ?? q).trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex items-center gap-2 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-3.5 shadow-[0_1px_0_var(--color-border)]"
      >
        <Search className="h-5 w-5 shrink-0 text-[var(--color-ink-faint)]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a brand, product, ingredient or trend"
          className="w-full bg-transparent text-[15px] outline-none placeholder:text-[var(--color-ink-faint)]"
        />
        <button
          type="submit"
          className="shrink-0 rounded-md bg-[var(--color-ink)] px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          Search
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => submit(s)}
            className="rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-[12.5px] text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
