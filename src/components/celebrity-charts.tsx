"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { CelebrityEvent } from "@/lib/types";

export function CelebrityLiftChart({ event }: { event: CelebrityEvent }) {
  const data = event.attentionLift.map((l) => ({ window: l.window, lift: l.pct }));

  return (
    <div className="h-[160px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: -20, top: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="window" tick={{ fontSize: 11, fill: "var(--color-ink-muted)" }} />
          <YAxis tick={{ fontSize: 10, fill: "var(--color-ink-muted)" }} width={40} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid var(--color-border)" }}
            formatter={(value) => [`+${value}%`, "Attention lift"]}
            cursor={{ fill: "var(--color-surface-raised)" }}
          />
          <Bar dataKey="lift" radius={[3, 3, 0, 0]} fill="var(--color-cobalt)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CelebrityReviewGrowthChart({ events }: { events: CelebrityEvent[] }) {
  const data = events.map((e) => ({
    name: e.celebrityName,
    reviewGrowth: e.reviewGrowthPct,
    socialMentions: e.socialMentionsChange,
  }));

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 10.5, fill: "var(--color-ink-muted)" }} interval={0} angle={-20} textAnchor="end" height={50} />
          <YAxis tick={{ fontSize: 11, fill: "var(--color-ink-muted)" }} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid var(--color-border)" }}
            cursor={{ fill: "var(--color-surface-raised)" }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="reviewGrowth" name="Review Growth %" radius={[3, 3, 0, 0]} fill="var(--color-up)" />
          <Bar dataKey="socialMentions" name="Social Mentions %" radius={[3, 3, 0, 0]} fill="var(--color-lime)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
