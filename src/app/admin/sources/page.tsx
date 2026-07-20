"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AdminTable, type AdminColumn } from "@/components/admin/admin-table";
import type { DataSource } from "@/lib/types";

const EMPTY_FORM = {
  name: "",
  url: "",
  country: "",
  sourceType: "Retailer",
  officialRetailer: false,
  supportsVerifiedPurchase: false,
  allowsIncentivizedReviews: false,
  trustWeight: "70",
};

export default function AdminSourcesPage() {
  const [sources, setSources] = useState<DataSource[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    fetch("/api/admin-data")
      .then((r) => r.json())
      .then((d) => setSources(d.sources));
  }, []);

  const columns: AdminColumn<DataSource>[] = [
    { key: "name", label: "Source", render: (s) => <span className="font-medium">{s.name}</span> },
    { key: "country", label: "Country", render: (s) => s.country },
    { key: "type", label: "Type", render: (s) => s.sourceType },
    { key: "official", label: "Official Retailer", render: (s) => (s.officialRetailer ? "Yes" : "No") },
    { key: "verified", label: "Verified Purchase", render: (s) => (s.supportsVerifiedPurchase ? "Yes" : "No") },
    { key: "trust", label: "Trust Weight", render: (s) => <span className="tnum">{s.trustWeight}</span> },
  ];

  function startEdit(source: DataSource) {
    setEditingId(source.id);
    setForm({
      name: source.name,
      url: source.url,
      country: source.country,
      sourceType: source.sourceType,
      officialRetailer: source.officialRetailer,
      supportsVerifiedPurchase: source.supportsVerifiedPurchase,
      allowsIncentivizedReviews: source.allowsIncentivizedReviews,
      trustWeight: String(source.trustWeight),
    });
    setShowForm(true);
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  }

  function submitSource(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.url) return;

    if (editingId) {
      setSources(
        sources.map((s) =>
          s.id === editingId
            ? {
                ...s,
                name: form.name,
                url: form.url,
                country: form.country || "Global",
                sourceType: form.sourceType,
                officialRetailer: form.officialRetailer,
                supportsVerifiedPurchase: form.supportsVerifiedPurchase,
                allowsIncentivizedReviews: form.allowsIncentivizedReviews,
                trustWeight: Number(form.trustWeight) || 50,
              }
            : s
        )
      );
    } else {
      const newSource: DataSource = {
        id: `src_${form.name.toLowerCase().replace(/\s+/g, "-")}`,
        name: form.name,
        url: form.url,
        country: form.country || "Global",
        sourceType: form.sourceType,
        officialRetailer: form.officialRetailer,
        supportsVerifiedPurchase: form.supportsVerifiedPurchase,
        allowsIncentivizedReviews: form.allowsIncentivizedReviews,
        trustWeight: Number(form.trustWeight) || 50,
      };
      setSources([newSource, ...sources]);
    }
    resetForm();
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-[20px] font-semibold">Data Sources ({sources.length})</h1>
          <p className="text-[12.5px] text-[var(--color-ink-muted)]">Trust weight feeds the Review Sentiment and Data Confidence scores — see Methodology.</p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="flex items-center gap-1.5 rounded-md bg-[var(--color-ink)] px-3.5 py-2 text-[13px] font-semibold text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> {showForm ? "Cancel" : "Add Source"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submitSource} className="mb-6 grid grid-cols-1 gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:grid-cols-3">
          {editingId && (
            <div className="sm:col-span-3 text-[12px] font-medium text-[var(--color-cobalt)]">Editing: {form.name || editingId}</div>
          )}
          <input required placeholder="Source name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <input required placeholder="Source URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <input placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <select value={form.sourceType} onChange={(e) => setForm({ ...form, sourceType: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none">
            <option>Retailer</option>
            <option>Review App</option>
            <option>Community Forum</option>
            <option>Official Brand Site</option>
          </select>
          <input placeholder="Trust weight (0-100)" type="number" value={form.trustWeight} onChange={(e) => setForm({ ...form, trustWeight: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <div className="flex items-center gap-4 sm:col-span-3">
            <label className="flex items-center gap-1.5 text-[12.5px]">
              <input type="checkbox" checked={form.officialRetailer} onChange={(e) => setForm({ ...form, officialRetailer: e.target.checked })} />
              Official retailer
            </label>
            <label className="flex items-center gap-1.5 text-[12.5px]">
              <input type="checkbox" checked={form.supportsVerifiedPurchase} onChange={(e) => setForm({ ...form, supportsVerifiedPurchase: e.target.checked })} />
              Supports verified purchase
            </label>
            <label className="flex items-center gap-1.5 text-[12.5px]">
              <input type="checkbox" checked={form.allowsIncentivizedReviews} onChange={(e) => setForm({ ...form, allowsIncentivizedReviews: e.target.checked })} />
              Allows incentivized reviews
            </label>
          </div>
          <div className="flex gap-2 sm:col-span-3">
            <button type="submit" className="rounded-md bg-[var(--color-ink)] px-3.5 py-2 text-[13px] font-semibold text-white hover:opacity-90">
              {editingId ? "Update" : "Save"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="rounded-md border border-[var(--color-border-strong)] px-3.5 py-2 text-[13px] font-medium hover:border-[var(--color-ink)]">
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      <AdminTable rows={sources} columns={columns} onEdit={startEdit} onDelete={(row) => setSources(sources.filter((s) => s.id !== row.id))} />
    </div>
  );
}
