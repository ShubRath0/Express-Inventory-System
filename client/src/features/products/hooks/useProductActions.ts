import { useToast } from "@/hooks/useToast";
import { useCallback } from "react";
import type { Category, CreateProductRequest, ModifyStockRequest, Product } from "../api";
import { useCreateProduct, useDeleteProduct, useUpdateStock, useUploadCsv } from "./useProducts";

export const useProductActions = (selectedProduct: Product | null, onSuccess?: () => void) => {

    const updateStockMutation = useUpdateStock();
    const createProductMutation = useCreateProduct();
    const deleteProductMutation = useDeleteProduct();
    const uplaodCsvMutation = useUploadCsv();
    const toast = useToast();

    const onUpdateStock = useCallback(async (data: ModifyStockRequest) => {
        if (!selectedProduct) return;
        const newData = { ...data, id: selectedProduct?.id }
        await toast.promise(updateStockMutation.mutateAsync(newData), {
            loading: "Updating product...",
            success: "Product updated!",
            error: "Product could not be updated."
        })
        onSuccess?.()
    }, [updateStockMutation, selectedProduct, toast, onSuccess]);

    const onCreateProduct = useCallback(async (data: CreateProductRequest) => {
        const newProduct: CreateProductRequest = {
            name: data.name,
            category: data.category as Category,
            stock: data.stock,
            lowStockThreshold: data.lowStockThreshold,
            price: data.price
        };

        await toast.promise(createProductMutation.mutateAsync(newProduct), {
            loading: "Creating product...",
            success: "Product created!",
            error: "Product could not be created."
        });
        onSuccess?.()
    }, [createProductMutation, toast, onSuccess]);

    const onDeleteProduct = useCallback(async () => {
        if (!selectedProduct) return;
        await toast.promise(deleteProductMutation.mutateAsync(selectedProduct.id), {
            loading: "Deleting product...",
            success: "Product deleted!",
            error: "Product could not be deleted."
        })
        onSuccess?.()
    }, [deleteProductMutation, selectedProduct, toast, onSuccess]);

    const onUploadCsv = useCallback(async (file: File) => {
        if (!file) return;
        await toast.promise(uplaodCsvMutation.mutateAsync(file), {
            loading: "Adding Products...",
            success: "Products Added!",
            error: "Products could not be added."
        })
    }, []);

    return { onCreateProduct, onDeleteProduct, onUpdateStock, onUploadCsv }
}