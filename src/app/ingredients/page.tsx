import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { TrendBadge } from "@/components/ui/trend";
import { getIngredients } from "@/lib/data";

export const metadata: Metadata = { title: "Ingredient Radar" };

export default async function IngredientsPage() {
  const ingredients = await getIngredients();
  const sorted = [...ingredients].sort((a, b) => b.attentionChangePct - a.attentionChangePct);

  return (
    <Section className="py-10">
      <SectionHeading
        eyebrow="Ingredient Radar"
        title="Ingredients"
        description="Ingredients tracked across brands and products, ranked by recent change in attention. Educational information only — not a medical or dermatological claim."
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((ing) => (
          <Link
            key={ing.slug}
            href={`/ingredients/${ing.slug}`}
            className="flex flex-col gap-2.5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-ink)]"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="font-display text-[15px] font-semibold leading-tight">{ing.name}</div>
              <TrendBadge pct={ing.attentionChangePct} digits={0} />
            </div>
            <p className="line-clamp-2 text-[13px] text-[var(--color-ink-muted)]">{ing.overview}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
