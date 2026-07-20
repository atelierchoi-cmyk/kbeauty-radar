"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Lightweight client-side persistence for logged-out-friendly MVP features
 * (saved products, followed brands, compare list, profile prefs).
 *
 * This is intentionally local-only (browser storage) for the MVP. When
 * Supabase Auth is wired up, swap these for a `saved_products` /
 * `follows` / `saved_comparisons` table keyed by the authenticated user id
 * — the hook signatures below are shaped to make that swap mechanical.
 */

function readList(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeList(key: string, value: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("kbr-storage", { detail: { key } }));
}

function useListStore(key: string) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe sync from localStorage (no window during SSR)
    setItems(readList(key));
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.key === key) setItems(readList(key));
    };
    window.addEventListener("kbr-storage", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("kbr-storage", handler);
      window.removeEventListener("storage", handler);
    };
  }, [key]);

  const toggle = useCallback(
    (slug: string) => {
      const current = readList(key);
      const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
      writeList(key, next);
      setItems(next);
    },
    [key]
  );

  const has = useCallback((slug: string) => items.includes(slug), [items]);

  return { items, toggle, has };
}

export function useSavedProducts() {
  return useListStore("kbr:saved-products");
}

export function useFollowedBrands() {
  return useListStore("kbr:followed-brands");
}

export function useSavedIngredients() {
  return useListStore("kbr:saved-ingredients");
}

const COMPARE_KEY = "kbr:compare-list";
const COMPARE_LIMIT = 4;

export function useCompareList() {
  const { items, toggle, has } = useListStore(COMPARE_KEY);

  const add = useCallback(
    (slug: string) => {
      const current = readList(COMPARE_KEY);
      if (current.includes(slug) || current.length >= COMPARE_LIMIT) return;
      toggle(slug);
    },
    [toggle]
  );

  return { items, add, remove: toggle, has, limit: COMPARE_LIMIT, isFull: items.length >= COMPARE_LIMIT };
}

const SESSION_KEY = "kbr:session";

export interface Session {
  email: string;
  signedInAt: string;
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe sync from localStorage (no window during SSR)
      setSession(raw ? (JSON.parse(raw) as Session) : null);
    } catch {
      // ignore
    } finally {
      setReady(true);
    }
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.key === SESSION_KEY) {
        try {
          const raw = window.localStorage.getItem(SESSION_KEY);
          setSession(raw ? (JSON.parse(raw) as Session) : null);
        } catch {
          setSession(null);
        }
      }
    };
    window.addEventListener("kbr-storage", handler);
    return () => window.removeEventListener("kbr-storage", handler);
  }, []);

  const signIn = useCallback((email: string) => {
    const next: Session = { email, signedInAt: new Date().toISOString() };
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("kbr-storage", { detail: { key: SESSION_KEY } }));
    setSession(next);
  }, []);

  const signOut = useCallback(() => {
    window.localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new CustomEvent("kbr-storage", { detail: { key: SESSION_KEY } }));
    setSession(null);
  }, []);

  return { session, ready, signIn, signOut };
}

export interface UserProfile {
  country?: string;
  ageRange?: string;
  skinType?: string;
  skinConcerns?: string[];
  priceRange?: string;
  interestedCategories?: string[];
  interestedIngredients?: string[];
}

const PROFILE_KEY = "kbr:profile";

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PROFILE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe sync from localStorage (no window during SSR)
      if (raw) setProfile(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const update = useCallback((next: UserProfile) => {
    setProfile(next);
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
  }, []);

  return { profile, update };
}
