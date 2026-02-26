"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { joinClassName } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/promo", label: "Promo" },
  { href: "/faq", label: "FAQ" },
  { href: "/cart", label: "Cart" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--border)] bg-[color:var(--background)]/90 backdrop-blur">
      <div className="page-shell flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold">
          RevoShop
        </Link>
        <nav className="hidden gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={joinClassName(
                "rounded-lg px-3 py-2 text-sm",
                pathname === link.href ? "bg-white" : "text-[color:var(--muted)] hover:bg-white/70",
              )}
            >
              {link.label}
              {link.href === "/cart" && itemCount > 0 ? ` (${itemCount})` : ""}
            </Link>
          ))}
          {user ? (
            <Link
              href="/admin"
              className={joinClassName(
                "rounded-lg px-3 py-2 text-sm",
                pathname === "/admin" ? "bg-white" : "text-[color:var(--muted)] hover:bg-white/70",
              )}
            >
              Admin
            </Link>
          ) : null}
        </nav>
        {user ? (
          <button
            type="button"
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
            className="rounded-lg border border-[color:var(--border)] bg-white px-3 py-2 text-sm"
          >
            Logout
          </button>
        ) : (
          <Link href="/login" className="rounded-lg bg-[color:var(--accent)] px-3 py-2 text-sm font-semibold text-white">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
