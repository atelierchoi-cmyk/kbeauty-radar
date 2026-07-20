import { clsx } from "clsx";

export function DemoBadge({ label = "Sample Data", className }: { label?: string; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--color-ink-muted)]",
        className
      )}
      title="This figure is demo/sample data for illustration, not a live measurement."
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-neutral)]" />
      {label}
    </span>
  );
}

export function StageBadge({ stage }: { stage: string }) {
  const colorMap: Record<string, string> = {
    Established: "bg-[var(--color-neutral-soft)] text-[var(--color-ink-muted)]",
    "Global Leader": "bg-[var(--color-cobalt-soft)] text-[var(--color-cobalt)]",
    "Fast Growing": "bg-[var(--color-up-soft)] text-[var(--color-up)]",
    "Viral Rising": "bg-[var(--color-lime)] text-[var(--color-lime-ink)]",
    Emerging: "bg-[var(--color-neutral-soft)] text-[var(--color-ink-muted)]",
    Watchlist: "bg-[var(--color-down-soft)] text-[var(--color-down)]",
  };
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-[var(--radius-pill)] px-2.5 py-0.5 text-[11px] font-semibold",
        colorMap[stage] ?? "bg-[var(--color-neutral-soft)] text-[var(--color-ink-muted)]"
      )}
    >
      {stage}
    </span>
  );
}

export function ConfidenceBadge({ score }: { score: number }) {
  const label = score >= 75 ? "High" : score >= 50 ? "Medium" : "Low";
  const colorMap: Record<string, string> = {
    High: "bg-[var(--color-up-soft)] text-[var(--color-up)]",
    Medium: "bg-[var(--color-neutral-soft)] text-[var(--color-ink-muted)]",
    Low: "bg-[var(--color-down-soft)] text-[var(--color-down)]",
  };
  return (
    <span
      className={clsx("inline-flex items-center rounded-[var(--radius-pill)] px-2 py-0.5 text-[11px] font-medium", colorMap[label])}
      title={`Data confidence: ${label} (${score}/100) — based on source count, sample size and recency`}
    >
      Confidence: {label}
    </span>
  );
}
