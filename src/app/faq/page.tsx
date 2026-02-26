export const dynamic = "force-static";

const items = [
  ["Apakah data produk dari API?", "Ya, halaman produk mengambil data dari FakeStoreAPI."],
  ["Apakah checkout perlu login?", "Ya, checkout diproteksi middleware."],
  ["Apa fungsi halaman admin?", "Untuk mengelola produk: tambah, ubah, dan hapus."],
];

export default function FaqPage() {
  return (
    <div className="page-shell py-8">
      <section className="card p-6 sm:p-8">
        <p className="text-sm font-semibold tracking-[0.18em] text-[color:var(--accent)] uppercase">Bantuan</p>
        <h1 className="mt-2 text-3xl font-semibold">FAQ</h1>
        <div className="mt-6 space-y-4">
          {items.map(([q, a]) => (
            <div key={q} className="rounded-xl border border-[color:var(--border)] bg-white p-4">
              <h2 className="font-semibold">{q}</h2>
              <p className="mt-2 text-sm text-[color:var(--muted)]">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
