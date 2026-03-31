import { useModalActions } from "@/hooks/useModalActions";
import { useToast } from "@/hooks/useToast";
import { useCallback } from "react";
import type { Category, CreateProductRequest, ModifyStockRequest } from "../api";
import { useCreateProduct, useDeleteEverything, useDeleteProduct, useUpdateStock, useUploadCsv } from "./useProducts";

export const useProductActions = () => {
    const { closeModal, activeData } = useModalActions();

    const updateStockMutation = useUpdateStock();
    const createProductMutation = useCreateProduct();
    const deleteProductMutation = useDeleteProduct();
    const uplaodCsvMutation = useUploadCsv();
    const deleteEverythingMutation = useDeleteEverything();
    const toast = useToast();

    const onUpdateStock = useCallback(async (data: ModifyStockRequest) => {
        if (!activeData) return;
        const newData = { ...data, id: activeData?.id };
        await toast.promise(updateStockMutation.mutateAsync(newData), {
            loading: "Updating product...",
            success: "Product updated!",
            error: "Product could not be updated."
        });
        closeModal();
    }, [updateStockMutation, activeData, toast, closeModal]);

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
        closeModal();
    }, [createProductMutation, toast, closeModal]);

    const onDeleteProduct = useCallback(async () => {
        if (!activeData) return;
        await toast.promise(deleteProductMutation.mutateAsync(activeData.id), {
            loading: "Deleting product...",
            success: "Product deleted!",
            error: "Product could not be deleted."
        });
        closeModal();
    }, [deleteProductMutation, activeData, toast, closeModal]);

    const onUploadCsv = useCallback(async (file: File) => {
        if (!file) return;
        await toast.promise(uplaodCsvMutation.mutateAsync(file), {
            loading: "Adding Products...",
            success: "Products Added!",
            error: "Products could not be added."
        });
    }, []);

    const onDeleteEverything = useCallback(async () => {
        await toast.promise(deleteEverythingMutation.mutateAsync(), {
            loading: "Deleting Database",
            success: "Database Deleted Successfully!",
            error: "Database could not be deleted :("
        });
    }, []);

    return { onCreateProduct, onDeleteProduct, onUpdateStock, onUploadCsv, onDeleteEverything };
};