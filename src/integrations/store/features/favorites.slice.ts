import {createSelector, createSlice, type PayloadAction,} from "@reduxjs/toolkit";
import type {RootState} from "@/store/index.tsx";
import type {ProductInterface} from "@/types/product.type.ts";

interface FavoritesSliceInterface {
  favourites: ProductInterface[];
}

const initialState: FavoritesSliceInterface = {
  favourites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggledFavorite: (state, action: PayloadAction<ProductInterface>) => {
      const product = state.favourites.find(
        (product) => product.id === action.payload.id,
      );
      if (product) {
        state.favourites = state.favourites.filter(
          (fav) => fav.id !== action.payload.id,
        );
      } else {
        state.favourites = [...state.favourites, action.payload];
      }
    },
    resetFavourites: () => initialState,
  },
});

export const { toggledFavorite, resetFavourites } = favoritesSlice.actions;
export { favoritesSlice };

export const favoritesState = (states: RootState) => states.favorites;

export const checkFavorite = createSelector(
  [favoritesState],
  (state) => (productId: number) =>
    state.favourites.some((fav) => fav.id === productId),
);
