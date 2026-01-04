import {fireEvent} from "@testing-library/dom";
import {act} from "react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {render, screen} from "@/test-utils";
import {SearchBar} from "../";

describe("SearchBar Component", () => {
  describe("Rendering", () => {
    it("should render the search input", () => {
      render(<SearchBar />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        },
      });

      const searchInput = screen.getByPlaceholderText("Search products...");
      expect(searchInput).toBeInTheDocument();
    });

    it("should render with accessible label", () => {
      render(<SearchBar />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        },
      });

      const label = screen.getByText("Search Products");
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass("sr-only");
    });

    it("should display the current search term from Redux state", () => {
      render(<SearchBar />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "laptop" },
        },
      });

      const searchInput = screen.getByPlaceholderText("Search products...");
      expect(searchInput).toHaveValue("laptop");
    });
  });

  describe("User Interaction", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("updates Redux search when user types", async () => {
      const { store } = render(<SearchBar />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        },
      });

      const input = screen.getByPlaceholderText("Search products...");

      input.focus();
      fireEvent.change(input, { target: { value: "phone" } });
      await Promise.resolve();
      await act(() => vi.advanceTimersByTime(50));
      expect(store.getState().filters.search).toBe("phone");
    });
  });
});
