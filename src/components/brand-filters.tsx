"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function BrandFilters({ categories, stages }: { categories: string[]; stages: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    router.push(`${pathname}?${next.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        defaultValue={params.get("q") ?? ""}
        onKeyDown={(e) => {
          if (e.key === "Enter") setParam("q", (e.target as HTMLInputElement).value);
        }}
        placeholder="Search brand name…"
        className="w-full max-w-[220px] rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]"
      />
      <select
        value={params.get("stage") ?? ""}
        onChange={(e) => setParam("stage", e.target.value)}
        className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13px] outline-none"
      >
        <option value="">All stages</option>
        {stages.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select
        value={params.get("category") ?? ""}
        onChange={(e) => setParam("category", e.target.value)}
        className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13px] outline-none"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        value={params.get("sort") ?? "attention"}
        onChange={(e) => setParam("sort", e.target.value)}
        className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13px] outline-none"
      >
        <option value="attention">Sort: Global Attention</option>
        <option value="growth">Sort: Weekly Growth</option>
        <option value="name">Sort: Name (A-Z)</option>
      </select>
      {(params.get("q") || params.get("stage") || params.get("category")) && (
        <button
          onClick={() => router.push(pathname)}
          className="text-[13px] font-medium text-[var(--color-ink-muted)] underline underline-offset-2 hover:text-[var(--color-ink)]"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
