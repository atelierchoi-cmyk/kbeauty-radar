"use client";

import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import { useProductReviews, useSession } from "@/lib/client-store";

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= rating ? "fill-[var(--color-lime)] text-[var(--color-lime-ink)]" : "text-[var(--color-border-strong)]"}
        />
      ))}
    </div>
  );
}

export function ProductCommunityReviews({ productSlug, productLabel }: { productSlug: string; productLabel: string }) {
  const { reviews, addReview, markHelpful } = useProductReviews(productSlug, productLabel);
  const { session } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState(session?.email.split("@")[0] ?? "");
  const [rating, setRating] = useState(5);
  const [skinType, setSkinType] = useState("");
  const [text, setText] = useState("");

  const average =
    reviews.length > 0 ? Math.round((reviews.reduce((a, r) => a + r.rating, 0) / reviews.length) * 10) / 10 : null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;
    addReview({ author: author.trim(), rating, skinType: skinType || undefined, text: text.trim() });
    setText("");
    setShowForm(false);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-[15px] font-semibold">
            Community Reviews {reviews.length > 0 && `(${reviews.length})`}
          </h2>
          <p className="mt-1 text-[12px] text-[var(--color-ink-faint)]">
            Written directly by K-Beauty Radar visitors — not pulled from other sites. Saved to this device only.
          </p>
        </div>
        {average !== null && (
          <div className="flex shrink-0 items-center gap-2">
            <StarRow rating={Math.round(average)} size={16} />
            <span className="tnum text-[14px] font-semibold">{average}</span>
          </div>
        )}
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="mb-5 rounded-md bg-[var(--color-ink)] px-4 py-2 text-[13px] font-semibold text-white hover:opacity-90"
        >
          Write a review
        </button>
      ) : (
        <form onSubmit={submit} className="mb-6 flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="mb-1 block text-[11.5px] font-medium text-[var(--color-ink-muted)]">Your rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setRating(n)}>
                    <Star
                      size={22}
                      className={n <= rating ? "fill-[var(--color-lime)] text-[var(--color-lime-ink)]" : "text-[var(--color-border-strong)]"}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="mb-1 block text-[11.5px] font-medium text-[var(--color-ink-muted)]">Name</label>
              <input
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Display name"
                className="w-full rounded-md border border-[var(--color-border)] px-3 py-1.5 text-[13px] outline-none focus:border-[var(--color-ink)]"
              />
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="mb-1 block text-[11.5px] font-medium text-[var(--color-ink-muted)]">Skin type (optional)</label>
              <select
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
                className="w-full rounded-md border border-[var(--color-border)] px-3 py-1.5 text-[13px] outline-none"
              >
                <option value="">—</option>
                <option>Dry</option>
                <option>Oily</option>
                <option>Combination</option>
                <option>Sensitive</option>
                <option>Acne-prone</option>
              </select>
            </div>
          </div>
          <textarea
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`What was your experience with ${productLabel}?`}
            rows={3}
            className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]"
          />
          <div className="flex gap-2">
            <button type="submit" className="rounded-md bg-[var(--color-ink)] px-4 py-2 text-[13px] font-semibold text-white hover:opacity-90">
              Post review
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded-md border border-[var(--color-border-strong)] px-4 py-2 text-[13px] font-medium hover:border-[var(--color-ink)]">
              Cancel
            </button>
          </div>
        </form>
      )}

      {reviews.length === 0 ? (
        <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border-strong)] p-6 text-center text-[13px] text-[var(--color-ink-muted)]">
          No community reviews yet — be the first to share your experience.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold">{r.author}</span>
                  {r.skinType && (
                    <span className="rounded-[var(--radius-pill)] bg-[var(--color-surface-raised)] px-2 py-0.5 text-[10.5px] text-[var(--color-ink-muted)]">
                      {r.skinType}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[var(--color-ink-faint)]">
                  {new Date(r.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </span>
              </div>
              <StarRow rating={r.rating} />
              <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-ink)]">{r.text}</p>
              <button
                onClick={() => markHelpful(r.id)}
                className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-ink-faint)] hover:text-[var(--color-cobalt)]"
              >
                <ThumbsUp className="h-3.5 w-3.5" /> Helpful{r.helpful > 0 ? ` (${r.helpful})` : ""}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
