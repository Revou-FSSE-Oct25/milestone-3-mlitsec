export const dynamic = "force-static";

const promos = [
  {
    title: "Free Ongkir Weekend",
    description: "Gratis ongkir untuk transaksi minimal Rp250.000 selama akhir pekan.",
  },
  {
    title: "Diskon Member Baru",
    description: "Potongan 15% untuk pembelian pertama setelah login akun.",
  },
  {
    title: "Bundle Tech Essentials",
    description: "Beli 2 produk kategori electronics, hemat hingga 20%.",
  },
];

export default function PromoPage() {
  return (
    <div className="page-shell py-8">
      <section className="card p-6 sm:p-8">
        <p className="text-sm font-semibold tracking-[0.18em] text-[color:var(--accent)] uppercase">
          Promo
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Promo RevoShop</h1>
        <p className="mt-3 max-w-2xl text-[color:var(--muted)]">
          Kumpulan promo dan penawaran yang sedang berjalan di RevoShop.
        </p>
      </section>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {promos.map((promo) => (
          <article key={promo.title} className="card p-5">
            <h2 className="font-semibold">{promo.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              {promo.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
