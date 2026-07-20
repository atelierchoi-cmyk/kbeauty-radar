"use client";

import { useEffect, useState } from "react";
import { AdminTable, type AdminColumn } from "@/components/admin/admin-table";
import { CsvUploader } from "@/components/admin/csv-uploader";
import type { TrendEvent } from "@/lib/types";

export default function AdminTrendEventsPage() {
  const [events, setEvents] = useState<TrendEvent[]>([]);

  useEffect(() => {
    fetch("/api/admin-data")
      .then((r) => r.json())
      .then((d) => setEvents(d.trendEvents));
  }, []);

  const columns: AdminColumn<TrendEvent>[] = [
    { key: "brand", label: "Brand", render: (t) => <span className="font-medium">{t.brandSlug}</span> },
    { key: "type", label: "Event Type", render: (t) => t.eventType },
    { key: "date", label: "Date", render: (t) => t.eventDate },
    { key: "desc", label: "Description", render: (t) => <span className="line-clamp-1 max-w-xs">{t.description}</span> },
    { key: "confidence", label: "Confidence", render: (t) => t.confidenceLevel },
    { key: "impact", label: "Impact", render: (t) => <span className="tnum">{t.impactValue}</span> },
  ];

  function handleImport(rows: Record<string, string>[]) {
    const imported: TrendEvent[] = rows.map((row, i) => ({
      id: `trend_import_${Date.now()}_${i}`,
      brandSlug: row.brand_slug ?? row.brandSlug ?? "",
      productSlug: row.product_slug ?? row.productSlug ?? undefined,
      eventType: row.event_type ?? row.eventType ?? "",
      eventDate: row.event_date ?? row.eventDate ?? new Date().toISOString().slice(0, 10),
      description: row.description ?? "",
      relatedPerson: row.related_person ?? row.relatedPerson ?? undefined,
      source: row.source ?? "",
      confidenceLevel: (row.confidence_level ?? row.confidenceLevel ?? "Medium") as TrendEvent["confidenceLevel"],
      impactValue: Number(row.impact_value ?? row.impactValue) || 0,
    }));
    setEvents([...imported, ...events]);
  }

  return (
    <div>
      <h1 className="font-display mb-1 text-[20px] font-semibold">Trend Events ({events.length})</h1>
      <p className="mb-6 text-[12.5px] text-[var(--color-ink-muted)]">
        Powers the Radar page&rsquo;s event stream. Imported rows are session-only in this build.
      </p>

      <div className="mb-6">
        <CsvUploader
          sampleFilename="trend_events.csv"
          requiredHeaders={["brand_slug", "event_type", "event_date", "description", "source"]}
          onImport={handleImport}
        />
      </div>

      <AdminTable rows={events} columns={columns} onDelete={(row) => setEvents(events.filter((e) => e.id !== row.id))} />
    </div>
  );
}
