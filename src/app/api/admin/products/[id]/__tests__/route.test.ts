/** @jest-environment node */

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));
jest.mock("@/lib/local-products", () => ({
  readAdminProducts: jest.fn(),
  writeAdminProducts: jest.fn(),
}));

import { DELETE, GET, PUT } from "@/app/api/admin/products/[id]/route";
import { readAdminProducts, writeAdminProducts } from "@/lib/local-products";

const mockedRead = readAdminProducts as jest.MockedFunction<typeof readAdminProducts>;
const mockedWrite = writeAdminProducts as jest.MockedFunction<typeof writeAdminProducts>;

const product = { id: 1, title: "A", price: 10, description: "", category: "c", image: "i" };

describe("/api/admin/products/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  it("GET 404 when missing", async () => {
    mockedRead.mockResolvedValueOnce([]);
    const response = await GET(new Request("http://localhost"), { params: Promise.resolve({ id: "1" }) });
    expect(response.status).toBe(404);
  });

  it("GET returns product", async () => {
    mockedRead.mockResolvedValueOnce([product]);
    const response = await GET(new Request("http://localhost"), { params: Promise.resolve({ id: "1" }) });
    const body = await response.json();
    expect(body.product.id).toBe(1);
  });

  it("PUT validates payload", async () => {
    const response = await PUT(new Request("http://localhost", { method: "PUT", body: JSON.stringify({ title: "", price: 0 }) }), {
      params: Promise.resolve({ id: "1" }),
    });
    expect(response.status).toBe(400);
  });

  it("PUT updates product", async () => {
    mockedRead.mockResolvedValueOnce([product]);
    mockedWrite.mockResolvedValueOnce(undefined);
    const response = await PUT(new Request("http://localhost", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "B", price: 20 }),
    }), { params: Promise.resolve({ id: "1" }) });
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.product.title).toBe("B");
  });

  it("DELETE 404 when missing", async () => {
    mockedRead.mockResolvedValueOnce([]);
    const response = await DELETE(new Request("http://localhost"), { params: Promise.resolve({ id: "1" }) });
    expect(response.status).toBe(404);
  });

  it("DELETE removes product", async () => {
    mockedRead.mockResolvedValueOnce([product]);
    mockedWrite.mockResolvedValueOnce(undefined);
    const response = await DELETE(new Request("http://localhost"), { params: Promise.resolve({ id: "1" }) });
    expect(response.status).toBe(200);
  });
});
