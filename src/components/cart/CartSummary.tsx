"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatCurrencyUSDToIDR } from "@/lib/utils";

export function CartSummary() {
  const { itemCount, totalPrice } = useCart();

  return (
    <aside className="card p-5">
      <h2 className="text-lg font-semibold">Ringkasan Cart</h2>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[color:var(--muted)]">Item</span>
          <span>{itemCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[color:var(--muted)]">Total</span>
          <span className="font-bold text-[color:var(--accent)]">{formatCurrencyUSDToIDR(totalPrice)}</span>
        </div>
      </div>
      <Link href="/checkout" className="mt-4 block rounded-xl bg-[color:var(--accent)] px-4 py-3 text-center text-sm font-semibold text-white">
        Checkout
      </Link>
    </aside>
  );
}
