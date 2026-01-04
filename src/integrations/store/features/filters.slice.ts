import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  category: string;
  sort: (string & {}) | "price-asc" | "price-desc" | "default" | null;
  search: string;
}

export const initialFilterState: FiltersState = {
  category: "all",
  sort: null,
  search: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState: initialFilterState,
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
      action: PayloadAction<("category" | "sort" | "search")[]>,
    ) => {
      const attribute = action.payload;
      for (const attr of attribute) {
        // @ts-expect-error - TS doesn't know that attr is a key of FiltersState'
        state[attr] = initialFilterState[attr];
      }
    },
    resetFilters: () => initialFilterState,
  },
});

export const {
  categorySelected,
  sorted,
  searchChanged,
  resetByAttribute,
  resetFilters,
} = filtersSlice.actions;
