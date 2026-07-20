import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, StatCard } from "@/components/ui/section";
import { BrandMark } from "@/components/ui/logo-mark";
import { getCountry, getCountries, getBrands, getProducts } from "@/lib/data";

export async function generateStaticParams() {
  const countries = await getCountries();
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = await getCountry(slug);
  if (!country) return {};
  return { title: `${country.name} · Country Radar` };
}

export default async function CountryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [country, brands, products] = await Promise.all([getCountry(slug), getBrands(), getProducts()]);
  if (!country) notFound();

  const risingBrands = brands.filter((b) => country.risingBrandSlugs.includes(b.slug));
  const risingProducts = products.filter((p) => country.risingProductSlugs.includes(p.slug));
  const brandBySlug = new Map(brands.map((b) => [b.slug, b]));

  return (
    <div className="pb-20">
      <Section className="pt-10 pb-6 text-[12.5px] text-[var(--color-ink-faint)]">
        <Link href="/countries" className="hover:text-[var(--color-ink)]">
          Country Radar
        </Link>
        {" / "}
        <span className="text-[var(--color-ink-muted)]">{country.name}</span>
      </Section>

      <Section className="pb-8">
        <h1 className="font-display text-[30px] font-semibold tracking-tight">{country.name}</h1>
        <p className="mt-1 text-[13.5px] text-[var(--color-ink-muted)]">{country.region} · {country.climate}</p>
      </Section>

      <Section className="py-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Overall Attention" value={String(country.overallAttention)} />
          <StatCard label="Popular Categories" value={country.popularCategories.length.toString()} sublabel={country.popularCategories.join(", ")} />
          <StatCard label="Typical Price Band" value={country.priceBand} />
          <StatCard label="Main Channels" value={country.channels.length.toString()} sublabel={country.channels.join(", ")} />
        </div>
      </Section>

      <Section className="py-8">
        <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h2 className="font-display mb-2 text-[14px] font-semibold">Korea Gap Note</h2>
          <p className="text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">{country.koreaGapNote}</p>
        </div>
      </Section>

      <Section className="py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[var(--color-up)]">Positive Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {country.positiveKeywords.map((k) => (
                <span key={k} className="rounded-[var(--radius-pill)] bg-[var(--color-up-soft)] px-3 py-1 text-[12.5px] font-medium text-[var(--color-up)]">
                  {k}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[var(--color-down)]">Negative Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {country.negativeKeywords.map((k) => (
                <span key={k} className="rounded-[var(--radius-pill)] bg-[var(--color-down-soft)] px-3 py-1 text-[12.5px] font-medium text-[var(--color-down)]">
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {risingBrands.length > 0 && (
        <Section className="py-8">
          <h2 className="font-display mb-4 text-[15px] font-semibold">Rising Brands in {country.name}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {risingBrands.map((b) => (
              <Link key={b.slug} href={`/brands/${b.slug}`} className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 hover:border-[var(--color-ink)]">
                <BrandMark initial={b.logoInitial} color={b.logoColor} size={32} />
                <div className="text-[13.5px] font-medium">{b.englishName}</div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {risingProducts.length > 0 && (
        <Section className="py-8">
          <h2 className="font-display mb-4 text-[15px] font-semibold">Rising Products in {country.name}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {risingProducts.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 hover:border-[var(--color-ink)]">
                <div className="text-[11px] uppercase tracking-wide text-[var(--color-ink-faint)]">{brandBySlug.get(p.brandSlug)?.englishName}</div>
                <div className="text-[13.5px] font-medium">{p.englishName}</div>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
