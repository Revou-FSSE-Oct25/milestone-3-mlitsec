/** @jest-environment node */

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));
jest.mock("@/lib/local-products", () => ({
  readAdminProducts: jest.fn(),
  writeAdminProducts: jest.fn(),
  createAdminProductId: jest.fn(),
}));

import { GET, POST } from "@/app/api/admin/products/route";
import { createAdminProductId, readAdminProducts, writeAdminProducts } from "@/lib/local-products";

const mockedRead = readAdminProducts as jest.MockedFunction<typeof readAdminProducts>;
const mockedWrite = writeAdminProducts as jest.MockedFunction<typeof writeAdminProducts>;
const mockedCreateId = createAdminProductId as jest.MockedFunction<typeof createAdminProductId>;

describe("/api/admin/products", () => {
  beforeEach(() => jest.clearAllMocks());

  it("GET returns product list", async () => {
    mockedRead.mockResolvedValueOnce([{ id: 1, title: "A", price: 1, description: "", category: "c", image: "i" }]);
    const response = await GET();
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.products).toHaveLength(1);
  });

  it("POST validates payload", async () => {
    const request = new Request("http://localhost", { method: "POST", body: JSON.stringify({ title: "", price: 0 }) });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("POST creates product", async () => {
    mockedRead.mockResolvedValueOnce([]);
    mockedCreateId.mockReturnValueOnce(99);
    mockedWrite.mockResolvedValueOnce(undefined);
    const request = new Request("http://localhost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New", price: 10 }),
    });
    const response = await POST(request);
    const body = await response.json();
    expect(response.status).toBe(201);
    expect(body.product.id).toBe(99);
  });
});
