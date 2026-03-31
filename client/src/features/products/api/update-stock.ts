import type { ApiResponse } from "@/api";
import type { ModifyStockRequest, Product } from "@/features/products/api/types";
import { api } from "@/lib";


export const updateStock = async (request: ModifyStockRequest): Promise<Product> => {
    try {
        const response = await api.patch<ApiResponse<Product>>(`/products/${request.id}/stock`, request);
        return response.data.data;
    } catch (err) {
        console.error("API ERROR: ", err);
        throw err;
    }
};