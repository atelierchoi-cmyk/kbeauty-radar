import type { MetadataRoute } from "next";
import { getBrands, getProducts, getCountries, getIngredients, getBriefs } from "@/lib/data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [brands, products, countries, ingredients, briefs] = await Promise.all([
    getBrands(),
    getProducts(),
    getCountries(),
    getIngredients(),
    getBriefs(),
  ]);

  const staticRoutes = [
    "",
    "/radar",
    "/rankings",
    "/brands",
    "/products",
    "/compare",
    "/celebrity-impact",
    "/community",
    "/countries",
    "/ingredients",
    "/briefs",
    "/search",
    "/methodology",
    "/about",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const brandRoutes = brands.map((b) => ({ url: `${BASE_URL}/brands/${b.slug}`, lastModified: new Date() }));
  const productRoutes = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(p.lastUpdated),
  }));
  const countryRoutes = countries.map((c) => ({ url: `${BASE_URL}/countries/${c.slug}`, lastModified: new Date() }));
  const ingredientRoutes = ingredients.map((i) => ({ url: `${BASE_URL}/ingredients/${i.slug}`, lastModified: new Date() }));
  const briefRoutes = briefs.map((b) => ({
    url: `${BASE_URL}/briefs/${b.slug}`,
    lastModified: new Date(b.publishedAt),
  }));

  return [...staticRoutes, ...brandRoutes, ...productRoutes, ...countryRoutes, ...ingredientRoutes, ...briefRoutes];
}
