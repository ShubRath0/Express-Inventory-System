import { act, createContext, useContext, useMemo, useState } from "react"
import type { Product } from "../api"
import { useProducts, useProductStats } from "../hooks";
import { Outlet } from "react-router-dom";
import { useSearchSort, type SortDirection } from "@/hooks/useSearchSort";
import { useFilter } from "../hooks/useFilter";
import { useDisclosure, type SharedSelection } from "@heroui/react";

interface InventoryContextType {
    // Selection State
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product | null) => void;

    selectedCategories: SharedSelection,
    setSelectedCategories: (categories: SharedSelection) => void;

    // Main
    products: Product[];
    isLoading: boolean;

    // Searching
    search: string;
    setSearch: (value: string) => void;

    // Sorting
    filteredProducts: Product[] | null;
    sortColumn: keyof Product | undefined;
    setSortColumn: (column: keyof Product | undefined) => void;
    sortDirection: SortDirection;
    setSortDirection: (direction: SortDirection) => void;

    // Stats
    totalProducts: number,
    totalStock: number,
    totalUnitPrice: number,
    totalValue: number,

    // Disclosure
    activeModal: Modal | null,
    setActiveModal: (modal: Modal) => void,
    onOpenChange: (modal: Modal) => void,
    openModal: (modal: Modal) => void
    closeModal: () => void,
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined)
type Modal = "create" | "update" | "delete"

export const InventoryProvider = ({ children }: { children?: React.ReactNode }) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { products, isLoading } = useProducts();
    const { items, sortColumn, sortDirection, setSortColumn, setSortDirection, search, setSearch } = useSearchSort<Product>({ items: products, searchableKeys: ["id", "name"] });
    const { filteredProducts, selectedCategories, setSelectedCategories } = useFilter(items);
    const { totalProducts, totalStock, totalUnitPrice, totalValue } = useProductStats(filteredProducts);
    const [activeModal, setActiveModal] = useState<Modal | null>(null)

    const openModal = (modal: Modal) => {
        setActiveModal(modal)
    }

    const closeModal = () => {
        setActiveModal(null);
    }

    const onOpenChange = (modal: Modal) => {
        setActiveModal(prev => (prev == modal ? null : prev))
    }

    const value = useMemo(() => ({
        selectedProduct,
        setSelectedProduct,
        selectedCategories,
        setSelectedCategories,
        products,
        isLoading,
        search,
        setSearch,
        filteredProducts,
        sortColumn,
        sortDirection,
        setSortColumn,
        setSortDirection,
        totalProducts,
        totalStock,
        totalUnitPrice,
        totalValue,
        activeModal,
        setActiveModal,
        onOpenChange,
        openModal,
        closeModal
    }), [
        selectedProduct,
        selectedCategories,
        products,
        isLoading,
        search,
        filteredProducts,
        sortColumn,
        sortDirection,
        totalProducts,
        totalStock,
        totalUnitPrice,
        totalValue,
        onOpenChange,
    ]);

    return (
        <InventoryContext.Provider value={value} >

            {children ? children : <Outlet />}
        </InventoryContext.Provider>
    )
}

export const useInventory = () => {
    const context = useContext(InventoryContext);
    if (!context) {
        throw new Error("useInventory must be used within an InventoryProider")
    }
    return context;
}