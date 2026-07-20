import Link from "next/link";
import { LayoutDashboard, Tag, Package, Database, MessageSquare, TrendingUp, FileText } from "lucide-react";
import { Section } from "@/components/ui/section";

const ADMIN_NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/brands", label: "Brands", icon: Tag },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/sources", label: "Data Sources", icon: Database },
  { href: "/admin/reviews", label: "Review Aggregates", icon: MessageSquare },
  { href: "/admin/trend-events", label: "Trend Events", icon: TrendingUp },
  { href: "/admin/briefs", label: "Radar Brief", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]">
      <Section className="py-3">
        <div className="flex items-center gap-1 text-[12px] font-medium text-[var(--color-ink-muted)]">
          <span>Admin</span>
          <span className="rounded-[var(--radius-pill)] bg-[var(--color-down-soft)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-down)]">
            DEV ACCESS · no auth in this build
          </span>
        </div>
      </Section>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 pb-16 sm:px-6 lg:flex-row">
        <nav className="flex shrink-0 flex-row gap-1 overflow-x-auto lg:w-52 lg:flex-col lg:overflow-visible">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-[13px] font-medium text-[var(--color-ink-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="min-w-0 flex-1 pt-4">{children}</div>
      </div>
    </div>
  );
}
