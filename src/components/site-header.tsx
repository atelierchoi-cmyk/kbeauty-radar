"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, Bookmark, Globe, LogIn } from "lucide-react";
import { RadarLogo } from "@/components/ui/logo-mark";
import { APP_NAME, NAV_LINKS } from "@/lib/config";
import { useSession } from "@/lib/client-store";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { session, ready } = useSession();

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
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            className="hidden h-9 w-9 items-center justify-center rounded-md text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-ink)] sm:flex"
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <button
            className="hidden h-9 w-9 items-center justify-center rounded-md text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-ink)] sm:flex"
            aria-label="Language"
            title="Language (English shown by default)"
          >
            <Globe className="h-[18px] w-[18px]" />
          </button>
          <Link
            href="/profile"
            className="hidden h-9 w-9 items-center justify-center rounded-md text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-ink)] sm:flex"
            aria-label="Saved"
          >
            <Bookmark className="h-[18px] w-[18px]" />
          </Link>
          {ready && session ? (
            <Link
              href="/profile"
              className="hidden h-9 w-9 items-center justify-center rounded-full bg-[var(--color-ink)] text-[11px] font-semibold text-white sm:flex"
              aria-label="Profile"
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
              Sign in
            </Link>
          )}

          <Link
            href="/search"
            className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-ink-muted)] sm:hidden"
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <Link
            href="/saved"
            className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-ink-muted)] sm:hidden"
            aria-label="Saved"
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
                {link.label}
              </Link>
            ))}
            <Link href="/profile" onClick={() => setOpen(false)} className="rounded-md px-2 py-2.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface-raised)]">
              Profile
            </Link>
            {ready && !session && (
              <Link href="/login" onClick={() => setOpen(false)} className="rounded-md px-2 py-2.5 text-sm font-medium text-[var(--color-cobalt)] hover:bg-[var(--color-surface-raised)]">
                Sign in
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
