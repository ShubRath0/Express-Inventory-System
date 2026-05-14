import { useDeleteProduct } from "@/api/__generated__/product-controller/product-controller";
import { useToast } from "@/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import type { Category, CreateProductRequest, ModifyStockRequest } from "../api";
import { useModalActions } from "./useModalActions";
import { useCreateProduct, useDeleteEverything, useUpdateStock, useUploadCsv } from "./useProducts";

export const useProductActions = () => {
  const { selectedProduct, closeModal } = useModalActions();
  const queryClient = useQueryClient();

  const updateStockMutation = useUpdateStock();
  const createProductMutation = useCreateProduct();
  const { mutateAsync: deleteProductMutation } = useDeleteProduct();
  const uplaodCsvMutation = useUploadCsv();
  const deleteEverythingMutation = useDeleteEverything();
  const toast = useToast();

  const onUpdateStock = useCallback(async (data: ModifyStockRequest) => {
    if (!selectedProduct) return;
    const newData = { ...data, id: selectedProduct?.id };
    await toast.promise(updateStockMutation.mutateAsync(newData), {
      loading: "Updating product...",
      success: "Product updated!",
      error: "Product could not be updated."
    });
    closeModal();
  }, [updateStockMutation, selectedProduct, toast, closeModal]);

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
    if (!selectedProduct) return;
    await toast.promise(deleteProductMutation({ id: selectedProduct.id }), {
      loading: "Deleting product...",
      success: "Product deleted!",
      error: "Product could not be deleted."
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["products"]
      });
    });
    closeModal();
  }, [deleteProductMutation, selectedProduct, toast, closeModal]);

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