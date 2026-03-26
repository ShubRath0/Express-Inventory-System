import type { ApiResponse } from "@/api/api.types";
import api from "@/lib/axios";
import type { CreateProductRequest, Product } from '.';

export const createProduct = async (request: CreateProductRequest): Promise<Product> => {
    try {
        const response = await api.post<ApiResponse<Product>>("/products", request)
        return response.data.data
    } catch (err) {
        console.error("API ERROR:", err);
        throw err;
    }
}