import { useCallback, useState } from "react";
import type { Product } from "../api";

export type Modal = "create" | "update" | "delete"

export const useModalActions = () => {
    const [activeModal, setActiveModal] = useState<Modal | null>(null)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const openModal = useCallback((modal: Modal, product?: Product) => {
        setActiveModal(modal)
        setSelectedProduct(product ?? null);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
        setSelectedProduct(null);
    }, []);

    const onOpenChange = useCallback(() => {
        setActiveModal(null)
        setSelectedProduct(null);
    }, []);

    return { activeModal, setActiveModal, openModal, closeModal, onOpenChange, selectedProduct, setSelectedProduct }
}