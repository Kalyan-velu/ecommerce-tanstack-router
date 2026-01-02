import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
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
    addedToFavourite: (state, action: PayloadAction<ProductInterface>) => {
      state.favourites = [...state.favourites, action.payload];
    },
    removedFromFavorite: (state, action: PayloadAction<ProductInterface>) => {
      state.favourites = state.favourites.filter(
        (product) => product.id !== action.payload.id,
      );
    },
    resetFavourites: () => initialState,
  },
});

export const { addedToFavourite, resetFavourites, removedFromFavorite } =
  favoritesSlice.actions;
export { favoritesSlice };
