import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { DemoBadge } from "@/components/ui/badge";
import { TrendBadge } from "@/components/ui/trend";
import { BrandMark } from "@/components/ui/logo-mark";
import { getBrands, getProducts } from "@/lib/data";
import { marketGapIndex } from "@/lib/scores";

export const metadata: Metadata = { title: "Rankings" };

const TABS = [
  { key: "brands", label: "Brands" },
  { key: "products", label: "Products" },
  { key: "fastest-growing", label: "Fastest Growing" },
  { key: "most-loved", label: "Most Loved" },
  { key: "most-polarizing", label: "Most Polarizing" },
  { key: "korea-vs-global", label: "Korea vs Global" },
] as const;

export default async function RankingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab = "brands" } = await searchParams;
  const [brands, products] = await Promise.all([getBrands(), getProducts()]);
  const brandBySlug = new Map(brands.map((b) => [b.slug, b]));

  let rows: {
    key: string;
    rank: number;
    name: string;
    sub: string;
    score: number;
    scoreLabel: string;
    growth?: number;
    href: string;
    logo?: { initial: string; color: string };
  }[] = [];

  if (tab === "brands") {
    rows = [...brands]
      .sort((a, b) => b.scores.globalAttention - a.scores.globalAttention)
      .map((b, i) => ({
        key: b.slug,
        rank: i + 1,
        name: b.englishName,
        sub: b.topCountry,
        score: b.scores.globalAttention,
        scoreLabel: "Attention",
        growth: b.weeklyGrowthPct,
        href: `/brands/${b.slug}`,
        logo: { initial: b.logoInitial, color: b.logoColor },
      }));
  } else if (tab === "products") {
    rows = [...products]
      .sort((a, b) => b.globalReviewScore - a.globalReviewScore)
      .map((p, i) => {
        const brand = brandBySlug.get(p.brandSlug);
        return {
          key: p.slug,
          rank: i + 1,
          name: p.englishName,
          sub: brand?.englishName ?? p.brandSlug,
          score: p.globalReviewScore,
          scoreLabel: "Score",
          href: `/products/${p.slug}`,
          logo: brand ? { initial: brand.logoInitial, color: brand.logoColor } : undefined,
        };
      });
  } else if (tab === "fastest-growing") {
    rows = [...products]
      .map((p) => ({ p, growth: Math.max(...p.countryResponse.map((c) => c.growthPct)) }))
      .sort((a, b) => b.growth - a.growth)
      .map(({ p, growth }, i) => {
        const brand = brandBySlug.get(p.brandSlug);
        return {
          key: p.slug,
          rank: i + 1,
          name: p.englishName,
          sub: brand?.englishName ?? p.brandSlug,
          score: growth,
          scoreLabel: "Peak growth",
          growth,
          href: `/products/${p.slug}`,
          logo: brand ? { initial: brand.logoInitial, color: brand.logoColor } : undefined,
        };
      });
  } else if (tab === "most-loved") {
    rows = [...products]
      .sort((a, b) => b.globalReviewScore - a.globalReviewScore)
      .filter((p) => p.globalReviewScore >= 78)
      .map((p, i) => {
        const brand = brandBySlug.get(p.brandSlug);
        return {
          key: p.slug,
          rank: i + 1,
          name: p.englishName,
          sub: brand?.englishName ?? p.brandSlug,
          score: p.globalReviewScore,
          scoreLabel: "Score",
          href: `/products/${p.slug}`,
          logo: brand ? { initial: brand.logoInitial, color: brand.logoColor } : undefined,
        };
      });
  } else if (tab === "most-polarizing") {
    rows = [...products]
      .map((p) => {
        const sat = p.skinTypeResponse.map((s) => s.satisfaction);
        const spread = Math.max(...sat) - Math.min(...sat);
        return { p, spread };
      })
      .sort((a, b) => b.spread - a.spread)
      .map(({ p, spread }, i) => {
        const brand = brandBySlug.get(p.brandSlug);
        return {
          key: p.slug,
          rank: i + 1,
          name: p.englishName,
          sub: brand?.englishName ?? p.brandSlug,
          score: spread,
          scoreLabel: "Spread (pts)",
          href: `/products/${p.slug}`,
          logo: brand ? { initial: brand.logoInitial, color: brand.logoColor } : undefined,
        };
      });
  } else if (tab === "korea-vs-global") {
    rows = [...products]
      .map((p) => ({ p, gap: marketGapIndex(p.globalScore, p.koreaScore) }))
      .sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap))
      .map(({ p, gap }, i) => {
        const brand = brandBySlug.get(p.brandSlug);
        return {
          key: p.slug,
          rank: i + 1,
          name: p.englishName,
          sub: brand?.englishName ?? p.brandSlug,
          score: gap,
          scoreLabel: "Gap index",
          growth: gap,
          href: `/products/${p.slug}`,
          logo: brand ? { initial: brand.logoInitial, color: brand.logoColor } : undefined,
        };
      });
  }

  return (
    <Section className="py-10">
      <SectionHeading
        eyebrow="Leaderboards"
        title="Rankings"
        description="Every ranking is built from a documented score — tap the score to see how it's calculated on Methodology."
      />

      <div className="scrollbar-thin -mx-4 mb-6 flex gap-1 overflow-x-auto border-b border-[var(--color-border)] px-4 sm:mx-0 sm:px-0">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`/rankings?tab=${t.key}`}
            className={`shrink-0 border-b-2 px-3.5 py-2.5 text-[13.5px] font-medium transition-colors ${
              tab === t.key
                ? "border-[var(--color-ink)] text-[var(--color-ink)]"
                : "border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="mb-3 flex justify-end">
        <DemoBadge />
      </div>

      <div className="scrollbar-thin overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border)]">
        <table className="w-full min-w-[480px] border-collapse text-[13.5px]">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-raised)] text-left text-[11px] uppercase tracking-wide text-[var(--color-ink-faint)]">
              <th className="w-12 px-4 py-2.5 font-medium">#</th>
              <th className="px-4 py-2.5 font-medium">Name</th>
              <th className="px-4 py-2.5 font-medium text-right">
                <Link href="/methodology" className="underline decoration-dotted underline-offset-2">
                  {rows[0]?.scoreLabel ?? "Score"}
                </Link>
              </th>
              {rows.some((r) => r.growth !== undefined) && (
                <th className="hidden px-4 py-2.5 font-medium text-right sm:table-cell">Growth</th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-raised)]">
                <td className="tnum px-4 py-3 text-[var(--color-ink-faint)]">{row.rank}</td>
                <td className="px-4 py-3">
                  <Link href={row.href} className="flex items-center gap-2.5 font-medium hover:text-[var(--color-cobalt)]">
                    {row.logo && <BrandMark initial={row.logo.initial} color={row.logo.color} size={26} />}
                    <span>
                      {row.name}
                      <span className="ml-2 font-normal text-[var(--color-ink-faint)]">{row.sub}</span>
                    </span>
                  </Link>
                </td>
                <td className="tnum px-4 py-3 text-right font-semibold">
                  {row.score > 0 && tab === "korea-vs-global" ? "+" : ""}
                  {row.score.toFixed(tab === "fastest-growing" || tab === "korea-vs-global" ? 1 : 0)}
                </td>
                {rows.some((r) => r.growth !== undefined) && (
                  <td className="hidden px-4 py-3 text-right sm:table-cell">
                    {row.growth !== undefined && <TrendBadge pct={row.growth} digits={1} />}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
