import Link from "next/link";
import { StatCard } from "@/components/ui/section";
import { getBrands, getProducts, getSources, getTrendEvents, getBriefs } from "@/lib/data";

export const metadata = { title: "Admin Overview" };

export default async function AdminOverviewPage() {
  const [brands, products, sources, trendEvents, briefs] = await Promise.all([
    getBrands(),
    getProducts(),
    getSources(),
    getTrendEvents(),
    getBriefs(),
  ]);

  return (
    <div>
      <h1 className="font-display mb-1 text-[22px] font-semibold tracking-tight">Admin Overview</h1>
      <p className="mb-6 text-[13.5px] text-[var(--color-ink-muted)]">
        This build&rsquo;s admin CRUD writes to in-memory React state for demonstration — changes reset on page
        refresh. Wire the same forms to Supabase (see <code className="rounded bg-[var(--color-surface)] px-1 py-0.5 text-[12px]">supabase/schema.sql</code>) for persistence.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Brands" value={String(brands.length)} />
        <StatCard label="Products" value={String(products.length)} />
        <StatCard label="Data Sources" value={String(sources.length)} />
        <StatCard label="Trend Events" value={String(trendEvents.length)} />
        <StatCard label="Radar Briefs" value={String(briefs.length)} />
        <StatCard label="Published Briefs" value={String(briefs.length)} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <AdminLink href="/admin/brands" title="Manage Brands" desc="Add, edit and remove brand records." />
        <AdminLink href="/admin/products" title="Manage Products" desc="Add, edit and remove product records." />
        <AdminLink href="/admin/sources" title="Manage Data Sources" desc="Configure retailer and review-app sources and trust weights." />
        <AdminLink href="/admin/reviews" title="Review Aggregates" desc="View aggregated review rows and bulk-import via CSV." />
        <AdminLink href="/admin/trend-events" title="Trend Events" desc="View trend events and bulk-import via CSV." />
        <AdminLink href="/admin/briefs" title="Radar Brief" desc="Draft and publish editorial briefs." />
      </div>
    </div>
  );
}

function AdminLink({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-ink)]"
    >
      <div className="text-[14px] font-semibold">{title}</div>
      <p className="mt-1 text-[12.5px] text-[var(--color-ink-muted)]">{desc}</p>
    </Link>
  );
}
