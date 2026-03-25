import type { ApiResponse } from "@/api/api.types";
import type { Product } from "./products.types";
import api from "@/lib/axios";

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get<ApiResponse<Product[]>>("/products");
        return response.data.data;
    } catch (err) {
        console.error("API ERROR:", err);
        throw err;
    }
}