import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedPrefixes = ["/checkout", "/admin"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = protectedPrefixes.some((prefix) => path.startsWith(prefix));

  if (!isProtected) return NextResponse.next();

  const hasSession = Boolean(request.cookies.get("revoshop_auth")?.value);
  if (hasSession) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", path);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/checkout/:path*", "/admin/:path*"],
};
