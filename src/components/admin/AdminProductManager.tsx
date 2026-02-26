"use client";

import { FormEvent, useState } from "react";
import { Product } from "@/types/product";
import { formatCurrencyUSDToIDR } from "@/lib/utils";

type ProductForm = {
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
};

const emptyForm = (): ProductForm => ({
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
});

export function AdminProductManager({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm());
  const [message, setMessage] = useState<string | null>(null);

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm());
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: String(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
    });
  }

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const payload = {
      title: form.title.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      category: form.category.trim() || "general",
      image: form.image.trim() || "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    };

    if (!payload.title || Number.isNaN(payload.price) || payload.price <= 0) {
      setMessage("Judul dan harga harus valid.");
      return;
    }

    const response = await fetch(editingId ? `/api/admin/products/${editingId}` : "/api/admin/products", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as { product?: Product; message?: string };

    if (!response.ok || !data.product) {
      setMessage(data.message ?? "Gagal menyimpan produk.");
      return;
    }

    setProducts((prev) =>
      editingId ? prev.map((item) => (item.id === data.product!.id ? data.product! : item)) : [data.product!, ...prev],
    );
    setMessage(editingId ? "Produk berhasil diupdate." : "Produk berhasil ditambahkan.");
    resetForm();
  }

  async function deleteProduct(id: number) {
    const ok = window.confirm("Hapus produk ini?");
    if (!ok) return;
    const response = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setMessage("Gagal menghapus produk.");
      return;
    }
    setProducts((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
    setMessage("Produk berhasil dihapus.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <section className="card p-5">
        <h2 className="text-lg font-semibold">{editingId ? "Edit Produk" : "Tambah Produk"}</h2>
        <form onSubmit={saveProduct} className="mt-4 space-y-3">
          {(["title", "price", "category", "image"] as const).map((name) => (
            <label key={name} className="block text-sm">
              <span className="mb-1 block font-medium">{name === "price" ? "Harga (USD)" : name.charAt(0).toUpperCase() + name.slice(1)}</span>
              <input
                type={name === "price" ? "number" : "text"}
                step={name === "price" ? "0.01" : undefined}
                value={form[name]}
                onChange={(e) => setForm((prev) => ({ ...prev, [name]: e.target.value }))}
                className="w-full rounded-lg border border-[color:var(--border)] bg-white px-3 py-2"
              />
            </label>
          ))}
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Description</span>
            <textarea rows={4} value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} className="w-full rounded-lg border border-[color:var(--border)] bg-white px-3 py-2" />
          </label>
          <div className="flex gap-2">
            <button type="submit" className="rounded-lg bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white">
              {editingId ? "Update" : "Tambah"}
            </button>
            {editingId ? <button type="button" onClick={resetForm} className="rounded-lg border border-[color:var(--border)] bg-white px-4 py-2 text-sm">Batal</button> : null}
          </div>
          {message ? <p className="text-sm text-[color:var(--muted)]">{message}</p> : null}
        </form>
      </section>

      <section className="card p-5">
        <h2 className="text-lg font-semibold">Daftar Produk</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-[color:var(--muted)]">
              <tr>
                <th className="pb-3 pr-3">Title</th>
                <th className="pb-3 pr-3">Category</th>
                <th className="pb-3 pr-3">Price</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-[color:var(--border)]/70">
                  <td className="py-3 pr-3">{product.title}</td>
                  <td className="py-3 pr-3 capitalize">{product.category}</td>
                  <td className="py-3 pr-3">{formatCurrencyUSDToIDR(product.price)}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => startEdit(product)} className="rounded-md border border-[color:var(--border)] bg-white px-2 py-1 text-xs">Edit</button>
                      <button type="button" onClick={() => void deleteProduct(product.id)} className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
