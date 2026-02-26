"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "@/types/auth";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (input: { username: string; password: string }) => Promise<{ ok: boolean; message?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const AUTH_STORAGE_KEY = "revoshop_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function hydrateAuth() {
      try {
        const sessionResponse = await fetch("/api/auth/session", { cache: "no-store" });
        if (sessionResponse.ok) {
          const sessionData = (await sessionResponse.json()) as { user?: AuthUser | null };
          if (!active) return;

          if (sessionData.user) {
            setUser(sessionData.user);
            window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData.user));
            setLoading(false);
            return;
          }
        }
      } catch {
        // Fallback to localStorage below.
      }

      try {
        const saved = window.localStorage.getItem(AUTH_STORAGE_KEY);
        if (!active) return;
        if (saved) {
          setUser(JSON.parse(saved) as AuthUser);
        }
      } catch {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      } finally {
        if (active) setLoading(false);
      }
    }

    void hydrateAuth();

    return () => {
      active = false;
    };
  }, []);

  async function login(input: { username: string; password: string }) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = (await response.json()) as { user?: AuthUser; message?: string };
    if (!response.ok || !data.user) return { ok: false, message: data.message ?? "Login gagal" };
    setUser(data.user);
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.user));
    return { ok: true };
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used in AuthProvider");
  return context;
}
