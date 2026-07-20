import {
  Droplet,
  Sun,
  Sparkles,
  Layers,
  CircleDot,
  Square,
  Smile,
  type LucideIcon,
} from "lucide-react";

const CATEGORY_ICON: Record<string, LucideIcon> = {
  Essence: Droplet,
  Serum: Droplet,
  Toner: Droplet,
  Ampoule: Sparkles,
  Cream: Layers,
  Sunscreen: Sun,
  "Sheet Mask": Smile,
  Pad: CircleDot,
  Cushion: CircleDot,
  "Lip Care": Square,
};

const TONE_BG: Record<string, string> = {
  beige: "linear-gradient(135deg, #f2e9d8 0%, #e8dcc4 100%)",
  green: "linear-gradient(135deg, #e4efdd 0%, #d3e6c8 100%)",
  blue: "linear-gradient(135deg, #e2ebf8 0%, #cfe0f4 100%)",
  yellow: "linear-gradient(135deg, #faf3d6 0%, #f3e7ac 100%)",
  pink: "linear-gradient(135deg, #f8e7ea 0%, #f1d3d9 100%)",
  white: "linear-gradient(135deg, #f5f5f2 0%, #e9e8e2 100%)",
};

const TONE_ICON_COLOR: Record<string, string> = {
  beige: "#8a6d3b",
  green: "#3f6b3a",
  blue: "#33518c",
  yellow: "#8a7420",
  pink: "#9c4f5c",
  white: "#6b6255",
};

/**
 * Placeholder product visual. This build does not include real product
 * photography — brand product images are copyrighted assets that would
 * need to be licensed/sourced directly from each brand, not generated or
 * scraped. Swap in real photos via a CMS/Supabase `image_url` field (see
 * `products.imageUrl` in supabase/schema.sql) once available.
 */
export function ProductVisual({
  category,
  imageTone,
  imageUrl,
  size = "card",
}: {
  category: string;
  imageTone: string;
  imageUrl?: string;
  size?: "card" | "hero";
}) {
  const heightClass = size === "hero" ? "h-[300px]" : "h-32";

  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- external/unknown-host product photos; avoids next/image domain allowlist coupling for a field that may point anywhere once real data is connected
      <img
        src={imageUrl}
        alt={category}
        className={`w-full ${heightClass} rounded-[var(--radius-card)] object-cover`}
      />
    );
  }

  const Icon = CATEGORY_ICON[category] ?? Droplet;
  const bg = TONE_BG[imageTone] ?? TONE_BG.beige;
  const iconColor = TONE_ICON_COLOR[imageTone] ?? TONE_ICON_COLOR.beige;
  const iconSize = size === "hero" ? 56 : 30;

  return (
    <div
      className={`flex ${heightClass} flex-col items-center justify-center gap-2 rounded-[var(--radius-card)]`}
      style={{ background: bg }}
    >
      <Icon size={iconSize} color={iconColor} strokeWidth={1.5} />
      <span
        className={`font-medium ${size === "hero" ? "text-[13px]" : "text-[11.5px]"}`}
        style={{ color: iconColor }}
      >
        {category}
      </span>
    </div>
  );
}
