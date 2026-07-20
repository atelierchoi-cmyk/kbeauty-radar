import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-[1400px] px-4 sm:px-6 ${className}`}>{children}</section>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  hrefLabel = "View all",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)]">
            {eyebrow}
          </div>
        )}
        <h2 className="font-display text-[22px] font-semibold tracking-tight sm:text-[26px]">{title}</h2>
        {description && <p className="mt-1.5 max-w-2xl text-[13.5px] text-[var(--color-ink-muted)]">{description}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="hidden shrink-0 items-center gap-1 text-[13px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] sm:flex"
        >
          {hrefLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

export function StatCard({ label, value, sublabel }: { label: string; value: string; sublabel?: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">{label}</div>
      <div className="font-display tnum mt-1.5 text-[26px] font-semibold leading-none">{value}</div>
      {sublabel && <div className="mt-1.5 text-[12px] text-[var(--color-ink-muted)]">{sublabel}</div>}
    </div>
  );
}
