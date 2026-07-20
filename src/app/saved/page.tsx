"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { BrandMark } from "@/components/ui/logo-mark";
import { ProductCard } from "@/components/product-card";
import { useSavedProducts, useFollowedBrands } from "@/lib/client-store";
import type { Product, Brand } from "@/lib/types";

export default function SavedPage() {
  const { items: savedSlugs } = useSavedProducts();
  const { items: followedSlugs } = useFollowedBrands();
  const [data, setData] = useState<{ products: Product[]; brands: Brand[] } | null>(null);

  useEffect(() => {
    fetch("/api/compare-data")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ products: [], brands: [] }));
  }, []);

  const savedProducts = (data?.products ?? []).filter((p) => savedSlugs.includes(p.slug));
  const followedBrands = (data?.brands ?? []).filter((b) => followedSlugs.includes(b.slug));
  const brandBySlug = new Map((data?.brands ?? []).map((b) => [b.slug, b]));

  return (
    <Section className="py-10">
      <SectionHeading
        eyebrow="Your library"
        title="Saved"
        description="Saved products and followed brands live on this device. Sign in support for cross-device sync is on the roadmap."
      />

      <div className="mb-10">
        <h2 className="font-display mb-4 text-[15px] font-semibold">
          Followed Brands {followedBrands.length > 0 && `(${followedBrands.length})`}
        </h2>
        {followedBrands.length === 0 ? (
          <EmptyState message="No followed brands yet." linkHref="/brands" linkLabel="Browse brands" />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {followedBrands.map((b) => (
              <Link key={b.slug} href={`/brands/${b.slug}`} className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 hover:border-[var(--color-ink)]">
                <BrandMark initial={b.logoInitial} color={b.logoColor} size={32} />
                <div className="text-[13.5px] font-medium">{b.englishName}</div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="font-display mb-4 text-[15px] font-semibold">
          Saved Products {savedProducts.length > 0 && `(${savedProducts.length})`}
        </h2>
        {savedProducts.length === 0 ? (
          <EmptyState message="No saved products yet." linkHref="/products" linkLabel="Browse products" />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {savedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} brand={brandBySlug.get(p.brandSlug)} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

function EmptyState({ message, linkHref, linkLabel }: { message: string; linkHref: string; linkLabel: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border-strong)] p-8 text-center">
      <p className="text-[13.5px] text-[var(--color-ink-muted)]">{message}</p>
      <Link href={linkHref} className="mt-2 inline-block text-[13px] font-medium text-[var(--color-cobalt)] hover:underline">
        {linkLabel}
      </Link>
    </div>
  );
}
