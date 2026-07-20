"use client";

import Link from "next/link";
import { RadarLogo } from "@/components/ui/logo-mark";
import { APP_NAME } from "@/lib/config";
import { useLanguage, type DictKey } from "@/lib/i18n";

const COLUMNS: { titleKey: DictKey; links: { href: string; key: DictKey }[] }[] = [
  {
    titleKey: "footer_explore",
    links: [
      { href: "/radar", key: "nav_radar" },
      { href: "/rankings", key: "nav_rankings" },
      { href: "/brands", key: "nav_brands" },
      { href: "/products", key: "nav_products" },
      { href: "/community", key: "nav_community" },
      { href: "/compare", key: "footer_compare" },
    ],
  },
  {
    titleKey: "footer_signals",
    links: [
      { href: "/celebrity-impact", key: "nav_celebrity" },
      { href: "/countries", key: "footer_countries" },
      { href: "/ingredients", key: "footer_ingredients" },
      { href: "/briefs", key: "footer_briefs" },
    ],
  },
  {
    titleKey: "footer_about",
    links: [
      { href: "/methodology", key: "footer_methodology" },
      { href: "/about", key: "footer_about_link" },
      { href: "/admin", key: "footer_admin" },
    ],
  },
];

export function SiteFooter() {
  const { t } = useLanguage();

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
              {t("footer_tagline")}
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.titleKey}>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)]">
                {t(col.titleKey)}
              </div>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[13px] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">
                      {t(l.key)}
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
