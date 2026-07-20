import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { DemoBadge } from "@/components/ui/badge";
import { TrendBadge } from "@/components/ui/trend";
import { BrandMark } from "@/components/ui/logo-mark";
import { CelebrityLiftChart, CelebrityReviewGrowthChart } from "@/components/celebrity-charts";
import { getCelebrityEvents, getBrands, getProducts } from "@/lib/data";

export const metadata: Metadata = { title: "Celebrity Impact" };

const STATUS_COLOR: Record<string, string> = {
  "Organic mention": "bg-[var(--color-up-soft)] text-[var(--color-up)]",
  "Product seeding": "bg-[var(--color-cobalt-soft)] text-[var(--color-cobalt)]",
  "Paid partnership": "bg-[var(--color-neutral-soft)] text-[var(--color-ink-muted)]",
  Unconfirmed: "bg-[var(--color-down-soft)] text-[var(--color-down)]",
};

export default async function CelebrityImpactPage() {
  const [events, brands, products] = await Promise.all([getCelebrityEvents(), getBrands(), getProducts()]);
  const brandBySlug = new Map(brands.map((b) => [b.slug, b]));
  const productBySlug = new Map(products.map((p) => [p.slug, p]));

  const sorted = [...events].sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());

  return (
    <Section className="py-10">
      <SectionHeading
        eyebrow="Exposure tracking"
        title="Celebrity Impact"
        description="Search and social lift after a public exposure moment. Commercial relationship is shown as reported — 'Unconfirmed' means no verified brand relationship was found."
      />
      <div className="mb-6 flex justify-end">
        <DemoBadge />
      </div>

      <div className="mb-10 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="font-display mb-1 text-[14px] font-semibold">Review Growth vs. Social Mentions, by Event</h2>
        <p className="mb-3 text-[12px] text-[var(--color-ink-faint)]">Percent change in the 30 days following each exposure event.</p>
        <CelebrityReviewGrowthChart events={sorted} />
      </div>

      <div className="flex flex-col gap-4">
        {sorted.map((event) => {
          const brand = brandBySlug.get(event.brandSlug);
          const product = productBySlug.get(event.productSlug);

          return (
            <div
              key={event.id}
              id={event.id}
              className="scroll-mt-24 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-3">
                  {brand && <BrandMark initial={brand.logoInitial} color={brand.logoColor} size={44} />}
                  <div>
                    <div className="font-display text-[17px] font-semibold leading-tight">
                      {event.celebrityName} × {brand?.englishName}
                    </div>
                    {product && (
                      <Link href={`/products/${product.slug}`} className="text-[13px] text-[var(--color-cobalt)] hover:underline">
                        {product.englishName}
                      </Link>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-[var(--color-ink-muted)]">
                      <span>{new Date(event.eventDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                      <span>·</span>
                      <span>{event.platform}</span>
                      <span>·</span>
                      <span>{event.eventType}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-[var(--radius-pill)] px-2.5 py-1 text-[11px] font-semibold ${STATUS_COLOR[event.commercialStatus]}`}>
                    {event.commercialStatus}
                  </span>
                  <span className="text-[11px] text-[var(--color-ink-faint)]">Confidence: {event.confidenceLevel}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 border-t border-[var(--color-border)] pt-4 sm:grid-cols-[1fr_auto]">
                <div>
                  <div className="mb-1 text-[10.5px] uppercase tracking-wide text-[var(--color-ink-faint)]">Attention Lift by Window</div>
                  <CelebrityLiftChart event={event} />
                </div>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-1">
                  <div>
                    <div className="text-[10.5px] uppercase tracking-wide text-[var(--color-ink-faint)]">Social Mentions</div>
                    <TrendBadge pct={event.socialMentionsChange} digits={0} />
                  </div>
                  <div>
                    <div className="text-[10.5px] uppercase tracking-wide text-[var(--color-ink-faint)]">Review Growth</div>
                    <TrendBadge pct={event.reviewGrowthPct} digits={0} />
                  </div>
                  <div>
                    <div className="text-[10.5px] uppercase tracking-wide text-[var(--color-ink-faint)]">Sentiment Δ</div>
                    <span className="tnum text-sm font-medium">{event.sentimentChangePts > 0 ? "+" : ""}{event.sentimentChangePts} pts</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-[11.5px] text-[var(--color-ink-faint)]">Source: {event.sourceLabel}</div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
