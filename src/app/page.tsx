import Link from "next/link";
import { ArrowRight, Radio } from "lucide-react";
import { HomeSearchBar } from "@/components/search-bar";
import { NewsletterForm } from "@/components/newsletter-form";
import { Section, SectionHeading, StatCard } from "@/components/ui/section";
import { BrandCard } from "@/components/brand-card";
import { DemoBadge } from "@/components/ui/badge";
import { TrendBadge, LiveDot } from "@/components/ui/trend";
import { getBrands, getProducts, getCelebrityEvents, getIngredients, getBriefs } from "@/lib/data";
import { marketGapIndex, gapLabel } from "@/lib/scores";
import { APP_TAGLINE, APP_TAGLINE_KO } from "@/lib/config";

export default async function HomePage() {
  const [brands, products, celebrityEvents, ingredients, briefs] = await Promise.all([
    getBrands(),
    getProducts(),
    getCelebrityEvents(),
    getIngredients(),
    getBriefs(),
  ]);

  const trendingBrands = [...brands].sort((a, b) => b.weeklyGrowthPct - a.weeklyGrowthPct).slice(0, 6);
  const fastestGrowingProducts = [...products]
    .map((p) => ({ product: p, growth: Math.max(...p.countryResponse.map((c) => c.growthPct)) }))
    .sort((a, b) => b.growth - a.growth)
    .slice(0, 4);

  const gapProducts = [...products]
    .map((p) => ({ product: p, gap: marketGapIndex(p.globalScore, p.koreaScore) }))
    .sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap))
    .slice(0, 4);

  const polarizing = [...products]
    .map((p) => {
      const worst = p.skinTypeResponse.reduce((a, b) => (a.satisfaction < b.satisfaction ? a : b));
      const best = p.skinTypeResponse.reduce((a, b) => (a.satisfaction > b.satisfaction ? a : b));
      return { product: p, spread: best.satisfaction - worst.satisfaction, best, worst };
    })
    .sort((a, b) => b.spread - a.spread)
    .slice(0, 3);

  const rankedIngredients = [...ingredients].sort((a, b) => b.attentionChangePct - a.attentionChangePct).slice(0, 6);

  const brandBySlug = new Map(brands.map((b) => [b.slug, b]));
  const productBySlug = new Map(products.map((p) => [p.slug, p]));

  return (
    <div className="pb-20">
      {/* Hero */}
      <Section className="pt-14 pb-10 sm:pt-20 sm:pb-14">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1">
            <LiveDot />
            <span className="text-[12px] text-[var(--color-ink-muted)]">Tracking 15 brands across 8 markets</span>
          </div>
          <h1 className="font-display text-[38px] font-semibold leading-[1.08] tracking-tight sm:text-[54px]">
            {APP_TAGLINE}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-ink-muted)] sm:text-[17px]">
            {APP_TAGLINE_KO}
          </p>
          <div className="mt-8 max-w-xl">
            <HomeSearchBar />
          </div>
        </div>
      </Section>

      {/* Today on the Radar */}
      <Section className="py-6">
        <div className="mb-4 flex items-center gap-2">
          <Radio className="h-4 w-4 text-[var(--color-ink-muted)]" />
          <h2 className="font-display text-[15px] font-semibold">Today on the Radar</h2>
          <DemoBadge />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Brands Tracked" value="15" />
          <StatCard label="Products Tracked" value="16" />
          <StatCard label="Review Signals" value="~120K" />
          <StatCard label="Markets Covered" value="8" />
        </div>
      </Section>

      {/* Trending Brands */}
      <Section className="py-10">
        <SectionHeading
          eyebrow="This week"
          title="Trending Brands"
          description="Ranked by week-over-week growth in tracked attention."
          href="/rankings?tab=brands"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trendingBrands.map((brand, i) => (
            <BrandCard key={brand.slug} brand={brand} rank={i + 1} />
          ))}
        </div>
      </Section>

      {/* Fastest Growing Products */}
      <Section className="py-10">
        <SectionHeading
          eyebrow="Products"
          title="Fastest Growing Products"
          description="Biggest recent interest change in any tracked market."
          href="/rankings?tab=fastest-growing"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {fastestGrowingProducts.map(({ product, growth }) => {
            const brand = brandBySlug.get(product.brandSlug);
            const topCountry = product.countryResponse.find((c) => c.growthPct === growth);
            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-ink)]"
              >
                <div className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
                  {brand?.englishName}
                </div>
                <div className="font-display text-[15px] font-semibold leading-tight">{product.englishName}</div>
                <div className="flex items-center justify-between">
                  <TrendBadge pct={growth} />
                  <span className="text-[12px] text-[var(--color-ink-muted)]">{topCountry?.country}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Korea vs Global */}
      <Section className="py-10">
        <SectionHeading
          eyebrow="Market gap"
          title="Korea vs. Global"
          description="Products with the widest gap between their Korea score and global score."
          href="/rankings?tab=korea-vs-global"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {gapProducts.map(({ product, gap }) => {
            const brand = brandBySlug.get(product.brandSlug);
            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-ink)]"
              >
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
                    {brand?.englishName}
                  </div>
                  <div className="font-display text-[15px] font-semibold">{product.englishName}</div>
                  <div className="mt-1 text-[12.5px] text-[var(--color-ink-muted)]">
                    Korea {product.koreaScore} · Global {product.globalScore} · {gapLabel(gap)}
                  </div>
                </div>
                <div className="tnum font-display shrink-0 text-[22px] font-semibold text-[var(--color-cobalt)]">
                  {gap > 0 ? "+" : ""}
                  {gap}
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Most Polarizing */}
      <Section className="py-10">
        <SectionHeading
          eyebrow="Divided opinion"
          title="Most Polarizing"
          description="Widest gap between the most- and least-satisfied skin-type segment."
          href="/rankings?tab=most-polarizing"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {polarizing.map(({ product, spread, best, worst }) => {
            const brand = brandBySlug.get(product.brandSlug);
            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="flex flex-col gap-2.5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-ink)]"
              >
                <div className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
                  {brand?.englishName}
                </div>
                <div className="font-display text-[15px] font-semibold leading-tight">{product.englishName}</div>
                <div className="text-[12.5px] text-[var(--color-ink-muted)]">
                  {best.type} {best.satisfaction} vs {worst.type} {worst.satisfaction}
                </div>
                <div className="tnum text-[13px] font-semibold text-[var(--color-cobalt)]">{spread} pt spread</div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Celebrity Impact */}
      <Section className="py-10">
        <SectionHeading
          eyebrow="Exposure events"
          title="Celebrity Impact"
          description="Search and social lift after a public exposure moment. Commercial relationship shown where known."
          href="/celebrity-impact"
        />
        <div className="scrollbar-thin -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
          {celebrityEvents.slice(0, 3).map((event) => {
            const brand = brandBySlug.get(event.brandSlug);
            const product = productBySlug.get(event.productSlug);
            const lift30 = event.attentionLift.find((l) => l.window === "30D");
            return (
              <Link
                key={event.id}
                href={`/celebrity-impact#${event.id}`}
                className="flex w-[260px] shrink-0 flex-col gap-2.5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-ink)] sm:w-auto"
              >
                <div className="font-display text-[15px] font-semibold leading-tight">
                  {event.celebrityName} × {brand?.englishName}
                </div>
                <div className="text-[12.5px] text-[var(--color-ink-muted)]">{product?.englishName}</div>
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="text-[var(--color-ink-faint)]">{event.commercialStatus}</span>
                  {lift30 && <TrendBadge pct={lift30.pct} digits={0} />}
                </div>
                <DemoBadge />
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Ingredient Radar */}
      <Section className="py-10">
        <SectionHeading
          eyebrow="Formulation"
          title="Ingredient Radar"
          description="Ingredients with the biggest recent change in tracked attention."
          href="/ingredients"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {rankedIngredients.map((ing) => (
            <Link
              key={ing.slug}
              href={`/ingredients/${ing.slug}`}
              className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 hover:border-[var(--color-ink)]"
            >
              <div className="text-[13px] font-medium leading-tight">{ing.name.split("(")[0].trim()}</div>
              <TrendBadge pct={ing.attentionChangePct} digits={0} />
            </Link>
          ))}
        </div>
      </Section>

      {/* Radar Brief */}
      <Section className="py-10">
        <SectionHeading eyebrow="Editorial" title="Radar Brief" description="Data interpreted, not just displayed." href="/briefs" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {briefs.map((brief) => (
            <Link
              key={brief.slug}
              href={`/briefs/${brief.slug}`}
              className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-ink)]"
            >
              <div className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">{brief.category}</div>
              <div className="font-display text-[17px] font-semibold leading-snug">{brief.title}</div>
              <p className="line-clamp-2 text-[13px] text-[var(--color-ink-muted)]">{brief.summary}</p>
              <span className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-[var(--color-ink)]">
                Read brief <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Newsletter */}
      <Section className="py-10">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-ink)] p-8 text-white sm:flex-row sm:items-center">
          <div>
            <div className="font-display text-[20px] font-semibold">The global K-Beauty market, decoded weekly.</div>
            <p className="mt-1.5 text-[13.5px] text-white/70">One email, every Monday. No spam, unsubscribe anytime.</p>
          </div>
          <NewsletterForm />
        </div>
      </Section>
    </div>
  );
}

