import userEvent from "@testing-library/user-event";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {render, screen, waitFor} from "@/test-utils";
import type {ReactNode} from "react";

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


vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    Activity: ({
                 children,
                 mode,
               }: {
      children: ReactNode;
      mode: string;
    }) => (
      <div data-testid="activity" data-mode={mode}>
        {mode === "visible" ? children : null}
      </div>
    ),
  };
});


const { App } = await import("@/routes/index.tsx");
describe("Index Route Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Page Header", () => {
    it("should render the page title", async () => {
      render(<App />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        },
      });

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Discover Our Collection",
      );
    });

    it("should render the page description", async () => {
      render(<App />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        },
      });

      expect(
        screen.getByText(
          "Browse through our curated selection of premium products",
        ),
      ).toBeInTheDocument();
    });
  });

  describe("Product Count", () => {
    it("should display correct product count for all products", async () => {
      render(<App />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        },
      });

      expect(screen.getByText("5 products")).toBeInTheDocument();
    });

    it("should display correct product count when filtered by category", async () => {
      render(<App />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "electronics", sort: null, search: "" },
        },
      });

      expect(screen.getByText("2 products")).toBeInTheDocument();
    });

    it("should display correct product count when filtered by search", async () => {
      render(<App />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "laptop" },
        },
      });

      expect(screen.getByText("1 products")).toBeInTheDocument();
    });
  });

  describe("Category Filter Tabs", () => {
    it("should render all category tabs", async () => {
      render(<App />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        },
      });

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
      render(<App />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        },
      });

      const allTab = screen.getByRole("tab", { name: /all/i });
      expect(allTab).toHaveAttribute("aria-selected", "true");
    });

    it("should filter products when category tab is clicked", async () => {
      const user = userEvent.setup();
      const { store } = render(<App />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        },
      });

      const electronicsTab = screen.getByRole("tab", { name: /electronics/i });
      await user.click(electronicsTab);

      await waitFor(() => {
        expect(store.getState().filters.category).toBe("electronics");
      });
    });
  });

  describe("Sort Functionality", () => {
    it("should render sort dropdown", async () => {
      render(<App />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        },
      });

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should update sort state when sort option is selected", async () => {
      const user = userEvent.setup();
      const { store } = render(<App />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        },
      });

      // Open the select dropdown
      const sortTrigger = screen.getByRole("combobox");
      await user.click(sortTrigger);

      // Wait for dropdown to open and click option
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
      render(<App />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: {
            category: "all",
            sort: null,
            search: "nonexistentproduct123",
          },
        },
      });

      expect(screen.getByText("0 products")).toBeInTheDocument();
    });
  });

  describe("Products List", () => {
    it("should render products list when products exist", async () => {
      render(<App />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        },
      });

      // Check that product cards are rendered
      const productCards = screen.getAllByTestId("product-card");
      expect(productCards).toHaveLength(5);
    });

    it("should filter products by category", async () => {
      render(<App />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "clothing", sort: null, search: "" },
        },
      });

      const productCards = screen.getAllByTestId("product-card");
      expect(productCards).toHaveLength(2);
    });

    it("should filter products by search term in title", async () => {
      render(<App />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "smartphone" },
        },
      });

      const productCards = screen.getAllByTestId("product-card");
      expect(productCards).toHaveLength(1);
    });

    it("should filter products by search term in description", async () => {
      render(<App />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "cold weather" },
        },
      });

      const productCards = screen.getAllByTestId("product-card");
      expect(productCards).toHaveLength(1);
    });

    it("should combine category and search filters", async () => {
      render(<App />, {
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
