import type { Product } from "@/api/products/types";
import { createProduct, deleteProduct, getProducts, updateProduct } from "@api/products/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export const useProducts = () => {
    const query = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getProducts,
    })
    return {
        ...query,
        products: query.data ?? [],
    };
}

export const useCreateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    })
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["updateProduct"] })
        }
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    })
}

type useProductStats = {
    products: Product[]
}

export const useProductStats = ({ products }: useProductStats) => {
    return useMemo(() => {
        const totalStock = products.reduce(
            (sum, product) => sum + product.stock,
            0
        )

        const totalUnitPrice = products.reduce(
            (sum, product) => sum + product.price,
            0
        )

        const totalValue = products.reduce(
            (sum, product) => sum + (product.price * product.stock),
            0
        )

        const totalProducts = products.length

        return {
            totalStock,
            totalUnitPrice,
            totalValue,
            totalProducts
        }
    }, [products])
}