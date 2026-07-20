"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Brand } from "@/lib/types";

export function ProductFilters({
  brands,
  categories,
  skinTypes,
}: {
  brands: Brand[];
  categories: string[];
  skinTypes: string[];
}) {
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
        placeholder="Search product name…"
        className="w-full max-w-[220px] rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]"
      />
      <select
        value={params.get("brand") ?? ""}
        onChange={(e) => setParam("brand", e.target.value)}
        className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13px] outline-none"
      >
        <option value="">All brands</option>
        {brands.map((b) => (
          <option key={b.slug} value={b.slug}>
            {b.englishName}
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
        value={params.get("skinType") ?? ""}
        onChange={(e) => setParam("skinType", e.target.value)}
        className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13px] outline-none"
      >
        <option value="">All skin types</option>
        {skinTypes.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select
        value={params.get("sort") ?? "trending"}
        onChange={(e) => setParam("sort", e.target.value)}
        className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13px] outline-none"
      >
        <option value="trending">Sort: Trending</option>
        <option value="rating">Sort: Highest Rated</option>
        <option value="reviews">Sort: Most Reviewed</option>
        <option value="newest">Sort: Newly Updated</option>
      </select>
      {(params.get("q") || params.get("brand") || params.get("category") || params.get("skinType")) && (
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
