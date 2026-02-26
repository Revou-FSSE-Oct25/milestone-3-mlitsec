import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { readAdminProducts, writeAdminProducts } from "@/lib/local-products";
import { Product } from "@/types/product";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const productId = Number(id);
  const products = await readAdminProducts();
  const product = products.find((item) => item.id === productId);
  if (!product) return NextResponse.json({ message: "Produk tidak ditemukan" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PUT(request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const productId = Number(id);
  const body = (await request.json()) as Partial<Product>;
  if (!body.title || !body.price || Number(body.price) <= 0) {
    return NextResponse.json({ message: "Judul dan harga harus valid." }, { status: 400 });
  }

  const products = await readAdminProducts();
  const index = products.findIndex((item) => item.id === productId);
  if (index < 0) return NextResponse.json({ message: "Produk tidak ditemukan" }, { status: 404 });

  const updated: Product = { ...products[index], ...body, id: productId, price: Number(body.price) };
  products[index] = updated;
  await writeAdminProducts(products);
  revalidatePath("/admin");
  return NextResponse.json({ product: updated });
}

export async function DELETE(_: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const productId = Number(id);
  const products = await readAdminProducts();
  const nextProducts = products.filter((item) => item.id !== productId);
  if (nextProducts.length === products.length) {
    return NextResponse.json({ message: "Produk tidak ditemukan" }, { status: 404 });
  }
  await writeAdminProducts(nextProducts);
  revalidatePath("/admin");
  return NextResponse.json({ ok: true });
}
