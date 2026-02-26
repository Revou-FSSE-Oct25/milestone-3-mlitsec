import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { getProductByIdFromFakeStore } from "@/lib/fakestore";
import { formatCurrencyUSDToIDR } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductByIdFromFakeStore(id);

  if (!product) notFound();

  return (
    <div className="page-shell py-8">
      <Link href="/" className="text-sm font-medium text-[color:var(--accent)] hover:underline">
        Kembali ke produk
      </Link>

      <section className="card mt-4 grid gap-6 p-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex min-h-80 items-center justify-center rounded-2xl bg-white p-6">
          <Image src={product.image} alt={product.title} width={320} height={320} className="max-h-80 w-auto object-contain" priority />
        </div>
        <div>
          <p className="text-sm capitalize text-[color:var(--muted)]">{product.category}</p>
          <h1 className="mt-2 text-2xl font-semibold">{product.title}</h1>
          <p className="mt-3 text-2xl font-bold text-[color:var(--accent)]">
            {formatCurrencyUSDToIDR(product.price)}
          </p>
          <p className="mt-5 leading-7 text-[color:var(--muted)]">{product.description}</p>
          <div className="mt-6 flex gap-3">
            <AddToCartButton product={product} />
            <Link href="/cart" className="rounded-xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm font-semibold">
              Lihat Cart
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
