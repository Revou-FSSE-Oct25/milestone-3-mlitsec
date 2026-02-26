import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

type FakeStoreUser = {
  id: number;
  username: string;
  password: string;
  email?: string;
  name?: { firstname?: string; lastname?: string };
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    if (!body.username?.trim() || !body.password) {
      return NextResponse.json({ message: "Username dan password wajib diisi." }, { status: 400 });
    }

    const response = await fetch("https://fakestoreapi.com/users");
    if (!response.ok) {
      return NextResponse.json({ message: "Gagal mengambil data user." }, { status: 502 });
    }

    const users = (await response.json()) as FakeStoreUser[];
    const matched = users.find(
      (user) => user.username === body.username?.trim() && user.password === body.password,
    );

    if (!matched) {
      return NextResponse.json({ message: "Username atau password salah." }, { status: 401 });
    }

    const sessionUser = {
      id: matched.id,
      username: matched.username,
      email: matched.email,
      name: matched.name,
    };

    const result = NextResponse.json({ user: sessionUser });
    result.cookies.set(AUTH_COOKIE_NAME, JSON.stringify(sessionUser), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
    });
    return result;
  } catch {
    return NextResponse.json({ message: "Terjadi error saat login." }, { status: 500 });
  }
}
