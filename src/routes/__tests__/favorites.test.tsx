import { act } from "react";
import { describe, expect, it } from "vitest";
import { mockProducts } from "@/__mocks__/mock-product.ts";
import { render, screen } from "@/test-utils.tsx";

const { FavouritesRoute } = await import("../favourites/index.tsx");

describe("favorites", () => {
  it("renders favorites page with correct title", async () => {
    render(<FavouritesRoute />, {
      initialRoute: "/favourites",
      routePath: "/favourites",
      preloadedState: {
        favorites: { favourites: [] },
      },
    });
    expect(screen.getByText("Favourites")).toBeInTheDocument();
    expect(screen.queryAllByTestId("product-card")).toHaveLength(0);
  });
  it("renders correct number of products", async () => {
    await act(() =>
      render(<FavouritesRoute />, {
        withRouter: true,
        initialRoute: "/favourites",
        routePath: "/favourites",
        preloadedState: {
          favorites: { favourites: mockProducts.slice(0, 2) },
        },
      }),
    );
    expect(screen.getAllByTestId("product-card")).toHaveLength(2);
  });
});
