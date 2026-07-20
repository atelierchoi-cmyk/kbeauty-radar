import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { DemoBadge } from "@/components/ui/badge";
import { BrandMark } from "@/components/ui/logo-mark";
import { RadarCharts } from "@/components/radar-charts";
import { getBrands, getCountries, getTrendEvents, getIngredients } from "@/lib/data";

export const metadata: Metadata = { title: "Radar" };

const EVENT_ICON_LABEL: Record<string, string> = {
  "New product launch": "Launch",
  "Celebrity mention": "Celebrity",
  "Review surge": "Review surge",
  Reformulation: "Reformulation",
  "Retail expansion": "Retail",
  "Review milestone": "Milestone",
};

export default async function RadarPage() {
  const [brands, countries, trendEvents, ingredients] = await Promise.all([
    getBrands(),
    getCountries(),
    getTrendEvents(),
    getIngredients(),
  ]);

  const brandBySlug = new Map(brands.map((b) => [b.slug, b]));
  const sortedEvents = [...trendEvents].sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());

  const attentionByCountry = countries
    .map((c) => ({ country: c.name, attention: c.overallAttention }))
    .sort((a, b) => b.attention - a.attention);

  const growthByBrand = [...brands]
    .sort((a, b) => b.weeklyGrowthPct - a.weeklyGrowthPct)
    .slice(0, 8)
    .map((b) => ({ name: b.englishName, growth: b.weeklyGrowthPct }));

  const ingredientMentions = [...ingredients]
    .sort((a, b) => b.attentionChangePct - a.attentionChangePct)
    .map((i) => ({ name: i.name.split("(")[0].trim(), change: i.attentionChangePct }));

  return (
    <Section className="py-10">
      <SectionHeading
        eyebrow="Market dashboard"
        title="Radar"
        description="The latest movement across brands, products, countries and ingredients tracked here. Period, market and category filters below adjust what the charts show."
      />
      <div className="mb-6 flex justify-end">
        <DemoBadge label="Sample Data · 7D/30D/90D/1Y views" />
      </div>

      <RadarCharts
        attentionByCountry={attentionByCountry}
        growthByBrand={growthByBrand}
        ingredientMentions={ingredientMentions}
      />

      {/* Event stream */}
      <div className="mt-12">
        <h2 className="font-display mb-4 text-[17px] font-semibold">Event Stream</h2>
        <div className="flex flex-col gap-2">
          {sortedEvents.map((event) => {
            const brand = brandBySlug.get(event.brandSlug);
            return (
              <div
                key={event.id}
                className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  {brand && <BrandMark initial={brand.logoInitial} color={brand.logoColor} size={30} />}
                  <div>
                    <div className="flex items-center gap-2 text-[13px] font-medium">
                      <Link href={`/brands/${event.brandSlug}`} className="hover:text-[var(--color-cobalt)]">
                        {brand?.englishName}
                      </Link>
                      <span className="rounded-[var(--radius-pill)] bg-[var(--color-surface-raised)] px-2 py-0.5 text-[10.5px] font-medium text-[var(--color-ink-muted)]">
                        {EVENT_ICON_LABEL[event.eventType] ?? event.eventType}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[12.5px] text-[var(--color-ink-muted)]">{event.description}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-[11.5px] text-[var(--color-ink-faint)]">
                  <span>{new Date(event.eventDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                  <span className="tnum font-medium text-[var(--color-ink)]">Impact {event.impactValue}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
