"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { useUserProfile, useSession } from "@/lib/client-store";

const COUNTRIES = ["Korea", "United States", "United Kingdom", "Canada", "Japan", "Thailand", "Indonesia", "UAE"];
const AGE_RANGES = ["Under 18", "18-24", "25-34", "35-44", "45+"];
const SKIN_TYPES = ["Dry", "Oily", "Combination", "Sensitive", "Acne-prone"];
const CONCERNS = ["Dullness", "Redness", "Enlarged pores", "Dehydration", "Uneven texture", "Breakouts"];
const PRICE_RANGES = ["Under $15", "$15-25", "$25-40", "$40+"];
const CATEGORIES = ["Essence", "Serum", "Cream", "Sunscreen", "Toner", "Sheet Mask", "Cushion"];

export default function ProfilePage() {
  const { profile, update } = useUserProfile();
  const { session, ready, signOut } = useSession();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs local form draft when the underlying stored profile loads/changes
    setForm(profile);
  }, [profile]);

  function toggleMulti(key: "skinConcerns" | "interestedCategories", value: string) {
    const current = form[key] ?? [];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    setForm({ ...form, [key]: next });
  }

  return (
    <Section className="py-10">
      <SectionHeading
        eyebrow="Personalization"
        title="Profile"
        description="These preferences personalize recommendations and defaults across the site. Stored on this device only — no medical or health information is collected."
      />

      {ready && (
        <div className="mb-8 flex max-w-xl items-center justify-between rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          {session ? (
            <>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-ink)] text-[13px] font-semibold text-white">
                  {session.email[0]?.toUpperCase()}
                </div>
                <div>
                  <div className="text-[13.5px] font-medium">{session.email}</div>
                  <div className="text-[11.5px] text-[var(--color-ink-faint)]">
                    Signed in {new Date(session.signedInAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </div>
                </div>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 rounded-md border border-[var(--color-border-strong)] px-3 py-1.5 text-[12.5px] font-medium text-[var(--color-ink)] hover:border-[var(--color-down)] hover:text-[var(--color-down)]"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign out
              </button>
            </>
          ) : (
            <>
              <div className="text-[13px] text-[var(--color-ink-muted)]">
                Not signed in — profile preferences below still save to this device.
              </div>
              <Link
                href="/login?next=/profile"
                className="flex items-center gap-1.5 rounded-md bg-[var(--color-ink)] px-3 py-1.5 text-[12.5px] font-semibold text-white hover:opacity-90"
              >
                <LogIn className="h-3.5 w-3.5" /> Sign in
              </Link>
            </>
          )}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          update(form);
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }}
        className="max-w-xl"
      >
        <Field label="Country">
          <select
            value={form.country ?? ""}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13.5px] outline-none focus:border-[var(--color-ink)]"
          >
            <option value="">Prefer not to say</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Age range">
          <select
            value={form.ageRange ?? ""}
            onChange={(e) => setForm({ ...form, ageRange: e.target.value })}
            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13.5px] outline-none focus:border-[var(--color-ink)]"
          >
            <option value="">Prefer not to say</option>
            {AGE_RANGES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Skin type">
          <select
            value={form.skinType ?? ""}
            onChange={(e) => setForm({ ...form, skinType: e.target.value })}
            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13.5px] outline-none focus:border-[var(--color-ink)]"
          >
            <option value="">Prefer not to say</option>
            {SKIN_TYPES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Skin concerns">
          <div className="flex flex-wrap gap-2">
            {CONCERNS.map((c) => (
              <Chip key={c} label={c} active={(form.skinConcerns ?? []).includes(c)} onClick={() => toggleMulti("skinConcerns", c)} />
            ))}
          </div>
        </Field>

        <Field label="Preferred price range">
          <select
            value={form.priceRange ?? ""}
            onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[13.5px] outline-none focus:border-[var(--color-ink)]"
          >
            <option value="">No preference</option>
            {PRICE_RANGES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Interested categories">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Chip key={c} label={c} active={(form.interestedCategories ?? []).includes(c)} onClick={() => toggleMulti("interestedCategories", c)} />
            ))}
          </div>
        </Field>

        <button
          type="submit"
          className="mt-2 rounded-md bg-[var(--color-ink)] px-5 py-2.5 text-[13.5px] font-semibold text-white hover:opacity-90"
        >
          Save profile
        </button>
        {saved && <span className="ml-3 text-[13px] text-[var(--color-up)]">Saved.</span>}
      </form>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="mb-1.5 block text-[12.5px] font-medium text-[var(--color-ink-muted)]">{label}</label>
      {children}
    </div>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[var(--radius-pill)] border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
        active
          ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white"
          : "border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-ink)]"
      }`}
    >
      {label}
    </button>
  );
}
