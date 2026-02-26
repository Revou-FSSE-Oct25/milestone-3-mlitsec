"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/checkout";
  const { user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await login({ username, password });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.message ?? "Login gagal");
      return;
    }
    router.push(redirectTo);
  }

  return (
    <div className="page-shell py-8">
      <div className="mx-auto max-w-md card p-6">
        <h1 className="text-2xl font-semibold">Login RevoShop</h1>
        <p className="mt-2 text-sm text-[color:var(--muted)]">Masuk untuk checkout dan akses halaman admin.</p>

        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
          Akun demo: <code>mor_2314</code> / <code>83r5^_</code>
        </div>

        {user ? (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            Kamu sudah login. <Link href={redirectTo} className="underline">Lanjut</Link>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Username</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-lg border border-[color:var(--border)] bg-white px-3 py-2" required />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-[color:var(--border)] bg-white px-3 py-2" required />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button type="submit" disabled={submitting} className="w-full rounded-xl bg-[color:var(--accent)] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">
            {submitting ? "Memproses..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="page-shell py-8"><div className="card p-6">Memuat halaman login...</div></div>}>
      <LoginForm />
    </Suspense>
  );
}
