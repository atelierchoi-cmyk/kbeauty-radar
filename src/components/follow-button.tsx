"use client";

import { Bookmark, BookmarkCheck, Plus, Check } from "lucide-react";
import { useFollowedBrands, useSavedProducts, useCompareList } from "@/lib/client-store";

export function FollowBrandButton({ slug }: { slug: string }) {
  const { has, toggle } = useFollowedBrands();
  const following = has(slug);
  return (
    <button
      onClick={() => toggle(slug)}
      className={`flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-[13px] font-medium transition-colors ${
        following
          ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white"
          : "border-[var(--color-border-strong)] text-[var(--color-ink)] hover:border-[var(--color-ink)]"
      }`}
    >
      {following ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      {following ? "Following" : "Follow"}
    </button>
  );
}

export function SaveProductButton({ slug }: { slug: string }) {
  const { has, toggle } = useSavedProducts();
  const saved = has(slug);
  return (
    <button
      onClick={() => toggle(slug)}
      className={`flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-[13px] font-medium transition-colors ${
        saved
          ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white"
          : "border-[var(--color-border-strong)] text-[var(--color-ink)] hover:border-[var(--color-ink)]"
      }`}
    >
      {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      {saved ? "Saved" : "Save"}
    </button>
  );
}

export function CompareAddButton({ slug }: { slug: string }) {
  const { has, add, remove, isFull } = useCompareList();
  const added = has(slug);
  return (
    <button
      onClick={() => (added ? remove(slug) : add(slug))}
      disabled={!added && isFull}
      className={`flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        added
          ? "border-[var(--color-cobalt)] bg-[var(--color-cobalt-soft)] text-[var(--color-cobalt)]"
          : "border-[var(--color-border-strong)] text-[var(--color-ink)] hover:border-[var(--color-ink)]"
      }`}
    >
      {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      {added ? "In Compare" : isFull ? "Compare full (4)" : "Add to Compare"}
    </button>
  );
}
