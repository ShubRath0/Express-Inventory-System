import type { GetAllProductsStockStatus, ProductCategory, ProductResponse } from "@/api/__generated__/types.schemas";
import type { SortDirection } from "@/hooks/useSearchSort";
import { createSlice } from "@reduxjs/toolkit";

interface filterSliceState {
  searchTerm: string,
  sortColumn: keyof ProductResponse,
  sortDirection: SortDirection,
  category: ProductCategory | undefined;
  stockStatus: GetAllProductsStockStatus | undefined;
}

const initialState: filterSliceState = {
  searchTerm: "",
  sortColumn: "name",
  sortDirection: "ascending",
  category: undefined,
  stockStatus: undefined
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setSearchTerm: (state, action) => { state.searchTerm = action.payload; },
    setSortColumn: (state, action) => { state.sortColumn = action.payload; },
    setSortDirection: (state, action) => { state.sortDirection = action.payload; },
    setCategory: (state, action) => { state.category = action.payload; },
    setStockStatuses: (state, action) => { state.stockStatus = action.payload; }
  }
});

export const {
  setSearchTerm,
  setSortColumn,
  setSortDirection,
  setCategory,
  setStockStatuses
} = filterSlice.actions;

export default filterSlice.reducer;