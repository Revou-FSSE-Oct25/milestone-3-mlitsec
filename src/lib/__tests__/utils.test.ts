import { formatCurrencyUSDToIDR, joinClassName } from "@/lib/utils";

describe("utils", () => {
  it("formats idr currency", () => {
    expect(formatCurrencyUSDToIDR(1)).toContain("Rp");
  });

  it("joins class names", () => {
    expect(joinClassName("a", false, undefined, "b")).toBe("a b");
  });
});
