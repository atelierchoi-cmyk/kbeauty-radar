import { NextResponse } from "next/server";
import { getBrands, getProducts, getSources, getTrendEvents, getBriefs } from "@/lib/data";
import reviewsJson from "@/data/review-aggregates.json";

export async function GET() {
  const [brands, products, sources, trendEvents, briefs] = await Promise.all([
    getBrands(),
    getProducts(),
    getSources(),
    getTrendEvents(),
    getBriefs(),
  ]);
  return NextResponse.json({ brands, products, sources, reviewAggregates: reviewsJson, trendEvents, briefs });
}
