import {act} from "react";
import {describe, expect, it} from "vitest";
import {render} from "@/test-utils.tsx";
import type {ArgumentsType} from "@/types";

const { ProductViewPage } = await import("@/routes/$productId/index.tsx");

const renderPage = async (...args: Partial<ArgumentsType<typeof render>>) => {
  return act(() => {
    return render(args[0] ?? <ProductViewPage />, {
      withRouter: true,
      initialRoute: "/1/",
      routePath: "/$productId/",
      ...(args[1] ?? {}),
    });
  });
};

describe("Product View Page", () => {
  describe("Product Details", () => {
    it("should render product details for electronics product", async () => {
      const { findByTestId } = await renderPage();

      expect(await findByTestId("product-category")).toBeInTheDocument();
      expect(await findByTestId("product-title")).toBeInTheDocument();
      expect(await findByTestId("product-description")).toBeInTheDocument();
      expect(await findByTestId("product-price")).toBeInTheDocument();
      expect(await findByTestId("product-price-original")).toBeInTheDocument();
      expect(await findByTestId("reviews-container")).toBeInTheDocument();
    });

    it("should NOT show sizes section for non-clothing products", async () => {
      const { findByTestId, queryByTestId } = await renderPage();

      // Wait for the page to load first
      await findByTestId("product-category");

      // Sizes should not be visible for electronics
      const sizes = queryByTestId("sizes");

      expect(sizes).toHaveStyle({ display: "none" });
    });

    it("should show sizes section for clothing products", async () => {
      // Use clothing product (id: 3 - Winter Jacket, men's clothing)
      const { findByTestId } = await renderPage(undefined, {
        withRouter: true,
        initialRoute: "/3/",
      });

      // Sizes should be visible for clothing
      expect(await findByTestId("sizes")).toBeInTheDocument();
    });

    it("should display correct product category", async () => {
      const { findByTestId } = await renderPage(undefined, {
        withRouter: true,
        initialRoute: "/1/",
      });

      expect(await findByTestId("product-category")).toHaveTextContent(
        "electronics",
      );
    });

    it("should display correct product title", async () => {
      const { findByTestId } = await renderPage(undefined, {
        withRouter: true,
        initialRoute: "/1/",
      });

      expect(await findByTestId("product-title")).toHaveTextContent(
        "Smartphone Pro Max",
      );
    });

    it("should display formatted price", async () => {
      const { findByTestId } = await renderPage(undefined, {
        withRouter: true,
        initialRoute: "/1/",
      });

      expect(await findByTestId("product-price")).toHaveTextContent("$999.99");
    });
  });

  describe("Back Navigation", () => {
    it("should render back to products link", async () => {
      const { findByRole } = await renderPage();

      const backLink = await findByRole("link", { name: /back to products/i });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute("href", "/");
    });
  });
});
