import { Product } from "@/types/product";

const BASE_URL = "https://fakestoreapi.com";

export async function getProductsFromFakeStore() {
  const response = await fetch(`${BASE_URL}/products`, {
    next: { revalidate: 300 },
  });
  if (!response.ok) throw new Error("Gagal mengambil daftar produk.");
  return (await response.json()) as Product[];
}

export async function getProductByIdFromFakeStore(id: string) {
  const response = await fetch(`${BASE_URL}/products/${id}`, { cache: "no-store" });

  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Gagal mengambil detail produk.");

  const product = (await response.json()) as Product;
  return product?.id ? product : null;
}
