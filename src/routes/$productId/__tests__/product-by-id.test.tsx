import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockProducts } from "@/__mocks__/mock-product.ts";
import { render } from "@/test-utils.tsx";

// Use vi.hoisted to properly hoist the mock function before vi.mock runs
const { mockUseParams } = vi.hoisted(() => ({
  mockUseParams: vi.fn(),
}));

// Mock TanStack Router's Link component to avoid RouterProvider requirement
vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    useParams: mockUseParams,
    Link: ({
      children,
      to,
      ...props
    }: {
      children: ReactNode;
      to: string;
      [key: string]: unknown;
    }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

// Mock useGetProductById - fix type mismatch by converting id to number
vi.mock("@/query/hooks/use-get-product-by-id.tsx", () => ({
  useSuspenseGetProductById: (id: string | number) => ({
    data: {
      data: mockProducts.find((product) => product.id === Number(id)) ?? null,
    },
  }),
}));

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    Activity: ({ children, mode }: { children: ReactNode; mode: string }) => (
      <div data-testid="activity" data-mode={mode}>
        {mode === "visible" ? children : null}
      </div>
    ),
  };
});

const { ProductViewPage } = await import("@/routes/$productId/index.tsx");

describe("Product View Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default to electronics product (id: 1)
    mockUseParams.mockReturnValue({ productId: "1" });
  });

  describe("Product Details", () => {
    it("should render product details for electronics product", () => {
      mockUseParams.mockReturnValue({ productId: "1" });
      const { getByTestId } = render(<ProductViewPage />);

      expect(getByTestId("product-category")).toBeInTheDocument();
      expect(getByTestId("product-title")).toBeInTheDocument();
      expect(getByTestId("product-description")).toBeInTheDocument();
      expect(getByTestId("product-price")).toBeInTheDocument();
      expect(getByTestId("product-price-original")).toBeInTheDocument();
      expect(getByTestId("reviews-container")).toBeInTheDocument();
    });

    it("should NOT show sizes section for non-clothing products", () => {
      // Use electronics product (id: 1)
      mockUseParams.mockReturnValue({ productId: "1" });
      const { queryByTestId } = render(<ProductViewPage />);

      // Sizes should not be visible for electronics
      expect(queryByTestId("sizes")).not.toBeInTheDocument();
    });

    it("should show sizes section for clothing products", () => {
      // Use clothing product (id: 3 - Winter Jacket, men's clothing)
      mockUseParams.mockReturnValue({ productId: "3" });
      const { getByTestId } = render(<ProductViewPage />);

      // Sizes should be visible for clothing
      expect(getByTestId("sizes")).toBeInTheDocument();
    });

    it("should display correct product category", () => {
      mockUseParams.mockReturnValue({ productId: "1" });
      const { getByTestId } = render(<ProductViewPage />);

      expect(getByTestId("product-category")).toHaveTextContent("electronics");
    });

    it("should display correct product title", () => {
      mockUseParams.mockReturnValue({ productId: "1" });
      const { getByTestId } = render(<ProductViewPage />);

      expect(getByTestId("product-title")).toHaveTextContent(
        "Smartphone Pro Max",
      );
    });

    it("should display formatted price", () => {
      mockUseParams.mockReturnValue({ productId: "1" });
      const { getByTestId } = render(<ProductViewPage />);

      expect(getByTestId("product-price")).toHaveTextContent("$999.99");
    });
  });

  describe("Back Navigation", () => {
    it("should render back to products link", () => {
      const { getByRole } = render(<ProductViewPage />);

      const backLink = getByRole("link", { name: /back to products/i });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute("href", "/");
    });
  });
});
