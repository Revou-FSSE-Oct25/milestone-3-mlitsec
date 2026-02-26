/** @jest-environment node */

import { POST } from "@/app/api/auth/login/route";

describe("POST /api/auth/login", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("returns 400 for empty payload", async () => {
    const request = new Request("http://localhost/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "" }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns 401 for wrong credentials", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, username: "u", password: "p" }],
    }) as unknown as typeof fetch;

    const request = new Request("http://localhost/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "u", password: "wrong" }),
    });
    const response = await POST(request);
    expect(response.status).toBe(401);
  });

  it("returns user and cookie for valid credentials", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 2, username: "mor_2314", password: "83r5^_", email: "a@a.com" }],
    }) as unknown as typeof fetch;

    const request = new Request("http://localhost/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "mor_2314", password: "83r5^_" }),
    });
    const response = await POST(request);
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.user.username).toBe("mor_2314");
    expect(response.headers.get("set-cookie")).toContain("revoshop_auth=");
  });
});
