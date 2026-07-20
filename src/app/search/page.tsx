import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { BrandMark } from "@/components/ui/logo-mark";
import { HomeSearchBar } from "@/components/search-bar";
import { searchAll, getBrands } from "@/lib/data";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const [results, brands] = await Promise.all([searchAll(q), getBrands()]);
  const brandBySlug = new Map(brands.map((b) => [b.slug, b]));

  const total =
    results.brands.length + results.products.length + results.ingredients.length + results.briefs.length;

  return (
    <Section className="py-10">
      <SectionHeading eyebrow="Search" title={q ? `Results for "${q}"` : "Search"} />
      <div className="mb-8 max-w-xl">
        <HomeSearchBar />
      </div>

      {!q && (
        <p className="text-[13.5px] text-[var(--color-ink-muted)]">
          Search for a brand, product, ingredient or trend above.
        </p>
      )}

      {q && total === 0 && (
        <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border-strong)] p-10 text-center text-[13.5px] text-[var(--color-ink-muted)]">
          No results for &ldquo;{q}&rdquo;. Try a different spelling or a broader term.
        </div>
      )}

      {results.brands.length > 0 && (
        <div className="mb-8">
          <h2 className="font-display mb-3 text-[14px] font-semibold">Brands</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {results.brands.map((b) => (
              <Link key={b.slug} href={`/brands/${b.slug}`} className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 hover:border-[var(--color-ink)]">
                <BrandMark initial={b.logoInitial} color={b.logoColor} size={32} />
                <div>
                  <div className="text-[13.5px] font-medium">{b.englishName}</div>
                  <div className="text-[11.5px] text-[var(--color-ink-faint)]">{b.positioning}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {results.products.length > 0 && (
        <div className="mb-8">
          <h2 className="font-display mb-3 text-[14px] font-semibold">Products</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {results.products.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 hover:border-[var(--color-ink)]">
                <div className="text-[11px] uppercase tracking-wide text-[var(--color-ink-faint)]">{brandBySlug.get(p.brandSlug)?.englishName}</div>
                <div className="text-[13.5px] font-medium">{p.englishName}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {results.ingredients.length > 0 && (
        <div className="mb-8">
          <h2 className="font-display mb-3 text-[14px] font-semibold">Ingredients</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {results.ingredients.map((i) => (
              <Link key={i.slug} href={`/ingredients/${i.slug}`} className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 hover:border-[var(--color-ink)]">
                <div className="text-[13.5px] font-medium">{i.name}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {results.briefs.length > 0 && (
        <div className="mb-8">
          <h2 className="font-display mb-3 text-[14px] font-semibold">Radar Brief</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {results.briefs.map((b) => (
              <Link key={b.slug} href={`/briefs/${b.slug}`} className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 hover:border-[var(--color-ink)]">
                <div className="text-[13.5px] font-medium">{b.title}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
