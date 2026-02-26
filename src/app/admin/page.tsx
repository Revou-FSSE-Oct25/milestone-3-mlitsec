import { AdminProductManager } from "@/components/admin/AdminProductManager";
import { readAdminProducts } from "@/lib/local-products";

export const revalidate = 60;

export default async function AdminPage() {
  const products = await readAdminProducts();

  return (
    <div className="page-shell py-8">
      <section className="mb-6 card p-6">
        <h1 className="text-2xl font-semibold">Kelola Produk</h1>
        <p className="mt-2 text-sm text-[color:var(--muted)]">Tambah, ubah, dan hapus produk dari halaman admin.</p>
      </section>
      <AdminProductManager initialProducts={products} />
    </div>
  );
}
