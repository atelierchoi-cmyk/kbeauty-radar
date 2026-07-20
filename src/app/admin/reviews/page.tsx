"use client";

import { useEffect, useState } from "react";
import { AdminTable, type AdminColumn } from "@/components/admin/admin-table";
import { CsvUploader } from "@/components/admin/csv-uploader";
import type { ReviewAggregate } from "@/lib/types";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewAggregate[]>([]);

  useEffect(() => {
    fetch("/api/admin-data")
      .then((r) => r.json())
      .then((d) => setReviews(d.reviewAggregates));
  }, []);

  const columns: AdminColumn<ReviewAggregate>[] = [
    { key: "product", label: "Product", render: (r) => <span className="font-medium">{r.productSlug}</span> },
    { key: "source", label: "Source", render: (r) => r.source },
    { key: "country", label: "Country", render: (r) => r.country },
    { key: "rating", label: "Rating", render: (r) => <span className="tnum">{r.rating.toFixed(1)}</span> },
    { key: "count", label: "Review Count", render: (r) => <span className="tnum">{r.reviewCount.toLocaleString()}</span> },
    { key: "date", label: "Data Date", render: (r) => r.dataDate },
  ];

  function handleImport(rows: Record<string, string>[]) {
    const imported: ReviewAggregate[] = rows.map((row, i) => ({
      id: `rev_import_${Date.now()}_${i}`,
      productSlug: row.product_slug ?? row.productSlug ?? "",
      source: row.source ?? "",
      country: row.country ?? "",
      rating: Number(row.rating) || 0,
      reviewCount: Number(row.review_count ?? row.reviewCount) || 0,
      positiveRatio: Number(row.positive_ratio ?? row.positiveRatio) || 0,
      verifiedPurchaseRatio: Number(row.verified_purchase_ratio ?? row.verifiedPurchaseRatio) || 0,
      incentivizedRatio: Number(row.incentivized_ratio ?? row.incentivizedRatio) || 0,
      dataDate: row.data_date ?? row.dataDate ?? new Date().toISOString().slice(0, 10),
      isDemo: true,
    }));
    setReviews([...imported, ...reviews]);
  }

  return (
    <div>
      <h1 className="font-display mb-1 text-[20px] font-semibold">Review Aggregates ({reviews.length})</h1>
      <p className="mb-6 text-[12.5px] text-[var(--color-ink-muted)]">
        Product-level review statistics per source and country. Imported rows are session-only in this build.
      </p>

      <div className="mb-6">
        <CsvUploader
          sampleFilename="review_aggregates.csv"
          requiredHeaders={["product_slug", "source", "country", "rating", "review_count"]}
          onImport={handleImport}
        />
      </div>

      <AdminTable rows={reviews.slice(0, 50)} columns={columns} onDelete={(row) => setReviews(reviews.filter((r) => r.id !== row.id))} />
      {reviews.length > 50 && (
        <p className="mt-2 text-[11.5px] text-[var(--color-ink-faint)]">Showing first 50 of {reviews.length} rows.</p>
      )}
    </div>
  );
}
