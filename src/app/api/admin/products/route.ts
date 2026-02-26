import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createAdminProductId, readAdminProducts, writeAdminProducts } from "@/lib/local-products";
import { Product } from "@/types/product";

function validateProduct(payload: Partial<Product>) {
  if (!payload.title || !payload.price || Number(payload.price) <= 0) return "Judul dan harga harus valid.";
  return null;
}

export async function GET() {
  const products = await readAdminProducts();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<Product>;
    const error = validateProduct(body);
    if (error) return NextResponse.json({ message: error }, { status: 400 });

    const products = await readAdminProducts();
    const newProduct: Product = {
      id: createAdminProductId(products),
      title: body.title!,
      price: Number(body.price),
      description: body.description ?? "",
      category: body.category ?? "general",
      image: body.image ?? "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: body.rating,
    };

    await writeAdminProducts([newProduct, ...products]);
    revalidatePath("/admin");
    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Gagal menambah produk." }, { status: 500 });
  }
}
