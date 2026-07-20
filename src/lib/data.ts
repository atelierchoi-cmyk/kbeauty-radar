import "server-only";
import brandsJson from "@/data/brands.json";
import productsJson from "@/data/products.json";
import reviewAggregatesJson from "@/data/review-aggregates.json";
import celebrityEventsJson from "@/data/celebrity-events.json";
import countriesJson from "@/data/countries.json";
import ingredientsJson from "@/data/ingredients.json";
import briefsJson from "@/data/briefs.json";
import sourcesJson from "@/data/sources.json";
import trendEventsJson from "@/data/trend-events.json";
import type {
  Brand,
  Product,
  ReviewAggregate,
  CelebrityEvent,
  Country,
  Ingredient,
  Brief,
  DataSource,
  TrendEvent,
} from "@/lib/types";

/**
 * Data-access layer.
 *
 * Today this reads local seed JSON under src/data/. When Supabase
 * environment variables are present (see src/lib/config.ts USE_SUPABASE),
 * swap the bodies of these functions for Supabase queries against the
 * tables defined in supabase/schema.sql — the function signatures below
 * are intentionally shaped to match those tables so the swap doesn't touch
 * any calling code in src/app/**.
 */

const brands = brandsJson as Brand[];
const products = productsJson as Product[];
const reviewAggregates = reviewAggregatesJson as ReviewAggregate[];
const celebrityEvents = celebrityEventsJson as CelebrityEvent[];
const countries = countriesJson as Country[];
const ingredients = ingredientsJson as Ingredient[];
const briefs = briefsJson as Brief[];
const sources = sourcesJson as DataSource[];
const trendEvents = trendEventsJson as TrendEvent[];

export async function getBrands(): Promise<Brand[]> {
  return brands;
}

export async function getBrand(slug: string): Promise<Brand | undefined> {
  return brands.find((b) => b.slug === slug);
}

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getProductsByBrand(brandSlug: string): Promise<Product[]> {
  return products.filter((p) => p.brandSlug === brandSlug);
}

export async function getReviewAggregatesByProduct(productSlug: string): Promise<ReviewAggregate[]> {
  return reviewAggregates.filter((r) => r.productSlug === productSlug);
}

export async function getCelebrityEvents(): Promise<CelebrityEvent[]> {
  return celebrityEvents;
}

export async function getCelebrityEventsByBrand(brandSlug: string): Promise<CelebrityEvent[]> {
  return celebrityEvents.filter((c) => c.brandSlug === brandSlug);
}

export async function getCountries(): Promise<Country[]> {
  return countries;
}

export async function getCountry(slug: string): Promise<Country | undefined> {
  return countries.find((c) => c.slug === slug);
}

export async function getIngredients(): Promise<Ingredient[]> {
  return ingredients;
}

export async function getIngredient(slug: string): Promise<Ingredient | undefined> {
  return ingredients.find((i) => i.slug === slug);
}

export async function getBriefs(): Promise<Brief[]> {
  return briefs;
}

export async function getBrief(slug: string): Promise<Brief | undefined> {
  return briefs.find((b) => b.slug === slug);
}

export async function getSources(): Promise<DataSource[]> {
  return sources;
}

export async function getTrendEvents(): Promise<TrendEvent[]> {
  return trendEvents;
}

export async function getTrendEventsByBrand(brandSlug: string): Promise<TrendEvent[]> {
  return trendEvents.filter((t) => t.brandSlug === brandSlug);
}

export async function searchAll(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return { brands: [], products: [], ingredients: [], briefs: [] };
  return {
    brands: brands.filter(
      (b) => b.name.toLowerCase().includes(q) || b.englishName.toLowerCase().includes(q)
    ),
    products: products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.englishName.toLowerCase().includes(q)
    ),
    ingredients: ingredients.filter((i) => i.name.toLowerCase().includes(q)),
    briefs: briefs.filter((b) => b.title.toLowerCase().includes(q)),
  };
}
