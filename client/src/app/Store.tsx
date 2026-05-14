import filterReducer from '@/features/products/state/filterSlice';
import modalReducer from '@/features/products/state/modalSlice';
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        filters: filterReducer,
        modals: modalReducer,
        auth: authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;