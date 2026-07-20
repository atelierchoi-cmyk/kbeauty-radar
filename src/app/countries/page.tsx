import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { getCountries } from "@/lib/data";

export const metadata: Metadata = { title: "Country Radar" };

export default async function CountriesPage() {
  const countries = await getCountries();
  const sorted = [...countries].sort((a, b) => b.overallAttention - a.overallAttention);

  return (
    <Section className="py-10">
      <SectionHeading
        eyebrow="Country Radar"
        title="Markets"
        description="Which K-Beauty brands and products are strongest in each tracked market."
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((c) => (
          <Link
            key={c.slug}
            href={`/countries/${c.slug}`}
            className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-ink)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-[16px] font-semibold">{c.name}</div>
                <div className="text-[12px] text-[var(--color-ink-faint)]">{c.region}</div>
              </div>
              <div className="font-display tnum text-[22px] font-semibold text-[var(--color-cobalt)]">{c.overallAttention}</div>
            </div>
            <div className="text-[12.5px] text-[var(--color-ink-muted)]">{c.popularCategories.join(", ")}</div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
