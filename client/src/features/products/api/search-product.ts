import type { ApiResponse } from "@/api";
import api from "@/lib/axios";
import type { Product, SearchRequest } from ".";

export const searchProduct = async (request: SearchRequest): Promise<Product[]> => {
    try {
        const response = await api.get<ApiResponse<Product[]>>('/products/search', {
            params: request
        });
        return response.data.data;
    } catch (err) {
        console.error("API ERROR: ", err);
        throw err;
    }
}