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

// ---------------------------------------------------------------------------
// Community layer: user-written reviews, brief comments, quick reactions,
// and a cross-page activity feed. All of this is genuine user-generated
// content typed directly into K-Beauty Radar — never scraped or copied
// from other platforms. It's localStorage-backed for this demo build
// (single device, no accounts required to post); moving to Supabase +
// Auth would make it persistent and cross-device — see supabase/schema.sql
// and the "Connecting Supabase" section of the README for the shape this
// would take (a `reviews` / `comments` / `reactions` table keyed by user id).
// ---------------------------------------------------------------------------

export interface ProductReview {
  id: string;
  author: string;
  rating: number; // 1-5
  skinType?: string;
  text: string;
  createdAt: string;
  helpful: number;
}

export interface BriefComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
  helpful: number;
}

export interface ActivityEntry {
  id: string;
  type: "review" | "comment";
  author: string;
  targetSlug: string;
  targetLabel: string;
  snippet: string;
  createdAt: string;
}

const ACTIVITY_FEED_KEY = "kbr:activity-feed";
const FEED_LIMIT = 50;

function pushActivity(entry: ActivityEntry) {
  try {
    const raw = window.localStorage.getItem(ACTIVITY_FEED_KEY);
    const current: ActivityEntry[] = raw ? JSON.parse(raw) : [];
    const next = [entry, ...current].slice(0, FEED_LIMIT);
    window.localStorage.setItem(ACTIVITY_FEED_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("kbr-storage", { detail: { key: ACTIVITY_FEED_KEY } }));
  } catch {
    // ignore
  }
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("kbr-storage", { detail: { key } }));
}

export function useProductReviews(productSlug: string, productLabel: string) {
  const key = `kbr:reviews:${productSlug}`;
  const [reviews, setReviews] = useState<ProductReview[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe sync from localStorage (no window during SSR)
    setReviews(readJson(key, []));
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.key === key) setReviews(readJson(key, []));
    };
    window.addEventListener("kbr-storage", handler);
    return () => window.removeEventListener("kbr-storage", handler);
  }, [key]);

  const addReview = useCallback(
    (input: { author: string; rating: number; skinType?: string; text: string }) => {
      const review: ProductReview = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        author: input.author,
        rating: input.rating,
        skinType: input.skinType,
        text: input.text,
        createdAt: new Date().toISOString(),
        helpful: 0,
      };
      const next = [review, ...readJson<ProductReview[]>(key, [])];
      writeJson(key, next);
      setReviews(next);
      pushActivity({
        id: review.id,
        type: "review",
        author: input.author,
        targetSlug: productSlug,
        targetLabel: productLabel,
        snippet: input.text.slice(0, 140),
        createdAt: review.createdAt,
      });
    },
    [key, productSlug, productLabel]
  );

  const markHelpful = useCallback(
    (id: string) => {
      const current = readJson<ProductReview[]>(key, []);
      const next = current.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r));
      writeJson(key, next);
      setReviews(next);
    },
    [key]
  );

  return { reviews, addReview, markHelpful };
}

export function useBriefComments(briefSlug: string, briefLabel: string) {
  const key = `kbr:comments:${briefSlug}`;
  const [comments, setComments] = useState<BriefComment[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe sync from localStorage (no window during SSR)
    setComments(readJson(key, []));
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.key === key) setComments(readJson(key, []));
    };
    window.addEventListener("kbr-storage", handler);
    return () => window.removeEventListener("kbr-storage", handler);
  }, [key]);

  const addComment = useCallback(
    (input: { author: string; text: string }) => {
      const comment: BriefComment = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        author: input.author,
        text: input.text,
        createdAt: new Date().toISOString(),
        helpful: 0,
      };
      const next = [comment, ...readJson<BriefComment[]>(key, [])];
      writeJson(key, next);
      setComments(next);
      pushActivity({
        id: comment.id,
        type: "comment",
        author: input.author,
        targetSlug: briefSlug,
        targetLabel: briefLabel,
        snippet: input.text.slice(0, 140),
        createdAt: comment.createdAt,
      });
    },
    [key, briefSlug, briefLabel]
  );

  const markHelpful = useCallback(
    (id: string) => {
      const current = readJson<BriefComment[]>(key, []);
      const next = current.map((c) => (c.id === id ? { ...c, helpful: c.helpful + 1 } : c));
      writeJson(key, next);
      setComments(next);
    },
    [key]
  );

  return { comments, addComment, markHelpful };
}

export function useActivityFeed() {
  const [feed, setFeed] = useState<ActivityEntry[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe sync from localStorage (no window during SSR)
    setFeed(readJson(ACTIVITY_FEED_KEY, []));
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.key === ACTIVITY_FEED_KEY) setFeed(readJson(ACTIVITY_FEED_KEY, []));
    };
    window.addEventListener("kbr-storage", handler);
    return () => window.removeEventListener("kbr-storage", handler);
  }, []);

  return { feed };
}

const REACTION_EMOJIS = ["😍", "👍", "🤔", "😖"] as const;
export type ReactionEmoji = (typeof REACTION_EMOJIS)[number];

export function useProductReactions(productSlug: string) {
  const key = `kbr:reactions:${productSlug}`;
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [myReaction, setMyReaction] = useState<ReactionEmoji | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe sync from localStorage (no window during SSR)
    setCounts(readJson(key, {}));
    setMyReaction(readJson(`${key}:mine`, null));
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.key === key) setCounts(readJson(key, {}));
    };
    window.addEventListener("kbr-storage", handler);
    return () => window.removeEventListener("kbr-storage", handler);
  }, [key]);

  const react = useCallback(
    (emoji: ReactionEmoji) => {
      const current = readJson<Record<string, number>>(key, {});
      const previous = readJson<ReactionEmoji | null>(`${key}:mine`, null);
      const next = { ...current };
      if (previous) next[previous] = Math.max(0, (next[previous] ?? 0) - 1);
      if (previous === emoji) {
        // toggling the same reaction off
        writeJson(key, next);
        writeJson(`${key}:mine`, null);
        setCounts(next);
        setMyReaction(null);
        return;
      }
      next[emoji] = (next[emoji] ?? 0) + 1;
      writeJson(key, next);
      writeJson(`${key}:mine`, emoji);
      setCounts(next);
      setMyReaction(emoji);
    },
    [key]
  );

  return { counts, myReaction, react, emojis: REACTION_EMOJIS };
}
