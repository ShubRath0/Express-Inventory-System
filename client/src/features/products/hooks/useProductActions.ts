import { useCreateProduct, useCreateProductsWithCsv, useDeleteProduct, useUpdateStock } from "@/api/__generated__/product-controller/product-controller";
import { useDeleteEverything } from "@/features/products/hooks/useProducts";
import { useToast } from "@/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import type { Category, CreateProductRequest, ModifyStockRequest } from "../api";
import { useModalActions } from "./useModalActions";

export const useProductActions = () => {
  const { selectedProduct, closeModal } = useModalActions();
  const queryClient = useQueryClient();

  const { mutateAsync: updateStockMutation } = useUpdateStock();
  const { mutateAsync: createProductMutation } = useCreateProduct();
  const { mutateAsync: deleteProductMutation } = useDeleteProduct();
  const { mutateAsync: uplaodCsvMutation } = useCreateProductsWithCsv();
  const { mutateAsync: deleteEverythingMutation } = useDeleteEverything();
  const toast = useToast();

  const onUpdateStock = useCallback(async (data: ModifyStockRequest) => {
    if (!selectedProduct) return;
    const newData = { ...data, id: selectedProduct?.id };
    await toast.promise(updateStockMutation({
      data: {
        actionType: "UPDATE",
        note: "DEFAULT",
        stockChange: data.stock
      }, id: newData.id
    }), {
      loading: "Updating product...",
      success: "Product updated!",
      error: "Product could not be updated."
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["products"]
      });
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

    await toast.promise(createProductMutation({ data: newProduct }), {
      loading: "Creating product...",
      success: "Product created!",
      error: "Product could not be created."
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["products"]
      });
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
    await toast.promise(uplaodCsvMutation({
      data: {
        file: file
      }
    }), {
      loading: "Adding Products...",
      success: "Products Added!",
      error: "Products could not be added."
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["products"]
      });
    });
  }, []);

  const onDeleteEverything = useCallback(async () => {
    await toast.promise(deleteEverythingMutation(), {
      loading: "Deleting Database",
      success: "Database Deleted Successfully!",
      error: "Database could not be deleted :("
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["products"]
      });
    });
  }, []);

  return { onCreateProduct, onDeleteProduct, onUpdateStock, onUploadCsv, onDeleteEverything };
};