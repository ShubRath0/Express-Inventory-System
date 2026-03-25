import { createContext, useContext, useMemo } from "react"
import { type CreateProductRequest, type ModifyStockRequest, type Product } from "../api"
import { useModalActions, type Modal } from "../hooks/useModalActions"
import { useProductActions } from "../hooks/useProductActions"

interface ModalContextType {
    activeModal: Modal | null,
    openModal: (modal: Modal, product?: Product) => void,
    closeModal: () => void,
    onOpenChange: () => void,
    selectedProduct: Product | null,
    setSelectedProduct: (product: Product) => void,
    onCreateProduct: (data: CreateProductRequest) => Promise<void>,
    onUpdateStock: (data: ModifyStockRequest) => Promise<void>,
    onDeleteProduct: () => Promise<void>,
}


const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const { activeModal, openModal, closeModal, onOpenChange, selectedProduct, setSelectedProduct } = useModalActions();
    const { onCreateProduct, onDeleteProduct, onUpdateStock } = useProductActions(selectedProduct, closeModal);

    const value = useMemo(() => ({
        activeModal,
        openModal,
        closeModal,
        onOpenChange,
        selectedProduct,
        setSelectedProduct,
        onCreateProduct,
        onUpdateStock,
        onDeleteProduct
    }), [activeModal, selectedProduct, onCreateProduct, onUpdateStock, onDeleteProduct])

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within an ModalProvider")
    }
    return context;
}