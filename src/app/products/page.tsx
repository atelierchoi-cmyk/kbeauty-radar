import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProductFilters } from "@/components/product-filters";
import { getProducts, getBrands } from "@/lib/data";

export const metadata: Metadata = { title: "Products" };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; brand?: string; category?: string; skinType?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  const brandBySlug = new Map(brands.map((b) => [b.slug, b]));

  let filtered = products;
  if (params.q) {
    const q = params.q.toLowerCase();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.englishName.toLowerCase().includes(q));
  }
  if (params.brand) filtered = filtered.filter((p) => p.brandSlug === params.brand);
  if (params.category) filtered = filtered.filter((p) => p.category === params.category);
  if (params.skinType) filtered = filtered.filter((p) => p.skinTypes.includes(params.skinType!));

  const sort = params.sort ?? "trending";
  filtered = [...filtered].sort((a, b) => {
    if (sort === "rating") return b.globalReviewScore - a.globalReviewScore;
    if (sort === "reviews") return b.reviewVolume - a.reviewVolume;
    if (sort === "newest") return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    return b.globalReviewScore + b.reviewVolume / 10000 - (a.globalReviewScore + a.reviewVolume / 10000);
  });

  const allCategories = Array.from(new Set(products.map((p) => p.category))).sort();
  const allSkinTypes = Array.from(new Set(products.flatMap((p) => p.skinTypes))).sort();

  return (
    <Section className="py-10">
      <SectionHeading
        eyebrow={`${filtered.length} of ${products.length} products`}
        title="Products"
        description="Every product tracked on the Radar, filterable by category and skin type."
      />
      <ProductFilters brands={brands} categories={allCategories} skinTypes={allSkinTypes} />
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} brand={brandBySlug.get(p.brandSlug)} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-[var(--radius-card)] border border-dashed border-[var(--color-border-strong)] p-10 text-center text-[13.5px] text-[var(--color-ink-muted)]">
            No products match these filters. Try clearing one.
          </div>
        )}
      </div>
    </Section>
  );
}
