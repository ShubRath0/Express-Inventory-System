import { createProduct, deleteEverything, deleteProduct, getProducts, updateStock, uploadCsv, type Product } from "@/features/products/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { searchProduct } from "../api/search-product";

export const useProducts = (keyword?: string) => {
    const query = useQuery<Product[]>({
        queryKey: ["products", keyword],
        queryFn: () => keyword ?
            searchProduct({ keyword })
            : getProducts(),
    });
    return {
        ...query,
        products: query.data ?? [],
    };
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};

export const useUploadCsv = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: uploadCsv,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });
};

export const useUpdateStock = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateStock,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};

export const useDeleteEverything = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteEverything,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });
};

export const useProductStats = (products: Product[]) => {
    return useMemo(() => {
        const totalStock = products.reduce(
            (sum, product) => sum + product.stock,
            0
        );

        const totalUnitPrice = products.reduce(
            (sum, product) => sum + product.price,
            0
        );

        const totalValue = products.reduce(
            (sum, product) => sum + (product.price * product.stock),
            0
        );

        const totalProducts = products.length;

        return {
            totalStock,
            totalUnitPrice,
            totalValue,
            totalProducts
        };
    }, [products]);
};