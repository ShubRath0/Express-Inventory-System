import api from "@/lib/axios";
import type { PostProduct, Product } from '@/features/products/api/products.types';
import type { ApiResponse } from "@/api/api.types";

export const createProduct = async (request: PostProduct): Promise<Product> => {
    try {
        const response = await api.post<ApiResponse<Product>>("/products", request)
        return response.data.data
    } catch (err) {
        console.error("API ERROR:", err);
        throw err;
    }
}