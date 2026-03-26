import { createContext, useContext, useMemo } from "react";
import { useProductStats } from "../hooks";
import { useProductContext } from "./ProductProvider";

interface StatProviderType {
    totalProducts: number,
    totalStock: number,
    totalUnitPrice: number,
    totalValue: number,
}

const StatContext = createContext<StatProviderType | undefined>(undefined);

export const StatProvider = ({ children }: { children: React.ReactNode }) => {
    const { products } = useProductContext();
    const { totalProducts, totalStock, totalUnitPrice, totalValue } = useProductStats(products);

    const value = useMemo(() => ({
        totalProducts,
        totalStock,
        totalUnitPrice,
        totalValue
    }), [products])

    return (
        <StatContext.Provider value={value}>
            {children}
        </StatContext.Provider>
    )
}

export const useStatContext = () => {
    const context = useContext(StatContext)
    if (!context) {
        throw new Error("useStat can only be use within an StatProvider")
    }

    return context;
}