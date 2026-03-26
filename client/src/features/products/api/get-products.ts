import type { ApiResponse } from "@/api/api.types";
import api from "@/lib/axios";
import type { Product } from ".";

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get<ApiResponse<Product[]>>("/products");
        return response.data.data;
    } catch (err) {
        console.error("API ERROR:", err);
        throw err;
    }
}