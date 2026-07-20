import { NextResponse } from "next/server";
import { getProducts, getBrands } from "@/lib/data";

export async function GET() {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  return NextResponse.json({ products, brands });
}
