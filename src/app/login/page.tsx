"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { RadarLogo } from "@/components/ui/logo-mark";
import { useSession } from "@/lib/client-store";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    signIn(trimmed);
    router.push(params.get("next") ?? "/profile");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className="mb-1.5 block text-[12.5px] font-medium text-[var(--color-ink-muted)]">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="you@email.com"
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-[13.5px] outline-none focus:border-[var(--color-ink)]"
        />
        {error && <p className="mt-1.5 text-[12px] text-[var(--color-down)]">{error}</p>}
      </div>
      <button
        type="submit"
        className="rounded-md bg-[var(--color-ink)] px-4 py-2.5 text-[13.5px] font-semibold text-white hover:opacity-90"
      >
        Continue
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <Section className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <RadarLogo size={32} />
          <h1 className="font-display text-[20px] font-semibold">Sign in</h1>
          <p className="text-[13px] text-[var(--color-ink-muted)]">
            Demo authentication — this build stores a session on this device only. No password or account
            creation is required.
          </p>
        </div>

        <Suspense fallback={<div className="h-[110px]" />}>
          <LoginForm />
        </Suspense>

        <p className="mt-5 text-center text-[12px] text-[var(--color-ink-faint)]">
          Continuing creates a local demo session — saved products, followed brands and profile
          preferences stay on this device.{" "}
          <Link href="/" className="underline underline-offset-2 hover:text-[var(--color-ink)]">
            Back home
          </Link>
        </p>
      </div>
    </Section>
  );
}
