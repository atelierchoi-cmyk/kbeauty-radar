import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { getBriefs } from "@/lib/data";

export const metadata: Metadata = { title: "Radar Brief" };

export default async function BriefsPage() {
  const briefs = await getBriefs();
  const sorted = [...briefs].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <Section className="py-10">
      <SectionHeading
        eyebrow="Editorial"
        title="Radar Brief"
        description="Data interpreted, not just displayed. Each brief states its data-as-of date and sources."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sorted.map((brief) => (
          <Link
            key={brief.slug}
            href={`/briefs/${brief.slug}`}
            className="flex flex-col gap-2.5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-ink)]"
          >
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
              <span>{brief.category}</span>
              <span>·</span>
              <span>{new Date(brief.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
            </div>
            <div className="font-display text-[18px] font-semibold leading-snug">{brief.title}</div>
            <p className="text-[13.5px] text-[var(--color-ink-muted)]">{brief.summary}</p>
            <span className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-[var(--color-ink)]">
              Read brief <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
