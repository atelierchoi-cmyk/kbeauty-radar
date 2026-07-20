import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/section";
import { DemoBadge, ConfidenceBadge } from "@/components/ui/badge";
import { TrendBadge } from "@/components/ui/trend";
import { SaveProductButton, CompareAddButton } from "@/components/follow-button";
import { ProductVisual } from "@/components/ui/product-visual";
import { ReactionBar } from "@/components/reaction-bar";
import { ProductCommunityReviews } from "@/components/community-reviews";
import {
  getProduct,
  getProducts,
  getBrand,
  getReviewAggregatesByProduct,
  getIngredients,
} from "@/lib/data";
import { marketGapIndex, gapLabel } from "@/lib/scores";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: product.englishName,
    description: product.description,
    openGraph: { title: `${product.englishName} · K-Beauty Radar`, description: product.description },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [brand, reviews, ingredients] = await Promise.all([
    getBrand(product.brandSlug),
    getReviewAggregatesByProduct(slug),
    getIngredients(),
  ]);

  const keyIngredients = ingredients.filter((i) => product.keyIngredientSlugs.includes(i.slug));
  const gap = marketGapIndex(product.globalScore, product.koreaScore);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.englishName,
    description: product.description,
    brand: { "@type": "Brand", name: brand?.englishName },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (product.globalReviewScore / 20).toFixed(1),
      reviewCount: product.reviewVolume,
    },
  };

  return (
    <div className="pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Section className="pt-8 pb-6 text-[12.5px] text-[var(--color-ink-faint)]">
        <Link href="/products" className="hover:text-[var(--color-ink)]">
          Products
        </Link>
        {" / "}
        {brand && (
          <>
            <Link href={`/brands/${brand.slug}`} className="hover:text-[var(--color-ink)]">
              {brand.englishName}
            </Link>
            {" / "}
          </>
        )}
        <span className="text-[var(--color-ink-muted)]">{product.englishName}</span>
      </Section>

      {/* Header */}
      <Section className="pb-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[340px_1fr]">
          <ProductVisual category={product.category} imageTone={product.imageTone} imageUrl={product.imageUrl} size="hero" />
          <div>
            <div className="text-[12px] font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
              {brand?.englishName}
            </div>
            <h1 className="font-display mt-1 text-[26px] font-semibold tracking-tight sm:text-[32px]">
              {product.englishName}
            </h1>
            <div className="mt-1 text-[13.5px] text-[var(--color-ink-faint)]">{product.name}</div>
            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
              {product.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-[var(--color-ink-muted)]">
              <span className="tnum">
                {product.currency} {product.priceMin}–{product.priceMax}
              </span>
              <span>·</span>
              <span>{product.size}</span>
              <span>·</span>
              <span>{product.usageStep}</span>
              {product.reformulated && (
                <>
                  <span>·</span>
                  <span className="text-[var(--color-cobalt)]">Reformulated</span>
                </>
              )}
            </div>
            <div className="mt-5 flex gap-2">
              <SaveProductButton slug={product.slug} />
              <CompareAddButton slug={product.slug} />
            </div>
          </div>
        </div>
      </Section>

      {/* At a glance */}
      <Section className="py-8">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="font-display text-[15px] font-semibold">At a Glance</h2>
          <ConfidenceBadge score={product.dataConfidence} />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <div className="text-[11px] uppercase tracking-wide text-[var(--color-ink-faint)]">Global Review Score</div>
            <div className="font-display tnum mt-1 text-[24px] font-semibold">{product.globalReviewScore}</div>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <div className="text-[11px] uppercase tracking-wide text-[var(--color-ink-faint)]">Korea Score</div>
            <div className="font-display tnum mt-1 text-[24px] font-semibold">{product.koreaScore}</div>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <div className="text-[11px] uppercase tracking-wide text-[var(--color-ink-faint)]">Market Gap Index</div>
            <div className="font-display tnum mt-1 text-[24px] font-semibold text-[var(--color-cobalt)]">
              {gap > 0 ? "+" : ""}
              {gap}
            </div>
            <div className="mt-0.5 text-[11px] text-[var(--color-ink-faint)]">{gapLabel(gap)}</div>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <div className="text-[11px] uppercase tracking-wide text-[var(--color-ink-faint)]">Review Volume</div>
            <div className="font-display tnum mt-1 text-[24px] font-semibold">{product.reviewVolume.toLocaleString()}</div>
          </div>
        </div>
        <div className="mt-2 text-[11.5px] text-[var(--color-ink-faint)]">
          Last updated {new Date(product.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </div>
      </Section>

      {/* Verdict */}
      <Section className="py-8">
        <h2 className="font-display mb-4 text-[15px] font-semibold">Verdict</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h3 className="mb-3 text-[13px] font-semibold text-[var(--color-up)]">Best for</h3>
            <ul className="flex flex-col gap-1.5">
              {product.bestFor.map((s, i) => (
                <li key={i} className="text-[13.5px] text-[var(--color-ink-muted)]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h3 className="mb-3 text-[13px] font-semibold text-[var(--color-down)]">Consider before buying</h3>
            <ul className="flex flex-col gap-1.5">
              {product.considerBefore.map((s, i) => (
                <li key={i} className="text-[13.5px] text-[var(--color-ink-muted)]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Likes / dislikes */}
      <Section className="py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[var(--color-up)]">What people like</h3>
            <ul className="flex flex-col gap-2">
              {product.likes.map((s, i) => (
                <li key={i} className="rounded-md bg-[var(--color-up-soft)] px-3 py-2 text-[13px] text-[var(--color-ink)]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[var(--color-down)]">What people dislike</h3>
            <ul className="flex flex-col gap-2">
              {product.dislikes.map((s, i) => (
                <li key={i} className="rounded-md bg-[var(--color-down-soft)] px-3 py-2 text-[13px] text-[var(--color-ink)]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Domestic vs overseas review comparison */}
      <Section className="py-8">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="font-display text-[15px] font-semibold">Domestic vs. Overseas Reviews</h2>
          <DemoBadge />
        </div>
        <div className="scrollbar-thin overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border)]">
          <table className="w-full min-w-[600px] border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-raised)] text-left text-[11px] uppercase tracking-wide text-[var(--color-ink-faint)]">
                <th className="px-4 py-2.5 font-medium">Source</th>
                <th className="px-4 py-2.5 font-medium">Market</th>
                <th className="px-4 py-2.5 font-medium text-right">Rating</th>
                <th className="px-4 py-2.5 font-medium text-right">Reviews</th>
                <th className="px-4 py-2.5 font-medium text-right">Verified Purchase</th>
                <th className="px-4 py-2.5 font-medium text-right">Sponsored Ratio</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="px-4 py-3 font-medium">{r.source}</td>
                  <td className="px-4 py-3">{r.country}</td>
                  <td className="tnum px-4 py-3 text-right">{r.rating.toFixed(1)}</td>
                  <td className="tnum px-4 py-3 text-right">{r.reviewCount.toLocaleString()}</td>
                  <td className="tnum px-4 py-3 text-right">{Math.round(r.verifiedPurchaseRatio * 100)}%</td>
                  <td className="tnum px-4 py-3 text-right">{Math.round(r.incentivizedRatio * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11.5px] text-[var(--color-ink-faint)]">
          Sample aggregated data as of {product.lastUpdated}. Individual review text is not reproduced here — see each source
          directly for full reviews.
        </p>
      </Section>

      {/* Skin type response */}
      <Section className="py-8">
        <h2 className="font-display mb-4 text-[15px] font-semibold">Response by Skin Type</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {product.skinTypeResponse.map((s) => (
            <div key={s.type} className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="text-[13px] font-medium">{s.type}</div>
              <div className="font-display tnum mt-1 text-[22px] font-semibold">{s.satisfaction}</div>
              <div className="mt-1 text-[11px] text-[var(--color-ink-faint)]">n = {s.sampleSize.toLocaleString()}</div>
              {s.positiveKeywords.length > 0 && (
                <div className="mt-2 text-[11.5px] text-[var(--color-up)]">+{s.positiveKeywords.join(", ")}</div>
              )}
              {s.negativeKeywords.length > 0 && (
                <div className="mt-1 text-[11.5px] text-[var(--color-down)]">-{s.negativeKeywords.join(", ")}</div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Country response */}
      <Section className="py-8">
        <h2 className="font-display mb-4 text-[15px] font-semibold">Response by Country</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {product.countryResponse.map((c) => (
            <div key={c.country} className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="text-[13px] font-medium">{c.country}</div>
              <div className="font-display tnum mt-1 text-[20px] font-semibold">{c.score}</div>
              <div className="mt-1.5 flex items-center justify-between text-[11.5px] text-[var(--color-ink-faint)]">
                <span>{c.reviewVolume.toLocaleString()} reviews</span>
                <TrendBadge pct={c.growthPct} digits={0} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Key ingredients */}
      {keyIngredients.length > 0 && (
        <Section className="py-8">
          <h2 className="font-display mb-4 text-[15px] font-semibold">Key Ingredients</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {keyIngredients.map((ing) => (
              <Link
                key={ing.slug}
                href={`/ingredients/${ing.slug}`}
                className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-ink)]"
              >
                <div className="font-display text-[14px] font-semibold">{ing.name}</div>
                <p className="mt-1 line-clamp-2 text-[13px] text-[var(--color-ink-muted)]">{ing.overview}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Retail links */}
      <Section className="py-8">
        <h2 className="font-display mb-4 text-[15px] font-semibold">Where to Buy</h2>
        <p className="mb-3 text-[12px] text-[var(--color-ink-faint)]">
          MVP note: these link out to each retailer&rsquo;s search results — direct checkout is not implemented yet.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {product.retailLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-between gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 text-[13px] font-medium hover:border-[var(--color-ink)]"
            >
              <span>{link.name}</span>
              <span className="flex items-center gap-1">
                <span className="text-[10px] font-normal uppercase tracking-wide text-[var(--color-ink-faint)]">
                  {link.type === "Official Store" ? "Official" : "Affiliate"}
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-[var(--color-ink-faint)]" />
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* Quick reaction */}
      <Section className="py-8">
        <ReactionBar productSlug={product.slug} />
      </Section>

      {/* Community reviews */}
      <Section className="py-8">
        <ProductCommunityReviews productSlug={product.slug} productLabel={product.englishName} />
      </Section>
    </div>
  );
}
