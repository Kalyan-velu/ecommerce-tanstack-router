import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface FiltersState {
  category: string;
  price: number[];
  sort: (string & {}) | "price-asc" | "price-desc" | "default" | null;
  search: string;
}

const initialState: FiltersState = {
  category: "all",
  sort: null,
  search: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    categorySelected: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    sorted: (
      state,
      action: PayloadAction<"asc" | "desc" | (string & {}) | null>,
    ) => {
      state.sort = action.payload;
    },
    searchChanged: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    resetByAttribute: (
      state,
      action: PayloadAction<("category" | "price" | "sort" | "search")[]>,
    ) => {
      const attribute = action.payload;
      for (const attr of attribute) {
        state[attr] = initialState[attr];
      }
    },
    resetFilters: () => initialState,
  },
});

export const {
  categorySelected,
  sorted,
  searchChanged,
  resetByAttribute,
  resetFilters,
} = filtersSlice.actions;
