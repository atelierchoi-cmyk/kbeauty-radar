import Link from "next/link";
import { RadarLogo } from "@/components/ui/logo-mark";
import { APP_NAME } from "@/lib/config";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/radar", label: "Radar" },
      { href: "/rankings", label: "Rankings" },
      { href: "/brands", label: "Brands" },
      { href: "/products", label: "Products" },
      { href: "/compare", label: "Compare" },
    ],
  },
  {
    title: "Signals",
    links: [
      { href: "/celebrity-impact", label: "Celebrity Impact" },
      { href: "/countries", label: "Country Radar" },
      { href: "/ingredients", label: "Ingredient Radar" },
      { href: "/briefs", label: "Radar Brief" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/methodology", label: "Methodology" },
      { href: "/about", label: "About" },
      { href: "/admin", label: "Admin" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <RadarLogo size={22} />
              <span className="font-display text-[15px] font-semibold">{APP_NAME}</span>
            </div>
            <p className="max-w-[220px] text-[13px] leading-relaxed text-[var(--color-ink-muted)]">
              What the world really thinks about K-Beauty.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)]">
                {col.title}
              </div>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[13px] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--color-border)] pt-6 text-[12px] text-[var(--color-ink-faint)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            All figures are demo/sample data for illustration unless otherwise noted. See{" "}
            <Link href="/methodology" className="underline underline-offset-2">
              Methodology
            </Link>{" "}
            for how scores are built.
          </p>
          <p>© {new Date().getFullYear()} {APP_NAME}</p>
        </div>
      </div>
    </footer>
  );
}
