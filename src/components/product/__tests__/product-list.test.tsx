import {describe, expect, it} from "vitest";
import {ProductsList} from "@/components/product/products-list.tsx";
import {render} from "@/test-utils";
import type {ProductInterface} from "@/types/product.type.ts";

const mockProducts: ProductInterface[] = [
  {
    id: 1,
    title: "test",
    category: "test",
    price: 10,
    description: "test",
    image: "test",
  },
];

describe("products list should render product-cards", () => {
  it("should render product cards", async () => {
    const { getAllByTestId } = render(<ProductsList products={mockProducts} />);

    const productCards = getAllByTestId("product-card");
    expect(productCards).toHaveLength(mockProducts.length);
  });
});
