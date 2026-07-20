"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const PERIODS = ["7D", "30D", "90D", "1Y"] as const;

export function RadarCharts({
  attentionByCountry,
  growthByBrand,
  ingredientMentions,
}: {
  attentionByCountry: { country: string; attention: number }[];
  growthByBrand: { name: string; growth: number }[];
  ingredientMentions: { name: string; change: number }[];
}) {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>("30D");

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`rounded-[var(--radius-pill)] border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
              period === p
                ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white"
                : "border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-ink)]"
            }`}
          >
            {p}
          </button>
        ))}
        <span className="ml-1 text-[11.5px] text-[var(--color-ink-faint)]">
          Period selector shown for illustration — the demo dataset does not vary by window yet.
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h3 className="mb-4 text-[13px] font-semibold">Country-by-Country Attention</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attentionByCountry} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--color-ink-muted)" }} />
                <YAxis type="category" dataKey="country" width={90} tick={{ fontSize: 11.5, fill: "var(--color-ink)" }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid var(--color-border)" }}
                  cursor={{ fill: "var(--color-surface-raised)" }}
                />
                <Bar dataKey="attention" radius={[0, 3, 3, 0]}>
                  {attentionByCountry.map((_, i) => (
                    <Cell key={i} fill="var(--color-cobalt)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h3 className="mb-4 text-[13px] font-semibold">Brand Growth (Weekly %)</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthByBrand} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10.5, fill: "var(--color-ink-muted)" }} interval={0} angle={-25} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-ink-muted)" }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid var(--color-border)" }}
                  cursor={{ fill: "var(--color-surface-raised)" }}
                />
                <Bar dataKey="growth" radius={[3, 3, 0, 0]} fill="var(--color-lime)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 lg:col-span-2">
          <h3 className="mb-4 text-[13px] font-semibold">Ingredient Mentions — Change</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ingredientMentions} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10.5, fill: "var(--color-ink-muted)" }} interval={0} angle={-20} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-ink-muted)" }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid var(--color-border)" }}
                  cursor={{ fill: "var(--color-surface-raised)" }}
                />
                <Bar dataKey="change" radius={[3, 3, 0, 0]}>
                  {ingredientMentions.map((d, i) => (
                    <Cell key={i} fill={d.change >= 0 ? "var(--color-up)" : "var(--color-down)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
