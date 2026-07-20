"use client";

import { useState } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { useBriefComments, useSession } from "@/lib/client-store";

export function BriefDiscussion({ briefSlug, briefTitle }: { briefSlug: string; briefTitle: string }) {
  const { comments, addComment, markHelpful } = useBriefComments(briefSlug, briefTitle);
  const { session } = useSession();
  const [author, setAuthor] = useState(session?.email.split("@")[0] ?? "");
  const [text, setText] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;
    addComment({ author: author.trim(), text: text.trim() });
    setText("");
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-[var(--color-ink-muted)]" />
        <h2 className="font-display text-[15px] font-semibold">
          Discussion {comments.length > 0 && `(${comments.length})`}
        </h2>
      </div>

      <form onSubmit={submit} className="mb-6 flex flex-col gap-2.5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <input
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]"
        />
        <textarea
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you think?"
          rows={3}
          className="rounded-md border border-[var(--color-border)] px-3 py-2 text-[13px] outline-none focus:border-[var(--color-ink)]"
        />
        <button type="submit" className="self-start rounded-md bg-[var(--color-ink)] px-4 py-2 text-[13px] font-semibold text-white hover:opacity-90">
          Post comment
        </button>
      </form>

      {comments.length === 0 ? (
        <p className="text-[13px] text-[var(--color-ink-faint)]">No comments yet — start the discussion.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {comments.map((c) => (
            <div key={c.id} className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[13px] font-semibold">{c.author}</span>
                <span className="text-[11px] text-[var(--color-ink-faint)]">
                  {new Date(c.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </span>
              </div>
              <p className="text-[13.5px] leading-relaxed text-[var(--color-ink)]">{c.text}</p>
              <button
                onClick={() => markHelpful(c.id)}
                className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-ink-faint)] hover:text-[var(--color-cobalt)]"
              >
                <ThumbsUp className="h-3.5 w-3.5" /> Helpful{c.helpful > 0 ? ` (${c.helpful})` : ""}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
