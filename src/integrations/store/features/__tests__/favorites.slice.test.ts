import { describe, expect, it } from "vitest";
import type { ProductInterface } from "@/types/product.type";
import {
  checkFavorite,
  favoritesSlice,
  favoritesState,
  resetFavourites,
  toggledFavorite,
} from "../favorites.slice";

const reducer = favoritesSlice.reducer;

// Mock products for testing
const mockProduct1: ProductInterface = {
  id: 1,
  title: "Smartphone Pro Max",
  price: 999.99,
  description: "Latest smartphone with advanced features",
  category: "electronics",
  image: "http://example.com/smartphone.jpg",
};

const mockProduct2: ProductInterface = {
  id: 2,
  title: "Laptop Ultra",
  price: 1499.99,
  description: "Powerful laptop for professionals",
  category: "electronics",
  image: "http://example.com/laptop.jpg",
};

const mockProduct3: ProductInterface = {
  id: 3,
  title: "Winter Jacket",
  price: 89.99,
  description: "Warm jacket for cold weather",
  category: "men's clothing",
  image: "http://example.com/jacket.jpg",
};

describe("favorites.slice", () => {
  describe("initial state", () => {
    it("should return the initial state with empty favourites array", () => {
      const state = reducer(undefined, { type: "unknown" });

      expect(state).toEqual({
        favourites: [],
      });
    });
  });

  describe("toggledFavorite", () => {
    describe("adding to favorites", () => {
      it("should add a product to empty favourites", () => {
        const state = reducer(undefined, toggledFavorite(mockProduct1));

        expect(state.favourites).toHaveLength(1);
        expect(state.favourites[0]).toEqual(mockProduct1);
      });

      it("should add a product to existing favourites", () => {
        const initialState = { favourites: [mockProduct1] };
        const state = reducer(initialState, toggledFavorite(mockProduct2));

        expect(state.favourites).toHaveLength(2);
        expect(state.favourites).toContainEqual(mockProduct1);
        expect(state.favourites).toContainEqual(mockProduct2);
      });

      it("should add multiple products sequentially", () => {
        let state = reducer(undefined, toggledFavorite(mockProduct1));
        state = reducer(state, toggledFavorite(mockProduct2));
        state = reducer(state, toggledFavorite(mockProduct3));

        expect(state.favourites).toHaveLength(3);
        expect(state.favourites).toContainEqual(mockProduct1);
        expect(state.favourites).toContainEqual(mockProduct2);
        expect(state.favourites).toContainEqual(mockProduct3);
      });
    });

    describe("removing from favorites", () => {
      it("should remove a product from favourites when it already exists", () => {
        const initialState = { favourites: [mockProduct1] };
        const state = reducer(initialState, toggledFavorite(mockProduct1));

        expect(state.favourites).toHaveLength(0);
      });

      it("should remove only the specified product from favourites", () => {
        const initialState = {
          favourites: [mockProduct1, mockProduct2, mockProduct3],
        };
        const state = reducer(initialState, toggledFavorite(mockProduct2));

        expect(state.favourites).toHaveLength(2);
        expect(state.favourites).toContainEqual(mockProduct1);
        expect(state.favourites).toContainEqual(mockProduct3);
        expect(state.favourites).not.toContainEqual(mockProduct2);
      });

      it("should remove product by id match, not reference", () => {
        const initialState = { favourites: [mockProduct1] };
        // Create a new object with the same id but different reference
        const sameIdProduct = { ...mockProduct1, title: "Updated Title" };
        const state = reducer(initialState, toggledFavorite(sameIdProduct));

        expect(state.favourites).toHaveLength(0);
      });
    });

    describe("toggle behavior", () => {
      it("should toggle product: add then remove", () => {
        let state = reducer(undefined, toggledFavorite(mockProduct1));
        expect(state.favourites).toHaveLength(1);

        state = reducer(state, toggledFavorite(mockProduct1));
        expect(state.favourites).toHaveLength(0);
      });

      it("should toggle product: add, remove, add again", () => {
        let state = reducer(undefined, toggledFavorite(mockProduct1));
        expect(state.favourites).toHaveLength(1);

        state = reducer(state, toggledFavorite(mockProduct1));
        expect(state.favourites).toHaveLength(0);

        state = reducer(state, toggledFavorite(mockProduct1));
        expect(state.favourites).toHaveLength(1);
        expect(state.favourites[0]).toEqual(mockProduct1);
      });
    });
  });

  describe("resetFavourites", () => {
    it("should reset favourites to empty array", () => {
      const initialState = { favourites: [mockProduct1, mockProduct2] };
      const state = reducer(initialState, resetFavourites());

      expect(state).toEqual({ favourites: [] });
    });

    it("should return initial state when already empty", () => {
      const state = reducer(undefined, resetFavourites());

      expect(state).toEqual({ favourites: [] });
    });

    it("should clear all products from favourites", () => {
      const initialState = {
        favourites: [mockProduct1, mockProduct2, mockProduct3],
      };
      const state = reducer(initialState, resetFavourites());

      expect(state.favourites).toHaveLength(0);
    });
  });

  describe("selectors", () => {
    describe("favoritesState", () => {
      it("should return the favorites state from root state", () => {
        const rootState = {
          favorites: { favourites: [mockProduct1] },
          filters: { category: "all", sort: null, search: "" },
        };

        const result = favoritesState(rootState as never);

        expect(result).toEqual({ favourites: [mockProduct1] });
      });

      it("should return empty favourites when none exist", () => {
        const rootState = {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        };

        const result = favoritesState(rootState as never);

        expect(result).toEqual({ favourites: [] });
      });
    });

    describe("checkFavorite", () => {
      it("should return true when product is in favourites", () => {
        const rootState = {
          favorites: { favourites: [mockProduct1, mockProduct2] },
          filters: { category: "all", sort: null, search: "" },
        };

        const isFavorite = checkFavorite(rootState as never);

        expect(isFavorite(mockProduct1.id)).toBe(true);
        expect(isFavorite(mockProduct2.id)).toBe(true);
      });

      it("should return false when product is not in favourites", () => {
        const rootState = {
          favorites: { favourites: [mockProduct1] },
          filters: { category: "all", sort: null, search: "" },
        };

        const isFavorite = checkFavorite(rootState as never);

        expect(isFavorite(mockProduct2.id)).toBe(false);
        expect(isFavorite(mockProduct3.id)).toBe(false);
      });

      it("should return false when favourites is empty", () => {
        const rootState = {
          favorites: { favourites: [] },
          filters: { category: "all", sort: null, search: "" },
        };

        const isFavorite = checkFavorite(rootState as never);

        expect(isFavorite(mockProduct1.id)).toBe(false);
      });

      it("should correctly check multiple products", () => {
        const rootState = {
          favorites: { favourites: [mockProduct1, mockProduct3] },
          filters: { category: "all", sort: null, search: "" },
        };

        const isFavorite = checkFavorite(rootState as never);

        expect(isFavorite(mockProduct1.id)).toBe(true);
        expect(isFavorite(mockProduct2.id)).toBe(false);
        expect(isFavorite(mockProduct3.id)).toBe(true);
      });
    });
  });
});
