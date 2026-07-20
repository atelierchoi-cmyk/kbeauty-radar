import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = { title: "Methodology" };

const SCORES = [
  {
    name: "Global Attention Score",
    formula: "Weighted blend: search interest (30%) + social mentions (25%) + review growth (20%) + channel expansion (15%) + content spread (10%).",
    note: "Higher means more people are actively noticing the brand or product right now, not that it has the most total reviews historically.",
  },
  {
    name: "Review Sentiment Score",
    formula: "Positive review ratio, adjusted for verified-purchase share, source trust weight, and sample size.",
    note: "A brand with fewer but highly verified reviews can outscore one with more but less-verified reviews.",
  },
  {
    name: "Growth Momentum",
    formula: "Weighted growth rate across the last 7, 30 and 90 days, favoring sustained over one-off spikes.",
    note: "A single viral week moves this less than a similar increase sustained over a full quarter.",
  },
  {
    name: "Market Gap Index",
    formula: "Global Score − Korea Score.",
    note: "Positive means the brand or product scores higher overseas than in Korea; negative means the reverse. Near zero means the two markets broadly agree.",
  },
  {
    name: "Polarization Score",
    formula: "Higher when positive and negative review shares are both simultaneously high, with little neutral middle ground.",
    note: "A high polarization score means people tend to love or dislike the product — not that it's poorly reviewed overall.",
  },
  {
    name: "Data Confidence",
    formula: "Combines source count, review sample size, verified-purchase ratio, recency, country diversity, and incentivized-review share.",
    note: "Lower confidence usually means a newer brand or a smaller sample — treat those figures as more provisional.",
  },
];

export default function MethodologyPage() {
  return (
    <Section className="py-10">
      <SectionHeading
        eyebrow="How the numbers work"
        title="Methodology"
        description="Every score shown on K-Beauty Radar is documented here in plain language. All underlying figures in this build are demo/sample data for illustration — see each score's formula for how it would be computed against real data sources."
      />

      <div className="flex flex-col gap-4">
        {SCORES.map((s) => (
          <div key={s.name} className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h2 className="font-display text-[15px] font-semibold">{s.name}</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">
              <span className="font-medium text-[var(--color-ink)]">Formula: </span>
              {s.formula}
            </p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-2xl rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-5">
        <h2 className="font-display mb-2 text-[14px] font-semibold">Data policy, in short</h2>
        <ul className="flex flex-col gap-2 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">
          <li>Full review text is never reproduced — only aggregated statistics, summaries and keywords.</li>
          <li>Every figure carries a source and an as-of date.</li>
          <li>Sponsored, incentivized or product-seeded content is labeled separately from organic content.</li>
          <li>Celebrity exposure events are labeled &ldquo;Unconfirmed&rdquo; when no verified commercial relationship is known.</li>
          <li>Ingredient information is educational only and is not a medical or dermatological claim.</li>
        </ul>
      </div>
    </Section>
  );
}
