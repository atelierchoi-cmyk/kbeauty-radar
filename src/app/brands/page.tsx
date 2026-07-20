import type { Metadata } from "next";
import { BrandCard } from "@/components/brand-card";
import { Section, SectionHeading } from "@/components/ui/section";
import { BrandFilters } from "@/components/brand-filters";
import { getBrands } from "@/lib/data";

export const metadata: Metadata = { title: "Brands" };

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; stage?: string; category?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const brands = await getBrands();

  let filtered = brands;
  if (params.q) {
    const q = params.q.toLowerCase();
    filtered = filtered.filter(
      (b) => b.name.toLowerCase().includes(q) || b.englishName.toLowerCase().includes(q)
    );
  }
  if (params.stage) {
    filtered = filtered.filter((b) => b.growthStage === params.stage);
  }
  if (params.category) {
    filtered = filtered.filter((b) => b.categories.includes(params.category!));
  }

  const sort = params.sort ?? "attention";
  filtered = [...filtered].sort((a, b) => {
    if (sort === "growth") return b.weeklyGrowthPct - a.weeklyGrowthPct;
    if (sort === "name") return a.englishName.localeCompare(b.englishName);
    return b.scores.globalAttention - a.scores.globalAttention;
  });

  const allCategories = Array.from(new Set(brands.flatMap((b) => b.categories))).sort();
  const allStages = Array.from(new Set(brands.map((b) => b.growthStage)));

  return (
    <Section className="py-10">
      <SectionHeading
        eyebrow={`${filtered.length} of ${brands.length} brands`}
        title="Brands"
        description="Every brand tracked on the Radar, filterable by growth stage and category."
      />
      <BrandFilters categories={allCategories} stages={allStages} />
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((brand) => (
          <BrandCard key={brand.slug} brand={brand} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-[var(--radius-card)] border border-dashed border-[var(--color-border-strong)] p-10 text-center text-[13.5px] text-[var(--color-ink-muted)]">
            No brands match these filters. Try clearing one.
          </div>
        )}
      </div>
    </Section>
  );
}
