import type { RootState } from "@/app/Store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Product } from "../api";
import { closeAllModals, setActiveModal, setActiveProduct } from '../state/modalSlice';

export type Modal = "create" | "update" | "delete";

export const useModalActions = () => {
    const { activeModal, activeProduct } = useSelector((state: RootState) => state.modals);
    const dispatch = useDispatch();

    const openModal = useCallback((modal: Modal, product?: Product) => {
        dispatch(setActiveModal(modal));
        dispatch(setActiveProduct(product ?? null));
    }, [dispatch]);

    const closeModal = useCallback(() => {
        dispatch(closeAllModals());
    }, [dispatch]);

    return {
        activeModal,
        selectedProduct: activeProduct,
        openModal,
        closeModal,
    };
};