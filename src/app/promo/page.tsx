export const dynamic = "force-static";

const promos = [
  { title: "Diskon Member Baru", desc: "Potongan 15% untuk pembelian pertama." },
  { title: "Free Ongkir Akhir Pekan", desc: "Gratis ongkir untuk transaksi minimum tertentu." },
  { title: "Promo Bundling", desc: "Beli 2 produk kategori tertentu, dapat harga spesial." },
];

export default function PromoPage() {
  return (
    <div className="page-shell py-8">
      <section className="card p-6 sm:p-8">
        <p className="text-sm font-semibold tracking-[0.18em] text-[color:var(--accent)] uppercase">Promo</p>
        <h1 className="mt-2 text-3xl font-semibold">Promo RevoShop</h1>
        <p className="mt-3 text-[color:var(--muted)]">Kumpulan promo yang sedang berjalan di RevoShop.</p>
      </section>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {promos.map((promo) => (
          <article key={promo.title} className="card p-5">
            <h2 className="font-semibold">{promo.title}</h2>
            <p className="mt-2 text-sm text-[color:var(--muted)]">{promo.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
