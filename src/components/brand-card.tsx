import Link from "next/link";
import { BrandMark } from "@/components/ui/logo-mark";
import { StageBadge } from "@/components/ui/badge";
import { TrendBadge } from "@/components/ui/trend";
import { Sparkline } from "@/components/ui/sparkline";
import type { Brand } from "@/lib/types";

export function BrandCard({ brand, rank }: { brand: Brand; rank?: number }) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:border-[var(--color-ink)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {rank !== undefined && (
            <span className="tnum w-5 shrink-0 text-sm font-semibold text-[var(--color-ink-faint)]">{rank}</span>
          )}
          <BrandMark initial={brand.logoInitial} color={brand.logoColor} size={38} />
          <div>
            <div className="font-display text-[15px] font-semibold leading-tight">{brand.englishName}</div>
            <div className="text-[12px] text-[var(--color-ink-faint)]">{brand.name}</div>
          </div>
        </div>
        <Sparkline data={brand.sparkline} positive={brand.weeklyGrowthPct >= 0} />
      </div>

      <p className="line-clamp-2 text-[13px] leading-relaxed text-[var(--color-ink-muted)]">{brand.positioning}</p>

      <div className="flex items-center justify-between">
        <StageBadge stage={brand.growthStage} />
        <TrendBadge pct={brand.weeklyGrowthPct} />
      </div>

      <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-[12px] text-[var(--color-ink-muted)]">
        <span>
          Attention <span className="tnum font-semibold text-[var(--color-ink)]">{brand.scores.globalAttention}</span>
        </span>
        <span>Top: {brand.topCountry}</span>
      </div>
    </Link>
  );
}
