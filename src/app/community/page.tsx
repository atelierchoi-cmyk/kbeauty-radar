"use client";

import { useMemo } from "react";
import Link from "next/link";
import { MessageCircle, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { useActivityFeed } from "@/lib/client-store";

export default function CommunityPage() {
  const { feed } = useActivityFeed();

  const topContributors = useMemo(() => {
    const counts = new Map<string, number>();
    feed.forEach((entry) => counts.set(entry.author, (counts.get(entry.author) ?? 0) + 1));
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [feed]);

  return (
    <Section className="py-10">
      <SectionHeading
        eyebrow="Community"
        title="Community Activity"
        description="Reviews and discussion written directly by K-Beauty Radar visitors — saved on this device for this demo build. Sign in and cross-device sync would carry this to a real account once connected."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          {feed.length === 0 ? (
            <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border-strong)] p-10 text-center">
              <p className="text-[13.5px] text-[var(--color-ink-muted)]">
                No activity yet on this device. Write a review on any{" "}
                <Link href="/products" className="font-medium text-[var(--color-cobalt)] hover:underline">
                  product page
                </Link>{" "}
                or join the discussion on a{" "}
                <Link href="/briefs" className="font-medium text-[var(--color-cobalt)] hover:underline">
                  Radar Brief
                </Link>{" "}
                to get started.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {feed.map((entry) => (
                <Link
                  key={entry.id}
                  href={entry.type === "review" ? `/products/${entry.targetSlug}` : `/briefs/${entry.targetSlug}`}
                  className="flex gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-ink)]"
                >
                  <div className="mt-0.5 shrink-0 text-[var(--color-ink-faint)]">
                    {entry.type === "review" ? <Star className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px]">
                      <span className="font-semibold">{entry.author}</span>{" "}
                      <span className="text-[var(--color-ink-muted)]">
                        {entry.type === "review" ? "reviewed" : "commented on"}
                      </span>{" "}
                      <span className="font-medium">{entry.targetLabel}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[13px] text-[var(--color-ink-muted)]">{entry.snippet}</p>
                    <div className="mt-1 text-[11px] text-[var(--color-ink-faint)]">
                      {new Date(entry.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <h3 className="mb-1 text-[13px] font-semibold">This device&rsquo;s activity</h3>
            <p className="mb-3 text-[11.5px] text-[var(--color-ink-faint)]">
              Counts reflect the last {feed.length} post{feed.length === 1 ? "" : "s"} made from this browser.
            </p>
            {topContributors.length === 0 ? (
              <p className="text-[12.5px] text-[var(--color-ink-faint)]">No posts yet.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {topContributors.map(([author, count]) => (
                  <li key={author} className="flex items-center justify-between text-[13px]">
                    <span className="font-medium">{author}</span>
                    <span className="tnum text-[var(--color-ink-muted)]">{count}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
            <h3 className="mb-1.5 text-[13px] font-semibold">Where content comes from</h3>
            <p className="text-[12px] leading-relaxed text-[var(--color-ink-muted)]">
              Reviews and comments here are written directly on K-Beauty Radar. Nothing on this page is copied
              from other review platforms — the aggregated stats shown elsewhere on the site (Hwahae, Amazon,
              etc.) stay separate and sourced, per{" "}
              <Link href="/methodology" className="underline underline-offset-2">
                Methodology
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
