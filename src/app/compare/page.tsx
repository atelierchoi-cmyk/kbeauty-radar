"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { X, Plus } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { useCompareList } from "@/lib/client-store";
import type { Product, Brand } from "@/lib/types";

interface ProductsData {
  products: Product[];
  brands: Brand[];
}

const ROWS: { label: string; render: (p: Product) => ReactNode }[] = [
  { label: "Price", render: (p) => `${p.currency} ${p.priceMin}–${p.priceMax}` },
  { label: "Size", render: (p) => p.size },
  { label: "Category", render: (p) => p.category },
  { label: "Global Score", render: (p) => p.globalReviewScore },
  { label: "Korea Score", render: (p) => p.koreaScore },
  { label: "Global Region Score", render: (p) => p.globalScore },
  { label: "Review Volume", render: (p) => p.reviewVolume.toLocaleString() },
  { label: "Data Confidence", render: (p) => p.dataConfidence },
  { label: "Best For", render: (p) => p.bestFor.slice(0, 2).join(", ") },
  { label: "Top Likes", render: (p) => p.likes.slice(0, 2).join(", ") },
  { label: "Top Dislikes", render: (p) => p.dislikes.slice(0, 2).join(", ") },
];

export default function ComparePage() {
  const { items, remove } = useCompareList();
  const [data, setData] = useState<ProductsData | null>(null);

  useEffect(() => {
    fetch("/api/compare-data")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ products: [], brands: [] }));
  }, []);

  const products = (data?.products ?? []).filter((p) => items.includes(p.slug));
  const brandBySlug = new Map((data?.brands ?? []).map((b) => [b.slug, b]));

  return (
    <Section className="py-10">
      <SectionHeading
        eyebrow={`${products.length} of 4 slots used`}
        title="Compare"
        description="Add up to 4 products from any product page to compare them side by side. Your list is saved on this device."
      />

      {products.length === 0 ? (
        <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border-strong)] p-12 text-center">
          <p className="text-[14px] text-[var(--color-ink-muted)]">
            Nothing to compare yet. Browse{" "}
            <Link href="/products" className="font-medium text-[var(--color-cobalt)] hover:underline">
              Products
            </Link>{" "}
            and tap &ldquo;Add to Compare&rdquo; on up to 4 items.
          </p>
        </div>
      ) : (
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-[13.5px]">
            <thead>
              <tr>
                <th className="w-40 px-3 py-3 text-left text-[11px] uppercase tracking-wide text-[var(--color-ink-faint)]" />
                {products.map((p) => {
                  const brand = brandBySlug.get(p.brandSlug);
                  return (
                    <th key={p.slug} className="min-w-[180px] px-3 py-3 text-left align-top">
                      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
                        <button
                          onClick={() => remove(p.slug)}
                          className="mb-2 flex items-center gap-1 text-[11px] font-medium text-[var(--color-ink-faint)] hover:text-[var(--color-down)]"
                        >
                          <X className="h-3 w-3" /> Remove
                        </button>
                        <div className="text-[11px] uppercase tracking-wide text-[var(--color-ink-faint)]">
                          {brand?.englishName}
                        </div>
                        <Link href={`/products/${p.slug}`} className="font-display text-[14px] font-semibold hover:text-[var(--color-cobalt)]">
                          {p.englishName}
                        </Link>
                      </div>
                    </th>
                  );
                })}
                {products.length < 4 && (
                  <th className="min-w-[180px] px-3 py-3 align-top">
                    <Link
                      href="/products"
                      className="flex h-full min-h-[90px] flex-col items-center justify-center gap-1 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border-strong)] text-[12px] text-[var(--color-ink-faint)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
                    >
                      <Plus className="h-4 w-4" />
                      Add product
                    </Link>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-t border-[var(--color-border)]">
                  <td className="px-3 py-3 text-[12.5px] font-medium text-[var(--color-ink-muted)]">{row.label}</td>
                  {products.map((p) => (
                    <td key={p.slug} className="tnum px-3 py-3">
                      {row.render(p)}
                    </td>
                  ))}
                  {products.length < 4 && <td />}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}
