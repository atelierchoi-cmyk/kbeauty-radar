import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { BrandMark } from "@/components/ui/logo-mark";
import { BriefDiscussion } from "@/components/brief-discussion";
import { getBrief, getBriefs, getBrands, getProducts } from "@/lib/data";

export async function generateStaticParams() {
  const briefs = await getBriefs();
  return briefs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brief = await getBrief(slug);
  if (!brief) return {};
  return { title: brief.title, description: brief.summary };
}

export default async function BriefDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [brief, brands, products] = await Promise.all([getBrief(slug), getBrands(), getProducts()]);
  if (!brief) notFound();

  const relatedBrands = brands.filter((b) => brief.relatedBrandSlugs.includes(b.slug));
  const relatedProducts = products.filter((p) => brief.relatedProductSlugs.includes(p.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: brief.title,
    description: brief.summary,
    author: { "@type": "Organization", name: brief.author },
    datePublished: brief.publishedAt,
  };

  return (
    <div className="pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Section className="pt-10 pb-6 text-[12.5px] text-[var(--color-ink-faint)]">
        <Link href="/briefs" className="hover:text-[var(--color-ink)]">
          Radar Brief
        </Link>
        {" / "}
        <span className="text-[var(--color-ink-muted)]">{brief.title}</span>
      </Section>

      <Section className="pb-10">
        <div className="max-w-2xl">
          <div className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">{brief.category}</div>
          <h1 className="font-display mt-2 text-[28px] font-semibold leading-tight tracking-tight sm:text-[34px]">{brief.title}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">{brief.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-[var(--color-ink-faint)]">
            <span>{brief.author}</span>
            <span>·</span>
            <span>{new Date(brief.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
            <span>·</span>
            <span>Data as of {brief.dataAsOf}</span>
          </div>
        </div>
      </Section>

      <Section className="pb-10">
        <div className="prose-none max-w-2xl">
          {brief.body.map((para, i) => (
            <p key={i} className="mb-4 text-[15px] leading-relaxed text-[var(--color-ink)]">
              {para}
            </p>
          ))}
        </div>
      </Section>

      {(relatedBrands.length > 0 || relatedProducts.length > 0) && (
        <Section className="pb-10">
          <div className="max-w-2xl border-t border-[var(--color-border)] pt-6">
            {relatedBrands.length > 0 && (
              <div className="mb-4">
                <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">Related Brands</h3>
                <div className="flex flex-wrap gap-2">
                  {relatedBrands.map((b) => (
                    <Link key={b.slug} href={`/brands/${b.slug}`} className="flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] px-3 py-1.5 text-[12.5px] font-medium hover:border-[var(--color-ink)]">
                      <BrandMark initial={b.logoInitial} color={b.logoColor} size={18} />
                      {b.englishName}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {relatedProducts.length > 0 && (
              <div className="mb-4">
                <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">Related Products</h3>
                <div className="flex flex-wrap gap-2">
                  {relatedProducts.map((p) => (
                    <Link key={p.slug} href={`/products/${p.slug}`} className="rounded-[var(--radius-pill)] border border-[var(--color-border)] px-3 py-1.5 text-[12.5px] font-medium hover:border-[var(--color-ink)]">
                      {p.englishName}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">Sources</h3>
              <ul className="flex flex-col gap-1">
                {brief.sources.map((s) => (
                  <li key={s} className="text-[12.5px] text-[var(--color-ink-muted)]">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      )}

      <Section className="pb-16">
        <div className="max-w-2xl border-t border-[var(--color-border)] pt-8">
          <BriefDiscussion briefSlug={brief.slug} briefTitle={brief.title} />
        </div>
      </Section>
    </div>
  );
}
