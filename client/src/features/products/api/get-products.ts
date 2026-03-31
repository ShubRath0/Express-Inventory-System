import type { ApiResponse } from "@/api";
import type { Product } from "@/features/products/api/types";
import { api } from "@/lib";


export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get<ApiResponse<Product[]>>("/products");
        return response.data.data;
    } catch (err) {
        console.error("API ERROR:", err);
        throw err;
    }
};