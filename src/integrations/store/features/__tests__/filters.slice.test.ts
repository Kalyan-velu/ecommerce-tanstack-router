import { describe, expect, it } from "vitest";
import {
  categorySelected,
  filtersSlice,
  resetByAttribute,
  resetFilters,
  searchChanged,
  sorted,
} from "../filters.slice";

const reducer = filtersSlice.reducer;

describe("filters.slice", () => {
  describe("initial state", () => {
    it("should return the initial state", () => {
      const state = reducer(undefined, { type: "unknown" });

      expect(state).toEqual({
        category: "all",
        sort: null,
        search: "",
      });
    });
  });

  describe("categorySelected", () => {
    it("should set category to the provided value", () => {
      const state = reducer(undefined, categorySelected("electronics"));

      expect(state.category).toBe("electronics");
    });

    it("should update category from one value to another", () => {
      const initialState = { category: "electronics", sort: null, search: "" };
      const state = reducer(initialState, categorySelected("clothing"));

      expect(state.category).toBe("clothing");
    });

    it("should set category back to 'all'", () => {
      const initialState = { category: "electronics", sort: null, search: "" };
      const state = reducer(initialState, categorySelected("all"));

      expect(state.category).toBe("all");
    });
  });

  describe("sorted", () => {
    it("should set sort to 'asc'", () => {
      const state = reducer(undefined, sorted("asc"));

      expect(state.sort).toBe("asc");
    });

    it("should set sort to 'desc'", () => {
      const state = reducer(undefined, sorted("desc"));

      expect(state.sort).toBe("desc");
    });

    it("should set sort to null", () => {
      const initialState = {
        category: "all",
        sort: "asc" as const,
        search: "",
      };
      const state = reducer(initialState, sorted(null));

      expect(state.sort).toBeNull();
    });

    it("should update sort from one value to another", () => {
      const initialState = {
        category: "all",
        sort: "asc" as const,
        search: "",
      };
      const state = reducer(initialState, sorted("desc"));

      expect(state.sort).toBe("desc");
    });
  });

  describe("searchChanged", () => {
    it("should set search to the provided value", () => {
      const state = reducer(undefined, searchChanged("laptop"));

      expect(state.search).toBe("laptop");
    });

    it("should update search from one value to another", () => {
      const initialState = { category: "all", sort: null, search: "laptop" };
      const state = reducer(initialState, searchChanged("phone"));

      expect(state.search).toBe("phone");
    });

    it("should clear search when empty string is provided", () => {
      const initialState = { category: "all", sort: null, search: "laptop" };
      const state = reducer(initialState, searchChanged(""));

      expect(state.search).toBe("");
    });

    it("should handle special characters in search", () => {
      const state = reducer(undefined, searchChanged("men's clothing"));

      expect(state.search).toBe("men's clothing");
    });
  });

  describe("resetByAttribute", () => {
    it("should reset only category to initial value", () => {
      const initialState = {
        category: "electronics",
        sort: "asc" as const,
        search: "laptop",
      };
      const state = reducer(initialState, resetByAttribute(["category"]));

      expect(state.category).toBe("all");
      expect(state.sort).toBe("asc");
      expect(state.search).toBe("laptop");
    });

    it("should reset only sort to initial value", () => {
      const initialState = {
        category: "electronics",
        sort: "asc" as const,
        search: "laptop",
      };
      const state = reducer(initialState, resetByAttribute(["sort"]));

      expect(state.category).toBe("electronics");
      expect(state.sort).toBeNull();
      expect(state.search).toBe("laptop");
    });

    it("should reset only search to initial value", () => {
      const initialState = {
        category: "electronics",
        sort: "asc" as const,
        search: "laptop",
      };
      const state = reducer(initialState, resetByAttribute(["search"]));

      expect(state.category).toBe("electronics");
      expect(state.sort).toBe("asc");
      expect(state.search).toBe("");
    });

    it("should reset multiple attributes at once", () => {
      const initialState = {
        category: "electronics",
        sort: "asc" as const,
        search: "laptop",
      };
      const state = reducer(
        initialState,
        resetByAttribute(["category", "search"]),
      );

      expect(state.category).toBe("all");
      expect(state.sort).toBe("asc");
      expect(state.search).toBe("");
    });

    it("should reset all attributes when all are provided", () => {
      const initialState = {
        category: "electronics",
        sort: "asc" as const,
        search: "laptop",
      };
      const state = reducer(
        initialState,
        resetByAttribute(["category", "sort", "search"]),
      );

      expect(state).toEqual({
        category: "all",
        sort: null,
        search: "",
      });
    });
  });

  describe("resetFilters", () => {
    it("should reset all filters to initial state", () => {
      const initialState = {
        category: "electronics",
        sort: "asc" as const,
        search: "laptop",
      };
      const state = reducer(initialState, resetFilters());

      expect(state).toEqual({
        category: "all",
        sort: null,
        search: "",
      });
    });

    it("should return initial state when already at initial state", () => {
      const state = reducer(undefined, resetFilters());

      expect(state).toEqual({
        category: "all",
        sort: null,
        search: "",
      });
    });
  });
});
