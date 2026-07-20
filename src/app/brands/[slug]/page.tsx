import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Check, AlertTriangle } from "lucide-react";
import { Section, StatCard } from "@/components/ui/section";
import { BrandMark } from "@/components/ui/logo-mark";
import { StageBadge, DemoBadge, ConfidenceBadge } from "@/components/ui/badge";
import { TrendBadge } from "@/components/ui/trend";
import { RadarScoreChart } from "@/components/ui/radar-score-chart";
import { ProductCard } from "@/components/product-card";
import { FollowBrandButton } from "@/components/follow-button";
import { getBrand, getBrands, getProductsByBrand, getTrendEventsByBrand } from "@/lib/data";

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrand(slug);
  if (!brand) return {};
  return {
    title: brand.englishName,
    description: brand.description,
    openGraph: { title: `${brand.englishName} · K-Beauty Radar`, description: brand.positioning },
  };
}

export default async function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [brand, allBrands, products, timeline] = await Promise.all([
    getBrand(slug),
    getBrands(),
    getProductsByBrand(slug),
    getTrendEventsByBrand(slug),
  ]);

  if (!brand) notFound();

  const competitors = allBrands.filter((b) => brand.competitorSlugs.includes(b.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.englishName,
    description: brand.description,
    url: brand.officialUrl,
    foundingLocation: brand.countryOfOrigin,
  };

  return (
    <div className="pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <Section className="pt-10 pb-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <BrandMark initial={brand.logoInitial} color={brand.logoColor} size={56} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-[28px] font-semibold tracking-tight sm:text-[34px]">
                  {brand.englishName}
                </h1>
                <StageBadge stage={brand.growthStage} />
              </div>
              <div className="mt-0.5 text-[14px] text-[var(--color-ink-faint)]">{brand.name}</div>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                {brand.positioning}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-[var(--color-ink-muted)]">
                <span>{brand.countryOfOrigin}</span>
                <span>·</span>
                <span>Founded {brand.foundedYear}</span>
                <span>·</span>
                <span>{brand.categories.join(", ")}</span>
                <a
                  href={brand.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[var(--color-cobalt)] hover:underline"
                >
                  Official site <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <FollowBrandButton slug={brand.slug} />
          </div>
        </div>
      </Section>

      {/* Radar Score */}
      <Section className="py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-display text-[15px] font-semibold">Radar Score</h2>
              <ConfidenceBadge score={brand.scores.dataConfidence} />
            </div>
            <RadarScoreChart
              scores={{
                globalAttention: brand.scores.globalAttention,
                reviewSentiment: brand.scores.reviewSentiment,
                growthMomentum: brand.scores.growthMomentum,
                koreaStrength: brand.scores.koreaStrength,
                globalStrength: brand.scores.globalStrength,
                viralImpact: brand.scores.viralImpact,
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Global Attention" value={String(brand.scores.globalAttention)} />
            <StatCard label="Review Sentiment" value={String(brand.scores.reviewSentiment)} />
            <StatCard label="Growth Momentum" value={String(brand.scores.growthMomentum)} />
            <StatCard label="Viral Impact" value={String(brand.scores.viralImpact)} />
            <StatCard label="Korea Strength" value={String(brand.scores.koreaStrength)} />
            <StatCard label="Global Strength" value={String(brand.scores.globalStrength)} />
            <div className="col-span-2 flex items-center justify-between rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <span className="text-[12px] text-[var(--color-ink-muted)]">This week</span>
              <TrendBadge pct={brand.weeklyGrowthPct} />
            </div>
          </div>
        </div>
      </Section>

      {/* Executive Summary */}
      <Section className="py-8">
        <h2 className="font-display mb-3 text-[15px] font-semibold">Executive Summary</h2>
        <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <ul className="flex flex-col gap-2.5">
            {brand.summary.map((line, i) => (
              <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-[var(--color-ink)]">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-ink-faint)]" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Strengths / Watchouts */}
      <Section className="py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h3 className="mb-3 flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-up)]">
              <Check className="h-4 w-4" /> Key Strengths
            </h3>
            <ul className="flex flex-col gap-2">
              {brand.strengths.map((s, i) => (
                <li key={i} className="text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h3 className="mb-3 flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-down)]">
              <AlertTriangle className="h-4 w-4" /> Watchouts
            </h3>
            <ul className="flex flex-col gap-2">
              {brand.watchouts.map((s, i) => (
                <li key={i} className="text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Market breakdown */}
      <Section className="py-8">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="font-display text-[15px] font-semibold">Market-by-Market</h2>
          <DemoBadge />
        </div>
        <div className="scrollbar-thin overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border)]">
          <table className="w-full min-w-[640px] border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-raised)] text-left text-[11px] uppercase tracking-wide text-[var(--color-ink-faint)]">
                <th className="px-4 py-2.5 font-medium">Market</th>
                <th className="px-4 py-2.5 font-medium">Attention</th>
                <th className="px-4 py-2.5 font-medium">Sentiment</th>
                <th className="px-4 py-2.5 font-medium">Review Volume</th>
                <th className="px-4 py-2.5 font-medium">Growth</th>
                <th className="px-4 py-2.5 font-medium">Top Keywords</th>
              </tr>
            </thead>
            <tbody>
              {brand.marketBreakdown.map((m) => (
                <tr key={m.country} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="px-4 py-3 font-medium">{m.country}</td>
                  <td className="tnum px-4 py-3">{m.attention}</td>
                  <td className="tnum px-4 py-3">{m.sentiment}</td>
                  <td className="tnum px-4 py-3">{m.reviewVolume.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <TrendBadge pct={m.growthPct} />
                  </td>
                  <td className="px-4 py-3 text-[var(--color-ink-muted)]">{m.topKeywords.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Products */}
      {products.length > 0 && (
        <Section className="py-8">
          <h2 className="font-display mb-4 text-[15px] font-semibold">Featured Products</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} brand={brand} />
            ))}
          </div>
        </Section>
      )}

      {/* Review keywords */}
      <Section className="py-8">
        <h2 className="font-display mb-4 text-[15px] font-semibold">Review Keywords</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[var(--color-up)]">Positive</div>
            <div className="flex flex-wrap gap-2">
              {brand.positiveKeywords.map((k) => (
                <span key={k} className="rounded-[var(--radius-pill)] bg-[var(--color-up-soft)] px-3 py-1 text-[12.5px] font-medium text-[var(--color-up)]">
                  {k}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[var(--color-down)]">Negative</div>
            <div className="flex flex-wrap gap-2">
              {brand.negativeKeywords.map((k) => (
                <span key={k} className="rounded-[var(--radius-pill)] bg-[var(--color-down-soft)] px-3 py-1 text-[12.5px] font-medium text-[var(--color-down)]">
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      {(brand.timeline.length > 0 || timeline.length > 0) && (
        <Section className="py-8">
          <h2 className="font-display mb-4 text-[15px] font-semibold">Trend Timeline</h2>
          <ol className="flex flex-col gap-4 border-l border-[var(--color-border)] pl-5">
            {brand.timeline.map((event, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-cobalt)]" />
                <div className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
                  {new Date(event.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  {" · "}
                  {event.type}
                </div>
                <div className="text-[13.5px] text-[var(--color-ink)]">{event.label}</div>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* Competitors */}
      {competitors.length > 0 && (
        <Section className="py-8">
          <h2 className="font-display mb-4 text-[15px] font-semibold">Competitor Brands</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {competitors.map((c) => (
              <Link
                key={c.slug}
                href={`/brands/${c.slug}`}
                className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 hover:border-[var(--color-ink)]"
              >
                <BrandMark initial={c.logoInitial} color={c.logoColor} size={32} />
                <div>
                  <div className="text-[13.5px] font-medium leading-tight">{c.englishName}</div>
                  <div className="text-[11.5px] text-[var(--color-ink-faint)]">{c.growthStage}</div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
