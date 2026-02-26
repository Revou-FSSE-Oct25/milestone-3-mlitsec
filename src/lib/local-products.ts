import { promises as fs } from "fs";
import path from "path";
import { Product } from "@/types/product";

const dataPath = path.join(process.cwd(), "src", "data", "products.json");

export async function readAdminProducts(): Promise<Product[]> {
  const raw = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(raw) as Product[];
}

export async function writeAdminProducts(products: Product[]) {
  await fs.writeFile(dataPath, JSON.stringify(products, null, 2), "utf-8");
}

export function createAdminProductId(products: Product[]) {
  return products.reduce((max, item) => Math.max(max, item.id), 1000) + 1;
}
