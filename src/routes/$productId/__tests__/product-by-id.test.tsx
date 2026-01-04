import {describe, expect, it} from "vitest";
import {render} from "@/test-utils.tsx";
import {act} from "react";

type ArgumentsType<T> = T extends (...args: infer P) => any ? P : never;


const { ProductViewPage } = await import("@/routes/$productId/index.tsx");

const renderPage=async(...args:Partial<ArgumentsType<typeof render>>)=> {
  return act(()=>{
      return render(args[0]??<ProductViewPage />,{
        withRouter: true,
        initialRoute: "/product/1",
        ...(args[1]??{})
      })
    }
  )
}

describe("Product View Page", () => {

  describe("Product Details", () => {
    it("should render product details for electronics product",async () => {
      const { getByTestId } = await renderPage();

      expect(getByTestId("product-category")).toBeInTheDocument();
      expect(getByTestId("product-title")).toBeInTheDocument();
      expect(getByTestId("product-description")).toBeInTheDocument();
      expect(getByTestId("product-price")).toBeInTheDocument();
      expect(getByTestId("product-price-original")).toBeInTheDocument();
      expect(getByTestId("reviews-container")).toBeInTheDocument();
    });

    it("should NOT show sizes section for non-clothing products", async() => {
      const { queryByTestId } = await renderPage();

      // Sizes should not be visible for electronics
      expect(queryByTestId("sizes")).not.toBeInTheDocument();
    });

    it("should show sizes section for clothing products", async() => {
      // Use clothing product (id: 3 - Winter Jacket, men's clothing)
      const { getByTestId } = await renderPage(undefined,{
        withRouter: true,
        initialRoute: "/product/3"
      });

      // Sizes should be visible for clothing
      expect(getByTestId("sizes")).toBeInTheDocument();
    });

    it("should display correct product category", async () => {
      // mockUseParams.mockReturnValue({ productId: "1" });
      const { getByTestId } = await renderPage(undefined,{
        initialRoute: "/product/1"
      });

      expect(getByTestId("product-category")).toHaveTextContent("electronics");
    });

    it("should display correct product title", async() => {
      const { getByTestId } = await renderPage(undefined,{
        initialRoute: "/product/1"
      });

      expect(getByTestId("product-title")).toHaveTextContent(
        "Smartphone Pro Max",
      );
    });

    it("should display formatted price", async() => {
      const { getByTestId } = await renderPage(undefined,{
        initialRoute: "/product/1"
      });
      
      expect(getByTestId("product-price")).toHaveTextContent("$999.99");
    });
  });

  describe("Back Navigation", () => {
    it("should render back to products link", async() => {
      const { getByRole } = await renderPage();

      const backLink = getByRole("link", { name: /back to products/i });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute("href", "/");
    });
  });
});
