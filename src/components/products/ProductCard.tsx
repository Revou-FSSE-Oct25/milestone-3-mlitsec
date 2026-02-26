import Image from "next/image";
import Link from "next/link";
import { formatCurrencyUSDToIDR } from "@/lib/utils";
import { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-52 items-center justify-center bg-white p-4">
        <Image src={product.image} alt={product.title} width={150} height={150} className="max-h-40 w-auto object-contain transition group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs capitalize text-[color:var(--muted)]">{product.category}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold">{product.title}</h3>
        <p className="mt-auto pt-3 font-bold text-[color:var(--accent)]">
          {formatCurrencyUSDToIDR(product.price)}
        </p>
      </div>
    </Link>
  );
}
