import userEvent from "@testing-library/user-event";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@/test-utils";
import type { ArgumentsType } from "@/types";

const { HomePage } = await import("@/routes/index.tsx");

const renderPage = async (...args: Partial<ArgumentsType<typeof render>>) => {
  return act(() => {
    return render(args[0] ?? <HomePage />, {
      withRouter: true,
      initialRoute: "/",
      routePath: "/",
      preloadedState: {
        favorites: { favourites: [] },
        filters: { category: "all", sort: null, search: "" },
      },
      ...(args[1] ?? {}),
    });
  });
};

describe("Index Route Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Page Header", () => {
    it("should render the page title", async () => {
      await renderPage();

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Discover Our Collection",
      );
    });

    it("should render the page description", async () => {
      await renderPage();

      expect(
        screen.getByText(
          "Browse through our curated selection of premium products",
        ),
      ).toBeInTheDocument();
    });
  });

  describe("Product Count", () => {
    it("should display correct product count for all products", async () => {
      await renderPage();

      expect(screen.getByText("5 products")).toBeInTheDocument();
    });

    it("should display correct product count when filtered by category", async () => {
      await renderPage(undefined, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "electronics", sort: null, search: "" },
        },
      });

      expect(screen.getByText("2 products")).toBeInTheDocument();
    });

    it("should display correct product count when filtered by search", async () => {
      await renderPage(undefined, {
        preloadedState: {
          favorites: {
            favourites: [],
          },
          filters: {
            category: "all",
            sort: null,
            search: "laptop",
          },
        },
      });

      expect(screen.getByText("1 product")).toBeInTheDocument();
    });
  });

  describe("Category Filter Tabs", () => {
    it("should render all category tabs", async () => {
      await renderPage();

      expect(screen.getByRole("tab", { name: /all/i })).toBeInTheDocument();
      expect(
        screen.getByRole("tab", { name: /electronics/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("tab", { name: /clothing/i }),
      ).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: /jewelry/i })).toBeInTheDocument();
    });

    it("should have 'All' tab selected by default", async () => {
      await renderPage();

      const allTab = screen.getByRole("tab", { name: /all/i });
      expect(allTab).toHaveAttribute("aria-selected", "true");
    });

    it("should filter products when category tab is clicked", async () => {
      const user = userEvent.setup();
      const { store } = await renderPage();

      const electronicsTab = screen.getByRole("tab", { name: /electronics/i });
      await act(async () => await user.click(electronicsTab));

      await waitFor(() =>
        expect(store.getState().filters.category).toBe("electronics"),
      );
    });
  });

  describe("Sort Functionality", () => {
    it("should render sort dropdown", async () => {
      await renderPage();

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should update sort state when sort option is selected", async () => {
      const user = userEvent.setup();
      const { store } = await renderPage();

      // Open the select dropdown
      const sortTrigger = screen.getByRole("combobox");
      act(() => sortTrigger.click());

      await waitFor(() => {
        const lowToHighOption = screen.getByRole("option", {
          name: /low to high/i,
        });
        expect(lowToHighOption).toBeInTheDocument();
      });

      const lowToHighOption = screen.getByRole("option", {
        name: /low to high/i,
      });
      await user.click(lowToHighOption);

      await waitFor(() => {
        expect(store.getState().filters.sort).toBe("price-asc");
      });
    });
  });

  describe("Empty State", () => {
    it("should show empty state when no products match filters", async () => {
      const { getByTestId } = await renderPage(undefined, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: {
            category: "all",
            sort: null,
            search: "nonexistentproduct123",
          },
        },
      });
      const title = getByTestId("empty-state-title");
      expect(title).toHaveTextContent("No products found");
    });
  });

  describe("Products List", () => {
    it("should render products list when products exist", async () => {
      await renderPage();
      const productCards = screen.getAllByTestId("product-card");
      expect(productCards).toHaveLength(5);
    });

    it("should filter products by category", async () => {
      await renderPage(undefined, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "clothing", sort: null, search: "" },
        },
      });

      const productCards = screen.getAllByTestId("product-card");
      expect(productCards).toHaveLength(2);
    });

    it("should filter products by search term in title", async () => {
      await renderPage(undefined, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "smartphone" },
        },
      });

      const productCards = screen.getAllByTestId("product-card");
      expect(productCards).toHaveLength(1);
    });

    it("should filter products by search term in description", async () => {
      await renderPage(undefined, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "cold weather" },
        },
      });

      const productCards = screen.getAllByTestId("product-card");
      expect(productCards).toHaveLength(1);
    });

    it("should combine category and search filters", async () => {
      await renderPage(undefined, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "electronics", sort: null, search: "laptop" },
        },
      });

      const productCards = screen.getAllByTestId("product-card");
      expect(productCards).toHaveLength(1);
    });
  });
});
