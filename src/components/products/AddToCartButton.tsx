"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [message, setMessage] = useState("Tambah ke Keranjang");

  return (
    <button
      type="button"
      onClick={() => {
        addItem(product);
        setMessage("Ditambahkan");
        window.setTimeout(() => setMessage("Tambah ke Keranjang"), 1200);
      }}
      className="rounded-xl bg-[color:var(--accent)] px-4 py-3 text-sm font-semibold text-white"
    >
      {message}
    </button>
  );
}
