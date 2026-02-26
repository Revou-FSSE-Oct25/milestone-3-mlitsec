import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/products/ProductCard";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe("ProductCard", () => {
  it("renders title and price", () => {
    render(
      <ProductCard
        product={{ id: 1, title: "Produk Test", price: 10, description: "d", category: "c", image: "/x.png" }}
      />,
    );
    expect(screen.getByText("Produk Test")).toBeInTheDocument();
    expect(screen.getByText(/Rp/)).toBeInTheDocument();
  });
});
