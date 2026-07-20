"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  if (status === "submitted") {
    return (
      <div className="flex w-full max-w-sm shrink-0 items-center rounded-md border border-white/20 bg-white/10 px-3.5 py-2.5 text-[13.5px] text-white">
        Subscribed — check your inbox to confirm.
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("submitted");
      }}
      className="flex w-full max-w-sm shrink-0 gap-2"
    >
      <input
        type="email"
        required
        placeholder="you@email.com"
        className="w-full rounded-md border border-white/20 bg-white/10 px-3.5 py-2.5 text-[13.5px] text-white placeholder:text-white/50 outline-none focus:border-white/50"
      />
      <button
        type="submit"
        className="shrink-0 rounded-md bg-[var(--color-lime)] px-4 py-2.5 text-[13px] font-semibold text-[var(--color-lime-ink)] hover:opacity-90"
      >
        Subscribe
      </button>
    </form>
  );
}
