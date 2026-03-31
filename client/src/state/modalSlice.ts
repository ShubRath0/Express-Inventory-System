import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Modal = "create" | "update" | "delete";

interface ModalState {
    activeModal: Modal | null;
    activeData: any | null;
}

const initialState: ModalState = {
    activeModal: null,
    activeData: null,

};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<{ modal: Modal | null, data: any | null; }>) => {
            state.activeModal = action.payload.modal;
            state.activeData = action.payload.data;
        },
        closeModal: (state) => {
            state.activeData = null;
            state.activeModal = null;
        }
    }
});

export const { setModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;