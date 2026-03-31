import type { PurchaseOrder } from "@/features/purchases/api";
import type { SortDirection } from "@/hooks/useSearchSort";
import { createSlice } from "@reduxjs/toolkit";

interface filterSliceState {
    searchTerm: string,
    sortColumn: keyof PurchaseOrder,
    sortDirection: SortDirection,
    selectedCategories: string[];
}

const initialState: filterSliceState = {
    searchTerm: "",
    sortColumn: "purchaseId",
    sortDirection: "ascending",
    selectedCategories: []
};

const purchaseOrderFilterSlice = createSlice({
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
} = purchaseOrderFilterSlice.actions;

export default purchaseOrderFilterSlice.reducer;