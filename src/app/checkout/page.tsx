"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatCurrencyUSDToIDR } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, totalPrice, clear } = useCart();
  const [done, setDone] = useState(false);

  return (
    <div className="page-shell py-8">
      <div className="card p-6 sm:p-8">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <p className="mt-2 text-sm text-[color:var(--muted)]">Kamu perlu login untuk mengakses halaman ini.</p>

        {!done ? (
          <>
            <div className="mt-6 space-y-3">
              {items.length === 0 ? (
                <p className="text-sm text-[color:var(--muted)]">Cart kosong. Tambahkan produk dulu.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border border-[color:var(--border)] bg-white px-4 py-3">
                    <span className="text-sm">{item.title} x {item.quantity}</span>
                    <span className="font-medium">{formatCurrencyUSDToIDR(item.price * item.quantity)}</span>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-[color:var(--muted)]">Total</span>
              <span className="text-xl font-bold text-[color:var(--accent)]">{formatCurrencyUSDToIDR(totalPrice)}</span>
            </div>
            <button
              type="button"
              disabled={items.length === 0}
              onClick={() => {
                setDone(true);
                clear();
              }}
              className="mt-6 rounded-xl bg-[color:var(--accent)] px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              Konfirmasi Checkout
            </button>
          </>
        ) : (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
            Checkout berhasil (simulasi).
          </div>
        )}
      </div>
    </div>
  );
}
