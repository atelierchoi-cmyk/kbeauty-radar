import { clsx } from "clsx";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { trendDirection, formatPct } from "@/lib/scores";

export function TrendBadge({ pct, digits = 1 }: { pct: number; digits?: number }) {
  const dir = trendDirection(pct);
  const colorMap = {
    up: "text-[var(--color-up)]",
    down: "text-[var(--color-down)]",
    neutral: "text-[var(--color-neutral)]",
  } as const;
  const Icon = dir === "up" ? ArrowUpRight : dir === "down" ? ArrowDownRight : Minus;
  return (
    <span className={clsx("tnum inline-flex items-center gap-0.5 text-sm font-medium", colorMap[dir])}>
      <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
      {formatPct(pct, digits)}
    </span>
  );
}

export function LiveDot({ label = "LIVE" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
      <span className="relative flex h-2 w-2">
        <span className="live-dot absolute inline-flex h-full w-full rounded-full bg-[var(--color-lime)]" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-lime)]" />
      </span>
      {label}
    </span>
  );
}
