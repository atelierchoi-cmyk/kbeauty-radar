export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "K-Beauty Radar";
export const APP_TAGLINE = "What the world really thinks about K-Beauty.";
export const APP_TAGLINE_KO = "세계 소비자들이 K-뷰티를 실제로 어떻게 평가하는지 보여줍니다.";

// Toggle data backend: when Supabase env vars are present, the data-access
// layer should read/write Supabase instead of local JSON. See src/lib/data.ts.
export const USE_SUPABASE = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const NAV_LINKS = [
  { href: "/radar", label: "Radar" },
  { href: "/rankings", label: "Rankings" },
  { href: "/brands", label: "Brands" },
  { href: "/products", label: "Products" },
  { href: "/celebrity-impact", label: "Celebrity Impact" },
  { href: "/community", label: "Community" },
  { href: "/briefs", label: "Briefs" },
] as const;
