"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Search, Bookmark, Globe, LogIn, Check } from "lucide-react";
import { RadarLogo } from "@/components/ui/logo-mark";
import { APP_NAME, NAV_LINKS } from "@/lib/config";
import { useSession } from "@/lib/client-store";
import { useLanguage, type DictKey } from "@/lib/i18n";

const NAV_KEY: Record<string, DictKey> = {
  "/radar": "nav_radar",
  "/rankings": "nav_rankings",
  "/brands": "nav_brands",
  "/products": "nav_products",
  "/celebrity-impact": "nav_celebrity",
  "/briefs": "nav_briefs",
};

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const { session, ready } = useSession();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <RadarLogo size={26} />
          <span className="font-display text-[17px] font-semibold tracking-tight">{APP_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13.5px] font-medium text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              {t(NAV_KEY[link.href])}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            className="hidden h-9 w-9 items-center justify-center rounded-md text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-ink)] sm:flex"
            aria-label={t("header_search")}
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>

          <div className="relative hidden sm:block" ref={langMenuRef}>
            <button
              onClick={() => setLangMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-ink)]"
              aria-label={t("header_language")}
              aria-expanded={langMenuOpen}
              title={t("header_language")}
            >
              <Globe className="h-[18px] w-[18px]" />
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 top-11 w-44 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-1 shadow-lg">
                <button
                  onClick={() => {
                    setLang("en");
                    setLangMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded px-2.5 py-2 text-[13px] hover:bg-[var(--color-surface-raised)]"
                >
                  English
                  {lang === "en" && <Check className="h-3.5 w-3.5 text-[var(--color-cobalt)]" />}
                </button>
                <button
                  onClick={() => {
                    setLang("ko");
                    setLangMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded px-2.5 py-2 text-[13px] hover:bg-[var(--color-surface-raised)]"
                >
                  한국어
                  {lang === "ko" && <Check className="h-3.5 w-3.5 text-[var(--color-cobalt)]" />}
                </button>
                <div className="border-t border-[var(--color-border)] px-2.5 py-1.5 text-[10.5px] leading-relaxed text-[var(--color-ink-faint)]">
                  {lang === "ko"
                    ? "메뉴 등 화면 UI만 번역됩니다. 브랜드·제품 설명은 아직 영문입니다."
                    : "Only menus and controls translate for now — brand/product copy stays in its source language."}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/saved"
            className="hidden h-9 w-9 items-center justify-center rounded-md text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-ink)] sm:flex"
            aria-label={t("header_saved")}
          >
            <Bookmark className="h-[18px] w-[18px]" />
          </Link>
          {ready && session ? (
            <Link
              href="/profile"
              className="hidden h-9 w-9 items-center justify-center rounded-full bg-[var(--color-ink)] text-[11px] font-semibold text-white sm:flex"
              aria-label={t("header_profile")}
              title={session.email}
            >
              {session.email[0]?.toUpperCase()}
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden items-center gap-1.5 rounded-md px-2.5 py-2 text-[13px] font-medium text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-ink)] sm:flex"
            >
              <LogIn className="h-[16px] w-[16px]" />
              {t("header_signin")}
            </Link>
          )}

          <Link
            href="/search"
            className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-ink-muted)] sm:hidden"
            aria-label={t("header_search")}
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <Link
            href="/saved"
            className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-ink-muted)] sm:hidden"
            aria-label={t("header_saved")}
          >
            <Bookmark className="h-[18px] w-[18px]" />
          </Link>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-ink)] lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface-raised)]"
              >
                {t(NAV_KEY[link.href])}
              </Link>
            ))}
            <Link href="/profile" onClick={() => setOpen(false)} className="rounded-md px-2 py-2.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface-raised)]">
              {t("header_profile")}
            </Link>
            {ready && !session && (
              <Link href="/login" onClick={() => setOpen(false)} className="rounded-md px-2 py-2.5 text-sm font-medium text-[var(--color-cobalt)] hover:bg-[var(--color-surface-raised)]">
                {t("header_signin")}
              </Link>
            )}
            <div className="mt-1 flex items-center gap-2 border-t border-[var(--color-border)] px-2 pt-2">
              <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
                {t("header_language")}
              </span>
              <button
                onClick={() => setLang("en")}
                className={`rounded px-2 py-1 text-[12px] font-medium ${lang === "en" ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-ink-muted)]"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ko")}
                className={`rounded px-2 py-1 text-[12px] font-medium ${lang === "ko" ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-ink-muted)]"}`}
              >
                한국어
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
