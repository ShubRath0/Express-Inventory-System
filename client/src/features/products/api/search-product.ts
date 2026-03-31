import type { ApiResponse } from "@/api";
import type { Product, SearchRequest } from "@/features/products/api/types";
import { api } from "@/lib";


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
};