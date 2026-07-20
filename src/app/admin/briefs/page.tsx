"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AdminTable, type AdminColumn } from "@/components/admin/admin-table";
import type { Brief, Brand } from "@/lib/types";

const CATEGORIES = ["Market", "Brand", "Product", "Celebrity", "Ingredient", "Korea vs Global", "Retail", "Consumer Behavior"];

type BriefRow = Brief & { id: string };

const EMPTY_FORM = {
  title: "",
  slug: "",
  category: "Market",
  summary: "",
  body: "",
  brandSlug: "",
};

export default function AdminBriefsPage() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    fetch("/api/admin-data")
      .then((r) => r.json())
      .then((d) => {
        setBriefs(d.briefs);
        setBrands(d.brands);
      });
  }, []);

  const columns: AdminColumn<BriefRow>[] = [
    { key: "title", label: "Title", render: (b) => <span className="font-medium">{b.title}</span> },
    { key: "category", label: "Category", render: (b) => b.category },
    { key: "published", label: "Published", render: (b) => b.publishedAt },
    { key: "dataAsOf", label: "Data As Of", render: (b) => b.dataAsOf },
    {
      key: "status",
      label: "Status",
      render: () => (
        <span className="rounded-[var(--radius-pill)] bg-[var(--color-up-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-up)]">
          Published
        </span>
      ),
    },
  ];

  function startEdit(brief: BriefRow) {
    setEditingSlug(brief.slug);
    setForm({
      title: brief.title,
      slug: brief.slug,
      category: brief.category,
      summary: brief.summary,
      body: brief.body.join("\n\n"),
      brandSlug: brief.relatedBrandSlugs[0] ?? "",
    });
    setShowForm(true);
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingSlug(null);
    setShowForm(false);
  }

  function submitBrief(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.slug || !form.summary) return;

    if (editingSlug) {
      setBriefs(
        briefs.map((b) =>
          b.slug === editingSlug
            ? {
                ...b,
                title: form.title,
                slug: form.slug,
                category: form.category,
                summary: form.summary,
                body: form.body.split("\n\n").filter(Boolean),
                relatedBrandSlugs: form.brandSlug ? [form.brandSlug] : [],
              }
            : b
        )
      );
    } else {
      const newBrief: Brief = {
        slug: form.slug,
        title: form.title,
        category: form.category,
        summary: form.summary,
        author: "Radar Editorial",
        publishedAt: new Date().toISOString().slice(0, 10),
        dataAsOf: new Date().toISOString().slice(0, 10),
        relatedBrandSlugs: form.brandSlug ? [form.brandSlug] : [],
        relatedProductSlugs: [],
        sources: [],
        body: form.body.split("\n\n").filter(Boolean),
      };
      setBriefs([newBrief, ...briefs]);
    }
    resetForm();
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-[20px] font-semibold">Radar Brief ({briefs.length})</h1>
          <p className="text-[12.5px] text-[var(--color-ink-muted)]">Changes are session-only until connected to Supabase.</p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="flex items-center gap-1.5 rounded-md bg-[var(--color-ink)] px-3.5 py-2 text-[13px] font-semibold text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> {showForm ? "Cancel" : "New Brief"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submitBrief} className="mb-6 grid grid-cols-1 gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:grid-cols-2">
          {editingSlug && (
            <div className="sm:col-span-2 text-[12px] font-medium text-[var(--color-cobalt)]">Editing: {form.title || editingSlug}</div>
          )}
          <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)] sm:col-span-2" />
          <input required placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none">
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select value={form.brandSlug} onChange={(e) => setForm({ ...form, brandSlug: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none sm:col-span-2">
            <option value="">No related brand</option>
            {brands.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.englishName}
              </option>
            ))}
          </select>
          <textarea required placeholder="Summary (1-2 sentences)" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} rows={2} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)] sm:col-span-2" />
          <textarea placeholder="Body (separate paragraphs with a blank line)" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={5} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)] sm:col-span-2" />
          <div className="flex gap-2">
            <button type="submit" className="rounded-md bg-[var(--color-ink)] px-3.5 py-2 text-[13px] font-semibold text-white hover:opacity-90">
              {editingSlug ? "Update" : "Publish"}
            </button>
            {editingSlug && (
              <button type="button" onClick={resetForm} className="rounded-md border border-[var(--color-border-strong)] px-3.5 py-2 text-[13px] font-medium hover:border-[var(--color-ink)]">
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      <AdminTable rows={briefs.map((b) => ({ ...b, id: b.slug }))} columns={columns} onEdit={startEdit} onDelete={(row) => setBriefs(briefs.filter((b) => b.slug !== row.id))} />
    </div>
  );
}
