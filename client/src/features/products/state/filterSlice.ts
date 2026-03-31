import type { SortDirection } from "@/hooks/useSearchSort";
import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../api";

interface filterSliceState {
    searchTerm: string,
    sortColumn: keyof Product,
    sortDirection: SortDirection,
    selectedCategories: string[];
    selectedLevels: string[],
}

const initialState: filterSliceState = {
    searchTerm: "",
    sortColumn: "name",
    sortDirection: "ascending",
    selectedCategories: [],
    selectedLevels: [],
};

const filterSlice = createSlice({
    name: "filters",
    initialState: initialState,
    reducers: {
        setSearchTerm: (state, action) => { state.searchTerm = action.payload; },
        setSortColumn: (state, action) => { state.sortColumn = action.payload; },
        setSortDirection: (state, action) => { state.sortDirection = action.payload; },
        setSelectedCategories: (state, action) => { state.selectedCategories = action.payload; },
        setSelectedLevels: (state, action) => { state.selectedLevels = action.payload; }
    }
});

export const {
    setSearchTerm,
    setSortColumn,
    setSortDirection,
    setSelectedCategories,
    setSelectedLevels
} = filterSlice.actions;

export default filterSlice.reducer;