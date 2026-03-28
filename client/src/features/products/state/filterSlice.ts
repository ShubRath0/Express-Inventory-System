import type { SortDirection } from "@/hooks/useSearchSort";
import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../api";

interface filterSliceState {
    searchTerm: string,
    sortColumn: keyof Product,
    sortDirection: SortDirection,
    selectedCategories: string[];
}

const initialState: filterSliceState = {
    searchTerm: "",
    sortColumn: "name",
    sortDirection: "ascending",
    selectedCategories: []
};

const filterSlice = createSlice({
    name: "filters",
    initialState: initialState,
    reducers: {
        setSearchTerm: (state, action) => { state.searchTerm = action.payload; },
        setSortColumn: (state, action) => { state.sortColumn = action.payload; },
        setSortDirection: (state, action) => { state.sortDirection = action.payload; },
        setSelectedCategories: (state, action) => { state.selectedCategories = action.payload; }
    }
});

export const {
    setSearchTerm,
    setSortColumn,
    setSortDirection,
    setSelectedCategories
} = filterSlice.actions;

export default filterSlice.reducer;