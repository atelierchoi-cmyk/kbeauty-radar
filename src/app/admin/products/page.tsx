"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AdminTable, type AdminColumn } from "@/components/admin/admin-table";
import type { Product, Brand } from "@/lib/types";

const EMPTY_FORM = {
  brandSlug: "",
  name: "",
  englishName: "",
  slug: "",
  category: "",
  size: "",
  priceMin: "",
  priceMax: "",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    fetch("/api/admin-data")
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.products);
        setBrands(d.brands);
      });
  }, []);

  const brandBySlug = new Map(brands.map((b) => [b.slug, b]));

  const columns: AdminColumn<Product>[] = [
    { key: "name", label: "Name", render: (p) => <span className="font-medium">{p.englishName}</span> },
    { key: "brand", label: "Brand", render: (p) => brandBySlug.get(p.brandSlug)?.englishName ?? p.brandSlug },
    { key: "category", label: "Category", render: (p) => p.category },
    { key: "price", label: "Price", render: (p) => `${p.currency} ${p.priceMin}-${p.priceMax}` },
    { key: "score", label: "Score", render: (p) => <span className="tnum">{p.globalReviewScore}</span> },
  ];

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      brandSlug: product.brandSlug,
      name: product.name,
      englishName: product.englishName,
      slug: product.slug,
      category: product.category,
      size: product.size,
      priceMin: String(product.priceMin),
      priceMax: String(product.priceMax),
    });
    setShowForm(true);
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  }

  function submitProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!form.brandSlug || !form.name || !form.slug) return;

    if (editingId) {
      setProducts(
        products.map((p) =>
          p.id === editingId
            ? {
                ...p,
                brandSlug: form.brandSlug,
                name: form.name,
                englishName: form.englishName || form.name,
                slug: form.slug,
                category: form.category,
                size: form.size,
                priceMin: Number(form.priceMin) || 0,
                priceMax: Number(form.priceMax) || 0,
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: `prod_${form.slug}`,
        brandSlug: form.brandSlug,
        name: form.name,
        englishName: form.englishName || form.name,
        slug: form.slug,
        category: form.category,
        description: "",
        size: form.size,
        priceMin: Number(form.priceMin) || 0,
        priceMax: Number(form.priceMax) || 0,
        currency: "USD",
        keyIngredientSlugs: [],
        skinTypes: [],
        skinConcerns: [],
        reformulated: false,
        usageStep: form.category,
        imageTone: "beige",
        globalReviewScore: 0,
        koreaScore: 0,
        globalScore: 0,
        reviewVolume: 0,
        dataConfidence: 0,
        lastUpdated: new Date().toISOString().slice(0, 10),
        bestFor: [],
        considerBefore: [],
        likes: [],
        dislikes: [],
        skinTypeResponse: [],
        countryResponse: [],
        retailLinks: [],
      };
      setProducts([newProduct, ...products]);
    }
    resetForm();
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-[20px] font-semibold">Products ({products.length})</h1>
          <p className="text-[12.5px] text-[var(--color-ink-muted)]">Changes are session-only until connected to Supabase.</p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="flex items-center gap-1.5 rounded-md bg-[var(--color-ink)] px-3.5 py-2 text-[13px] font-semibold text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submitProduct} className="mb-6 grid grid-cols-1 gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:grid-cols-3">
          {editingId && (
            <div className="sm:col-span-3 text-[12px] font-medium text-[var(--color-cobalt)]">Editing: {form.englishName || editingId}</div>
          )}
          <select required value={form.brandSlug} onChange={(e) => setForm({ ...form, brandSlug: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none">
            <option value="">Select brand…</option>
            {brands.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.englishName}
              </option>
            ))}
          </select>
          <input required placeholder="Product name (Korean)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <input placeholder="English name" value={form.englishName} onChange={(e) => setForm({ ...form, englishName: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <input required placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <input placeholder="Size (e.g. 50ml)" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <input placeholder="Price min (USD)" type="number" value={form.priceMin} onChange={(e) => setForm({ ...form, priceMin: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
          <input placeholder="Price max (USD)" type="number" value={form.priceMax} onChange={(e) => setForm({ ...form, priceMax: e.target.value })} className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]" />
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

      <AdminTable rows={products} columns={columns} onEdit={startEdit} onDelete={(row) => setProducts(products.filter((p) => p.id !== row.id))} />
    </div>
  );
}
