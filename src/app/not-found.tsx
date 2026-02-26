import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="page-shell py-16">
      <div className="mx-auto max-w-lg card p-8 text-center">
        <h1 className="text-2xl font-semibold">Halaman tidak ditemukan</h1>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Halaman yang kamu cari tidak tersedia.
        </p>
        <Link href="/" className="mt-4 inline-block rounded-lg bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white">
          Kembali ke Home
        </Link>
      </div>
    </div>
  );
}
