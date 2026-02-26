"use client";

import Image from "next/image";
import Link from "next/link";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCart } from "@/context/CartContext";
import { formatCurrencyUSDToIDR } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQty, clear } = useCart();

  return (
    <div className="page-shell py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Keranjang Belanja</h1>
          <p className="text-sm text-[color:var(--muted)]">Data cart tersimpan di localStorage.</p>
        </div>
        {items.length > 0 ? (
          <button type="button" onClick={clear} className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Clear Cart
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="font-semibold">Cart masih kosong</p>
          <Link href="/" className="mt-4 inline-block rounded-lg bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card flex gap-4 p-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-white p-2">
                  <Image src={item.image} alt={item.title} width={80} height={80} className="max-h-20 w-auto object-contain" />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-[color:var(--muted)]">{formatCurrencyUSDToIDR(item.price)}</p>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-[color:var(--muted)]">Qty</label>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) => updateQty(item.id, Number(event.target.value || 1))}
                      className="w-20 rounded-lg border border-[color:var(--border)] bg-white px-2 py-1"
                    />
                    <button type="button" onClick={() => removeItem(item.id)} className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <CartSummary />
        </div>
      )}
    </div>
  );
}
