import { getAllProducts, getGetProductSummaryQueryKey } from "@/api/__generated__/product-controller/product-controller";
import type { ProductResponse } from "@/api/__generated__/types.schemas";
import { createProduct, deleteEverything, deleteProduct, updateStock, uploadCsv } from "@/features/products/api";
import { useAppSelector } from "@/features/products/hooks/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export const useProducts = (page = 0, size = 10) => {
  const { searchTerm, category, stockStatus } = useAppSelector((root) => root.filters);
  return useQuery({
    queryKey: ["products", page, size, searchTerm, category, stockStatus],
    queryFn: () => getAllProducts({ page, size, search: searchTerm, stockStatus, category }),
    select: (res) => {
      const pageData = res.data;

      return {
        products: pageData?.content ?? [],
        currentPage: pageData?.number ?? 0,
        totalPages: pageData?.totalPages ?? 0,
      };
    },
  });
};

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts({ size: 1000 }),
    select: (res) => {
      const products = res.data?.content;
      return {
        products
      };
    }
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: getGetProductSummaryQueryKey() });
    },
  });
};

export const useUploadCsv = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadCsv,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: getGetProductSummaryQueryKey() });
    }
  });
};

export const useUpdateStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: getGetProductSummaryQueryKey() });
    }
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: getGetProductSummaryQueryKey() });
    },
  });
};

export const useDeleteEverything = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEverything,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: getGetProductSummaryQueryKey() });
    }
  });
};

export const useProductStats = (products: ProductResponse[]) => {
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