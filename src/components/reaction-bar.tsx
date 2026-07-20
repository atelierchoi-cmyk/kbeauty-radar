"use client";

import { useProductReactions } from "@/lib/client-store";

const EMOJI_LABEL: Record<string, string> = {
  "😍": "Love it",
  "👍": "Would repurchase",
  "🤔": "Mixed feelings",
  "😖": "Not for me",
};

export function ReactionBar({ productSlug }: { productSlug: string }) {
  const { counts, myReaction, react, emojis } = useProductReactions(productSlug);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[13px] font-semibold">Quick reaction</h3>
        <span className="text-[11.5px] text-[var(--color-ink-faint)]">
          {total > 0 ? `${total} reaction${total > 1 ? "s" : ""} from this device` : "Tap to react"}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {emojis.map((emoji) => {
          const count = counts[emoji] ?? 0;
          const active = myReaction === emoji;
          return (
            <button
              key={emoji}
              onClick={() => react(emoji)}
              title={EMOJI_LABEL[emoji]}
              className={`flex items-center gap-1.5 rounded-[var(--radius-pill)] border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                active
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white"
                  : "border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
              }`}
            >
              <span className="text-[16px]">{emoji}</span>
              {count > 0 && <span className="tnum">{count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
