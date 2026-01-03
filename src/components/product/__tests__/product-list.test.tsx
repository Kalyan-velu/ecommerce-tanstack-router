import { describe, expect, it, vi } from "vitest";
import { ProductsList } from "@/components/product/products-list.tsx";
import { render } from "@/test-utils";
import type { ProductInterface } from "@/types/product.type.ts";

// Mock TanStack Router's Link component to avoid RouterProvider requirement
vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    Link: ({
      children,
      to,
      ...props
    }: {
      children: React.ReactNode;
      to: string;
      [key: string]: unknown;
    }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

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
    const { getAllByTestId } = render(
      <ProductsList products={mockProducts} />,
      {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        },
      },
    );

    const productCards = getAllByTestId("product-card");
    expect(productCards).toHaveLength(mockProducts.length);
  });
});
