import { useSearchSort, type SortDirection } from "@/hooks/useSearchSort";
import type { SharedSelection } from "@heroui/react";
import { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "../api";
import { useFilter } from "../hooks/useFilter";
import { useProductContext } from "./ProductProvider";

interface FilterContextType {
    filteredProducts: Product[] | null;
    sortColumn: keyof Product | undefined;
    setSortColumn: (column: keyof Product | undefined) => void;
    sortDirection: SortDirection;
    setSortDirection: (direction: SortDirection) => void;
    selectedCategories: SharedSelection,
    setSelectedCategories: (categories: SharedSelection) => void;
    searchTerm: string,
    setSearchTerm: (search: string) => void,
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { products } = useProductContext();
    const { items, sortColumn, sortDirection, setSortColumn, setSortDirection } = useSearchSort<Product>({
        items: products,
        searchableKeys: ["id", "name"],
        query: searchTerm
    });
    const { filteredProducts, selectedCategories, setSelectedCategories } = useFilter(items);

    const value = useMemo(() => ({
        filteredProducts,
        sortColumn,
        setSortColumn,
        sortDirection,
        setSortDirection,
        selectedCategories,
        setSelectedCategories,
        searchTerm,
        setSearchTerm
    }), [
        selectedCategories,
        sortColumn,
        sortDirection,
        filteredProducts,
        searchTerm
    ])

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    const context = useContext(FilterContext)
    if (!context) {
        throw new Error("useFilter can only be used within an FilterProvider")
    }

    return context;
}