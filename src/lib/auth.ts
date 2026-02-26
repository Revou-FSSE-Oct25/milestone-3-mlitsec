import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME = "revoshop_auth";

export async function readSessionUser() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
