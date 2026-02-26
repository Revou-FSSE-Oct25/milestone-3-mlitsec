"use client";

import Link from "next/link";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const { products, loading, error, refetch } = useProducts();

  return (
    <div className="page-shell py-8">
      <section className="card p-6 sm:p-8">
        <p className="text-sm font-semibold tracking-[0.18em] text-[color:var(--accent)] uppercase">RevoShop</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Belanja produk favoritmu dengan tampilan yang simpel dan nyaman.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[color:var(--muted)] sm:text-base">
          Jelajahi daftar produk, lihat detail, lalu tambahkan ke cart untuk simulasi checkout.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/promo" className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white">
            Lihat Promo
          </Link>
          <Link href="/faq" className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-semibold">
            FAQ
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Produk</h2>
            <p className="text-sm text-[color:var(--muted)]">Daftar produk ditampilkan dari FakeStoreAPI</p>
          </div>
          <button type="button" onClick={refetch} className="rounded-lg border border-[color:var(--border)] bg-white px-3 py-2 text-sm">
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="card h-72 animate-pulse bg-neutral-100" />
            ))}
          </div>
        ) : error ? (
          <div className="card p-6">
            <p className="font-medium text-red-600">Gagal memuat produk.</p>
            <p className="mt-1 text-sm text-[color:var(--muted)]">{error}</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </div>
  );
}
