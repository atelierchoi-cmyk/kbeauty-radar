import Link from "next/link";
import { DemoBadge } from "@/components/ui/badge";
import { ProductVisual } from "@/components/ui/product-visual";
import type { Product, Brand } from "@/lib/types";

export function ProductCard({ product, brand }: { product: Product; brand?: Brand }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:border-[var(--color-ink)]"
    >
      <ProductVisual category={product.category} imageTone={product.imageTone} imageUrl={product.imageUrl} />
      <div>
        <div className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
          {brand?.englishName ?? product.brandSlug}
        </div>
        <div className="font-display text-[15px] font-semibold leading-tight">{product.englishName}</div>
      </div>
      <div className="flex items-center justify-between text-[12.5px]">
        <span className="tnum text-[var(--color-ink-muted)]">
          {product.currency} {product.priceMin}–{product.priceMax}
        </span>
        <span className="tnum font-semibold text-[var(--color-ink)]">Score {product.globalReviewScore}</span>
      </div>
      <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-2.5">
        <span className="text-[12px] text-[var(--color-ink-muted)]">{product.reviewVolume.toLocaleString()} reviews</span>
        <DemoBadge />
      </div>
    </Link>
  );
}
