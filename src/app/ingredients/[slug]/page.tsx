import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { TrendBadge } from "@/components/ui/trend";
import { BrandMark } from "@/components/ui/logo-mark";
import { getIngredient, getIngredients, getBrands, getProducts, getBriefs } from "@/lib/data";

export async function generateStaticParams() {
  const ingredients = await getIngredients();
  return ingredients.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ing = await getIngredient(slug);
  if (!ing) return {};
  return { title: ing.name, description: ing.overview };
}

export default async function IngredientDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [ing, brands, products, briefs] = await Promise.all([
    getIngredient(slug),
    getBrands(),
    getProducts(),
    getBriefs(),
  ]);
  if (!ing) notFound();

  const relatedBrands = brands.filter((b) => ing.relatedBrandSlugs.includes(b.slug));
  const relatedProducts = products.filter((p) => ing.relatedProductSlugs.includes(p.slug));
  const relatedBriefs = briefs.filter((b) => b.relatedBrandSlugs.some((s) => ing.relatedBrandSlugs.includes(s)));

  return (
    <div className="pb-20">
      <Section className="pt-10 pb-6 text-[12.5px] text-[var(--color-ink-faint)]">
        <Link href="/ingredients" className="hover:text-[var(--color-ink)]">
          Ingredient Radar
        </Link>
        {" / "}
        <span className="text-[var(--color-ink-muted)]">{ing.name}</span>
      </Section>

      <Section className="pb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-[28px] font-semibold tracking-tight">{ing.name}</h1>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[var(--color-ink-muted)]">{ing.overview}</p>
          </div>
          <TrendBadge pct={ing.attentionChangePct} digits={0} />
        </div>
      </Section>

      <Section className="py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[var(--color-up)]">Positive Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {ing.positiveKeywords.map((k) => (
                <span key={k} className="rounded-[var(--radius-pill)] bg-[var(--color-up-soft)] px-3 py-1 text-[12.5px] font-medium text-[var(--color-up)]">
                  {k}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[var(--color-down)]">Negative Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {ing.negativeKeywords.map((k) => (
                <span key={k} className="rounded-[var(--radius-pill)] bg-[var(--color-down-soft)] px-3 py-1 text-[12.5px] font-medium text-[var(--color-down)]">
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-8">
        <h2 className="font-display mb-4 text-[15px] font-semibold">Skin Type Notes</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ing.skinTypeNotes.map((n) => (
            <div key={n.type} className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="text-[13px] font-medium">{n.type}</div>
              <p className="mt-1 text-[13px] text-[var(--color-ink-muted)]">{n.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-8">
        <h2 className="font-display mb-4 text-[15px] font-semibold">Country Attention</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ing.countryAttention.map((c) => (
            <div key={c.country} className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="text-[13px] font-medium">{c.country}</div>
              <div className="font-display tnum mt-1 text-[20px] font-semibold">{c.score}</div>
            </div>
          ))}
        </div>
      </Section>

      {relatedBrands.length > 0 && (
        <Section className="py-8">
          <h2 className="font-display mb-4 text-[15px] font-semibold">Related Brands</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {relatedBrands.map((b) => (
              <Link key={b.slug} href={`/brands/${b.slug}`} className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 hover:border-[var(--color-ink)]">
                <BrandMark initial={b.logoInitial} color={b.logoColor} size={32} />
                <div className="text-[13.5px] font-medium">{b.englishName}</div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {relatedProducts.length > 0 && (
        <Section className="py-8">
          <h2 className="font-display mb-4 text-[15px] font-semibold">Related Products</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {relatedProducts.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 hover:border-[var(--color-ink)]">
                <div className="text-[13.5px] font-medium">{p.englishName}</div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {relatedBriefs.length > 0 && (
        <Section className="py-8">
          <h2 className="font-display mb-4 text-[15px] font-semibold">Related Radar Brief</h2>
          <div className="flex flex-col gap-2">
            {relatedBriefs.map((b) => (
              <Link key={b.slug} href={`/briefs/${b.slug}`} className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-ink)]">
                <div className="text-[13.5px] font-medium">{b.title}</div>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
