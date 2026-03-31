import filterReducer from '@/features/products/state/filterSlice';
import purchaseOrderFilterSlice from '@/features/purchases/state/filterSlice';
import modalReducer from '@/state/modalSlice';
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        filters: filterReducer,
        purchaseFilters: purchaseOrderFilterSlice,
        modals: modalReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;