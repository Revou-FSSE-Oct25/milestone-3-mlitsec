/** @jest-environment node */

import { getProductByIdFromFakeStore, getProductsFromFakeStore } from "@/lib/fakestore";

describe("fakestore helper", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("returns products", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: "A" }],
    }) as unknown as typeof fetch;

    const data = await getProductsFromFakeStore();
    expect(data).toHaveLength(1);
  });

  it("throws for products non-ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false }) as unknown as typeof fetch;
    await expect(getProductsFromFakeStore()).rejects.toThrow("Gagal mengambil daftar produk.");
  });

  it("returns null on 404 detail", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 404,
      ok: false,
    }) as unknown as typeof fetch;
    await expect(getProductByIdFromFakeStore("1")).resolves.toBeNull();
  });

  it("returns detail product", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      ok: true,
      json: async () => ({ id: 2, title: "B" }),
    }) as unknown as typeof fetch;

    const item = await getProductByIdFromFakeStore("2");
    expect(item?.id).toBe(2);
  });
});
