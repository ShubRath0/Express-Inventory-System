import type { ApiResponse } from "@/api";
import type { CreateProductRequest, Product } from "@/features/products/api/types";
import { api } from "@/lib";

export const createProduct = async (request: CreateProductRequest): Promise<Product> => {
    try {
        const response = await api.post<ApiResponse<Product>>("/products", request);
        return response.data.data;
    } catch (err) {
        console.error("API ERROR:", err);
        throw err;
    }
};