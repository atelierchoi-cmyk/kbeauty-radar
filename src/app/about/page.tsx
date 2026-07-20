import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { APP_NAME } from "@/lib/config";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Section className="py-10">
      <SectionHeading eyebrow="About" title={`About ${APP_NAME}`} />
      <div className="max-w-2xl">
        <p className="mb-4 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
          {APP_NAME} tracks how K-Beauty brands and products are reviewed, discussed and discovered across
          markets, and shows the current picture alongside how it&rsquo;s changing. The first release focuses on
          organizing existing public review and interest signals into a single, sourced view — not on selling
          products directly.
        </p>
        <p className="mb-4 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
          Who this is for: consumers deciding what to try next, brand teams checking how their products read
          in different markets, and buyers or researchers scoping which Korean brands are gaining ground where.
        </p>
        <p className="mb-4 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
          This build ships with sample/demo data clearly labeled throughout, so the product experience can be
          evaluated end-to-end before connecting live data sources. See{" "}
          <a href="/methodology" className="font-medium text-[var(--color-cobalt)] hover:underline">
            Methodology
          </a>{" "}
          for how each score is intended to be calculated once real data is connected.
        </p>
        <p className="text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
          Not yet connected: live scraping or API integrations with review platforms, payment/checkout,
          authenticated cross-device sync, and moderation tooling for user-submitted content.
        </p>
      </div>
    </Section>
  );
}
