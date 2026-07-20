"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AdminTable, type AdminColumn } from "@/components/admin/admin-table";
import { StageBadge } from "@/components/ui/badge";
import type { Brand } from "@/lib/types";

const STAGES = ["Established", "Global Leader", "Fast Growing", "Viral Rising", "Emerging", "Watchlist"];

const EMPTY_FORM = {
  name: "",
  englishName: "",
  slug: "",
  countryOfOrigin: "South Korea",
  officialUrl: "",
  growthStage: "Emerging",
  categories: "",
};

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    fetch("/api/admin-data")
      .then((r) => r.json())
      .then((d) => setBrands(d.brands));
  }, []);

  const columns: AdminColumn<Brand>[] = [
    { key: "name", label: "Name", render: (b) => <span className="font-medium">{b.englishName}</span> },
    { key: "slug", label: "Slug", render: (b) => <code className="text-[12px] text-[var(--color-ink-faint)]">{b.slug}</code> },
    { key: "country", label: "Country", render: (b) => b.countryOfOrigin },
    { key: "stage", label: "Growth Stage", render: (b) => <StageBadge stage={b.growthStage} /> },
    { key: "attention", label: "Attention", render: (b) => <span className="tnum">{b.scores.globalAttention}</span> },
  ];

  function startEdit(brand: Brand) {
    setEditingId(brand.id);
    setForm({
      name: brand.name,
      englishName: brand.englishName,
      slug: brand.slug,
      countryOfOrigin: brand.countryOfOrigin,
      officialUrl: brand.officialUrl,
      growthStage: brand.growthStage,
      categories: brand.categories.join(", "),
    });
    setShowForm(true);
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  }

  function submitBrand(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.englishName || !form.slug) return;

    if (editingId) {
      setBrands(
        brands.map((b) =>
          b.id === editingId
            ? {
                ...b,
                name: form.name,
                englishName: form.englishName,
                slug: form.slug,
                countryOfOrigin: form.countryOfOrigin,
                officialUrl: form.officialUrl,
                growthStage: form.growthStage as Brand["growthStage"],
                categories: form.categories.split(",").map((c) => c.trim()).filter(Boolean),
                logoInitial: form.englishName[0]?.toUpperCase() ?? b.logoInitial,
              }
            : b
        )
      );
    } else {
      const newBrand: Brand = {
        id: `brand_${form.slug}`,
        name: form.name,
        englishName: form.englishName,
        slug: form.slug,
        logoInitial: form.englishName[0]?.toUpperCase() ?? "?",
        logoColor: "#8f8677",
        positioning: "",
        description: "",
        countryOfOrigin: form.countryOfOrigin,
        foundedYear: new Date().getFullYear(),
        officialUrl: form.officialUrl,
        categories: form.categories.split(",").map((c) => c.trim()).filter(Boolean),
        growthStage: form.growthStage as Brand["growthStage"],
        competitorSlugs: [],
        scores: {
          globalAttention: 0,
          reviewSentiment: 0,
          growthMomentum: 0,
          koreaStrength: 0,
          globalStrength: 0,
          viralImpact: 0,
          productDiversity: 0,
          dataConfidence: 0,
        },
        weeklyGrowthPct: 0,
        topCountry: form.countryOfOrigin,
        keyReasons: [],
        sparkline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        strengths: [],
        watchouts: [],
        positiveKeywords: [],
        negativeKeywords: [],
        marketBreakdown: [],
        timeline: [],
        summary: [],
      };
      setBrands([newBrand, ...brands]);
    }
    resetForm();
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-[20px] font-semibold">Brands ({brands.length})</h1>
          <p className="text-[12.5px] text-[var(--color-ink-muted)]">Changes are session-only until connected to Supabase.</p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="flex items-center gap-1.5 rounded-md bg-[var(--color-ink)] px-3.5 py-2 text-[13px] font-semibold text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> {showForm ? "Cancel" : "Add Brand"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submitBrand} className="mb-6 grid grid-cols-1 gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:grid-cols-3">
          {editingId && (
            <div className="sm:col-span-3 text-[12px] font-medium text-[var(--color-cobalt)]">Editing: {form.englishName || editingId}</div>
          )}
          <input required placeholder="Korean name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <input required placeholder="English name" value={form.englishName} onChange={(e) => setForm({ ...form, englishName: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <input required placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <input placeholder="Country of origin" value={form.countryOfOrigin} onChange={(e) => setForm({ ...form, countryOfOrigin: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <input placeholder="Official URL" value={form.officialUrl} onChange={(e) => setForm({ ...form, officialUrl: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <select value={form.growthStage} onChange={(e) => setForm({ ...form, growthStage: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none">
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input placeholder="Categories (comma separated)" value={form.categories} onChange={(e) => setForm({ ...form, categories: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)] sm:col-span-2" />
          <div className="flex gap-2">
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

      <AdminTable rows={brands} columns={columns} onEdit={startEdit} onDelete={(row) => setBrands(brands.filter((b) => b.id !== row.id))} />
    </div>
  );
}
