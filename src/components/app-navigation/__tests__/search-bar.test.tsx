import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {render, screen, userEvent} from "@/test-utils";
import {SearchBar} from "../";
import {act} from "react";

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
      render(<SearchBar  />, {
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
      const user = userEvent.setup({ delay: null });
      
      const { store } = render(<SearchBar />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        },
      });
      
      const input = screen.getByPlaceholderText("Search products...");
      
      // Type one character at a time, advancing timers after each
      await user.type(input, "p");
      await act(() => vi.advanceTimersByTime(50));
      
      await user.type(input, "h");
      await act(() => vi.advanceTimersByTime(50));
      
      await user.type(input, "o");
      await act(() => vi.advanceTimersByTime(50));
      
      await user.type(input, "n");
      await act(() => vi.advanceTimersByTime(50));
      
      await user.type(input, "e");
      await act(() => vi.advanceTimersByTime(50));
      
      expect(store.getState().filters.search).toBe("phone");
    });
  });
});
