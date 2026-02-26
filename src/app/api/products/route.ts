import { NextResponse } from "next/server";
import { getProductsFromFakeStore } from "@/lib/fakestore";

export async function GET() {
  try {
    const products = await getProductsFromFakeStore();
    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ message: "Gagal memuat produk." }, { status: 500 });
  }
}
