import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../api";
import type { Modal } from "../hooks";

interface modalSliceState {
    activeModal: Modal | null;
    activeProduct: Product | null;
}

const initialState: modalSliceState = {
    activeModal: null,
    activeProduct: null,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setActiveModal: (state, action) => { state.activeModal = action.payload; },
        setActiveProduct: (state, action) => { state.activeProduct = action.payload; },
        closeAllModals: (state) => {
            state.activeModal = null;
            state.activeProduct = null;
        }
    },
});

export const { setActiveModal, setActiveProduct, closeAllModals } = modalSlice.actions;
export default modalSlice.reducer;