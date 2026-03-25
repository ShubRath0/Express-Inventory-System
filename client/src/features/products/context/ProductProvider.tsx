import { createContext, useContext, useMemo } from "react"
import type { Product } from "../api"
import { useProducts } from "../hooks"

interface ProductContextType {
    products: Product[],
    isLoading: boolean,
    isFetching: boolean,
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const { products, isLoading, isFetching } = useProducts();

    const value = useMemo(() => ({
        products,
        isLoading,
        isFetching,
    }), [
        products,
        isLoading,
        isFetching,
    ])

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error("useProducts must be used within an ProductProvider")
    }

    return context;
}